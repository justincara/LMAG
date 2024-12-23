import React, { useEffect, useState } from "react";
import sol from "../assets/download.jpg";
import lmag from "../assets/logo.jpeg";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@project-serum/anchor";
import idl from "../context/idl.json";
import { admin, icoMint, icoPda, programAta, ProgramID } from "../context/addresses";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

function Buy() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = useState();
  const [programData, setProgramData] = useState();

  const getBalance = () => {
    console.log("SOL: ", publicKey.toString());
    connection.getBalance(publicKey).then((balance) => {
      setBalance(balance / LAMPORTS_PER_SOL);
      console.log("SOL: ", balance / LAMPORTS_PER_SOL);
    });
  };

  const getOrCreateUserAtaInstruction = async (mint, owner) => {
    const associatedToken = getAssociatedTokenAddressSync(
      mint,
      owner,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    let account;
    try {
      account = await getAccount(
        connection,
        associatedToken,
        undefined,
        TOKEN_PROGRAM_ID
      );
    } catch (error) {
      if (error) {
        const ataTx = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            owner,
            associatedToken,
            owner,
            mint,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );
        return { account: associatedToken, ataTx };
      }
    }
    return { account: account.address };
  };

  const getProvider = () => {
    const prodramId = new PublicKey(ProgramID);
    const opts = { preflightCommitment: "processed" };
    const provider = new AnchorProvider(connection, publicKey, opts.preflightCommitment);
    const program = new Program(idl, prodramId, provider);
    return { provider, program };
  };

  const buyTokens = async () => {
    try {
      const solAmount = new BN(100);
      const { account, ataTx } = await getOrCreateUserAtaInstruction(
        new PublicKey(icoMint),
        publicKey
      );

      console.log("Buying Token: ", {
        user: publicKey.toString(),
        ata: account.toString(),
        solAmount: solAmount.toString(),
      });

      const { program } = getProvider();
      const programTransaction = await program.methods
        .buyWithSol(solAmount)
        .accounts({
          buyer: publicKey.toString(),
          admin: admin,
          buyerAta: account.toString(),
          programAta: programAta,
          icoPda: icoPda,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: "11111111111111111111111111111111",
        })
        .transaction();

      const tx = await sendTransaction(
        ataTx ? ataTx.add(programTransaction) : programTransaction,
        connection
      );
      console.log("Your transaction signature", tx);
    } catch (error) {
      console.error("===> Error", error);
    }
  };

  const fetchProgramData = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const accountInfo = await connection.getAccountInfo(new PublicKey(icoPda));
      if (!accountInfo) {
        console.log("Account not found!");
        return;
      }
      const data = accountInfo.data;
      const _programData = {
        admin: new PublicKey(data.slice(0, 32))?.toString(),
        tokensPerLamport: data.readBigUInt64LE(32)?.toString(),
        tokensBalance: data.readBigUInt64LE(40)?.toString(),
        totalSold: data.readBigUInt64LE(48)?.toString(),
        lamportsReceived: data.readBigUInt64LE(56)?.toString(),
      };
      setProgramData({ ..._programData });
      console.log(_programData);
    } catch (e) {
      console.log("fetch data Error: ", e);
    }
  };

  useEffect(() => {
    if (publicKey) {
      getBalance();
    }
    fetchProgramData();
  }, [publicKey]);

  return (
    <div className="container">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center mb-5 text_shadow text-yellow-500">
        LMAG Presale{" "}
      </h1>

      <div className="flex justify-center items-center min-h-screen  p-4 widthAbout ">
        <div className=" text-white p-6 rounded-lg  w-full max-w-3xl">
          <h1 className="text-3xl  font-bold mb-4 text-center text_shadow text-yellow-500">
            The Most LMAG Coin Representing Luigi Mangione – On Presale Now!
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center mb-4 gap-3 space-y-2 sm:space-y-0">
            <button className="allbtn text-black py-2 px-4 rounded">LMAG = $0.01</button>
            <button className="allbtn text-white py-2 px-4 rounded">
              Next Price $0.02
            </button>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-full bg-white h-3 rounded-full">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: "1%" }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
            <div>
              <p className="text-sm">Tokens Sold</p>
              <p className="text-lg font-bold">9510.54 / 100000000</p>
            </div>
            <div>
              <p className="text-sm">SOL Raised</p>
              <p className="text-lg font-bold">0.43 / 463542.39</p>
            </div>
          </div>
          <div className=" p-3  mb-4 borderpay">
            <p className="mb-2">You pay</p>
            <div className="flex items-center bg-brown-700 p-2 rounded">
              <input
                type="number"
                className="bg-transparent text-white w-full outline-none"
                placeholder="Enter amount"
              />
              <img src={sol} width={50} alt="SOL Logo" className="ml-2" />
            </div>
          </div>
          <div className="borderpay p-3  mb-4">
            <p className="mb-2">You receive</p>
            <div className="flex items-center bg-brown-700 p-2 rounded">
              <input
                type="number"
                className="bg-transparent text-white w-full outline-none"
                placeholder="Receive amount"
              />
              <img src={lmag} width={50} alt="BBM Logo" className="ml-2" />
            </div>
          </div>
          {publicKey && (
            <button
              className="allbtn text-white py-2 px-4 rounded w-full mb-4"
              onClick={() => buyTokens()}
            >
              BUY
            </button>
          )}
          <div className="text-center">
            <p className="mb-2">Balance: {balance}</p>
            {/* <button className="allbtn text-white py-2 px-4 rounded">
              Select Wallet
            </button> */}
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
