import React, { useEffect, useState } from "react";
import sol from "../assets/download.jpg";
import lmag from "../assets/logo.jpeg";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@project-serum/anchor";
import idl from "../context/idl.json";
import {
  admin,
  decimals,
  icoMint,
  icoPda,
  keyData,
  programAta,
  ProgramID,
} from "../context/addresses";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { endpoint } from "../context/wallet";

function Buy() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = useState();
  const [programData, setProgramData] = useState();
  const [amount, setAmount] = useState();

  const getBalance = () => {
    connection.getBalance(publicKey).then((balance) => {
      setBalance(balance / LAMPORTS_PER_SOL);
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
    const lamports = amount?.sol * LAMPORTS_PER_SOL;
    const tokens = amount?.tokens * 10 ** decimals;
    const userBalance = balance * LAMPORTS_PER_SOL;

    if (programData?.tokensBalance < tokens || lamports < userBalance) {
      console.error("invalid amount");
      return;
    }

    try {
      setAmount({ sol: 0, tokens: 0 });
      const solAmount = new BN(lamports);
      const { account, ataTx } = await getOrCreateUserAtaInstruction(
        new PublicKey(icoMint),
        publicKey
      );

      console.log("Buying Tokens: ", {
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

      const txSig = await sendTransaction(
        ataTx ? ataTx.add(programTransaction) : programTransaction,
        connection
      );
      console.log({ txSig });
      fetchProgramData();
    } catch (error) {
      console.error("===> Error", error);
    }
  };

  const fetchProgramData = async () => {
    try {
      const connection = new Connection(endpoint, "confirmed");
      const prodramId = new PublicKey(ProgramID);
      const opts = { preflightCommitment: "processed" };
      const adminWallet = Keypair.fromSecretKey(bs58.decode(keyData));
      const provider = new AnchorProvider(
        connection,
        new NodeWallet(adminWallet),
        opts.preflightCommitment
      );
      const program = new Program(idl, prodramId, provider);

      const data = await program.account.icoDataPda.fetch(icoPda);
      const _programData = {};
      Object.entries(data).some(([key, value]) => {
        if (key !== "ataBump") _programData[key] = value?.toString();
      });
      setProgramData({ ..._programData });
    } catch (e) {
      console.log("fetch data Error: ", e);
    }
  };

  const converterSolToTokens = ({ value }) => {
    if (value.slice(value.indexOf(".")).length <= 10) {
      const lamports = value * LAMPORTS_PER_SOL;
      const tokensAmount = (
        (lamports * programData?.tokensPerLamport) /
        10 ** decimals
      ).toFixed(2);
      setAmount({ sol: value.replace(/^0+/, ''), tokens: tokensAmount });
    } else {
      setAmount({ ...amount });
    }
  };

  const converterTokensToSol = ({ value }) => {
    if (value.slice(value.indexOf(".")).length <= 3) {
      const tokensamount = value * 10 ** decimals;
      const sol = (
        tokensamount /
        programData?.tokensPerLamport /
        LAMPORTS_PER_SOL
      ).toFixed(9);
      setAmount({ sol, tokens: value.replace(/^0+/, '') });
    } else {
      setAmount({ ...amount });
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
          {programData && (
            <>
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
                  <p className="text-lg font-bold">
                    {programData?.totalSold / (10 ** decimals).toFixed(decimals)} /{" "}
                    {programData?.tokensBalance / 10 ** decimals}
                  </p>
                </div>
                <div>
                  <p className="text-sm">SOL Raised</p>
                  <p className="text-lg font-bold">
                    {(programData?.lamportsReceived / LAMPORTS_PER_SOL).toFixed(9)} /{" "}
                    {(programData?.tokensPerLamport * programData?.tokensBalance) /
                      LAMPORTS_PER_SOL}
                  </p>
                </div>
              </div>
            </>
          )}
          <div className=" p-3  mb-4 borderpay">
            <p className="mb-2">You pay</p>
            <div className="flex items-center bg-brown-700 p-2 rounded">
              <input
                type="number"
                className="bg-transparent text-white w-full outline-none"
                placeholder="Enter amount"
                value={amount?.sol}
                onChange={(e) => converterSolToTokens(e.target)}
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
                value={amount?.tokens}
                onChange={(e) => converterTokensToSol(e.target)}
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
