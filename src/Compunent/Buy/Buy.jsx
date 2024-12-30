import React, { useEffect, useState } from "react";
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
import { Button, Typography, Box } from "@mui/material";
import logo from "../assets/BuyLogo.svg"

function Buy() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = useState();
  const [programData, setProgramData] = useState();
  const [amount, setAmount] = useState();
  const [txSig, setTxSig] = useState();

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

    if (programData?.tokensBalance < tokens || lamports > userBalance) {
      console.error("invalid amount");
      return;
    }

    try {
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
      setAmount({ sol: 0, tokens: 0 });
      // for confirm transaction
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txSig,
      });
      setTxSig(txSig);
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

  const converterSolToTokens = (value) => {
    const lamports = value * LAMPORTS_PER_SOL;
    const tokensForSol = (
      (lamports * programData?.tokensPerLamport) /
      10 ** decimals
    ).toFixed(2);
    return tokensForSol;
  };

  const converterTokensToSol = (value) => {
    const tokensamount = value * 10 ** decimals;
    const solFortokens = (
      tokensamount /
      programData?.tokensPerLamport /
      LAMPORTS_PER_SOL
    ).toFixed(9);
    return solFortokens;
  };

  const sendAmountHandler = ({ value }) => {
    let inputValue = value; // The raw input value
    if (inputValue < 0) {
      alert("Negative values are not allowed!");
      return;
    }
    // Ensure the value is a string before performing string operations
    inputValue = inputValue.toString();
    if (inputValue.includes(".") && inputValue.split(".")[1].length > 10) {
      setAmount({ ...amount }); // Keep the existing state if precision exceeds 10 decimal places
    } else {
      const tokensForSol = converterSolToTokens(parseFloat(inputValue));
      setAmount({
        sol: inputValue.replace(/^0+/, ""), // Remove leading zeros
        tokens: tokensForSol,
      });
    }
  };
  
  const receiveAmountHandler = ({ value }) => {
    let inputValue = value; // The raw input value
    if (inputValue < 0) {
      alert("Negative values are not allowed!");
      return;
    }
    // Ensure the value is a string before performing string operations
    inputValue = inputValue.toString();
    if (inputValue.includes(".") && inputValue.split(".")[1].length > 3) {
      setAmount({ ...amount }); // Keep the existing state if precision exceeds 3 decimal places
    } else {
      const solForTokens = converterTokensToSol(parseFloat(inputValue));
      setAmount({
        sol: solForTokens,
        tokens: inputValue.replace(/^0+/, ""), // Remove leading zeros
      });
    }
  };
  

  useEffect(() => {
    if (publicKey) {
      getBalance();
    }
    fetchProgramData();
  }, [publicKey, txSig]);

  const [text, setText] = useState("  0xb014430ec5a7B56224e40850f2afBE10A5bd685d");
  const [copyStatus, setCopyStatus] = useState(<i className="fas fa-copy"></i>);

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(<i className="fas fa-copy"></i>), 2000); // Reset button text after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopyStatus("Failed!");
        setTimeout(() => setCopyStatus(<i className="fas fa-copy"></i>), 2000); // Reset button text after 2 seconds
      });
  };

  return (
    <Box 
    sx={{
      padding: {
        xs: "20px", 
        sm: "25px", 
        md: "50px",  
      },
    }}
    id="investing"
    >
      <Typography
        // variant="h3"
        sx={{
          fontFamily: "Zen Dots, sans-serif",
          fontSize: {
            xs: "32px",
            sm: "32px",
            md: "64px", 
          },
          fontWeight: 400,
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Start Investing in LMAG Today
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row", 
          },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          py: 6,
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <Box
        sx={{
          flex: {
            xs: "1 1 100%", 
            md: "1 1 50%", 
          },
          height: "auto", 
          backgroundColor: "#f6f6f6",
          color: "#000",
          borderRadius: "20px",
          padding: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}    
        >
          <div >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Zen Dots, sans-serif",
              fontSize: {
                xs: "28px",
                sm: "30px",
                md: "40px", 
              },
              fontWeight: 400,
              lineHeight: 1.6,
              textAlign: "left",
              marginBottom: 2,
            }}
          >
            Buy Now With Your Solana Wallet
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              sx={{
                backgroundColor: "#EFBF04",
                color: "#000",
                fontFamily: "Lora",
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: 1.6,
                textAlign: "center",
                borderRadius: "40px",
                paddingX: 2,
                width: "200px",
                height: "65px",
                textTransform: "none",
                border: '2px solid #000',
                "&:hover": {
                  backgroundColor: "#d4a904",
                },
              }}
            >
              LMAG = $0.01
            </Button>
            <Button
              sx={{
                backgroundColor: "#EFBF04",
                color: "#000",
                fontFamily: "Lora",
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: 1.6,
                textAlign: "center",
                borderRadius: "40px",
                paddingX: 2,
                width: "200px",
                height: "65px",
                textTransform: "none",
                border: '2px solid #000',
                "&:hover": {
                  backgroundColor: "#d4a904",
                },
              }}
            >
              Next Price $0.02
            </Button>
          </Box>

            {programData && (
              <>
                <div className="flex items-center mb-4">
                  <div className="w-full bg-white h-3 rounded-full">
                    <div
                      className="bg-yellow-500 h-3 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
                  <div>
                    <p className="text-sm">Tokens Sold</p>
                    <p className="text-lg font-bold">
                      {programData?.totalSold / (10 ** decimals).toFixed(decimals)} /{" "}
                      {(Number(programData?.tokensBalance) +
                        Number(programData?.totalSold)) /
                        10 ** decimals}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">SOL Raised</p>
                    <p className="text-lg font-bold">
                      {(programData?.lamportsReceived / LAMPORTS_PER_SOL).toFixed(9)} /{" "}
                      {converterTokensToSol(
                        (Number(programData?.tokensBalance) +
                          Number(programData?.totalSold)) /
                          10 ** decimals
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}
           <div
              style={{
                backgroundColor: "#EFBF04",
                borderRadius: "30px",
                marginBottom: "20px",
                border: "2px solid black",
                padding: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "Lora",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: 1.6,
                  textAlign: "left",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  marginBottom: "8px",
                }}
              >
                You Pay
              </p>
              <div
                style={{
                  backgroundColor: "transparent",
                  padding: "8px 0",
                  borderBottom: "2px solid black",
                }}
              >
                <input
                  type="number"
                  placeholder="Enter amount"
                  min="0"
                  value={amount?.sol}
                  onChange={(e) => sendAmountHandler(e.target)}
                  style={{
                    fontFamily: "Lora",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#666",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#EFBF04",
                borderRadius: "30px",
                marginBottom: "20px",
                border: "2px solid black",
                padding: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "Lora",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: 1.6,
                  textAlign: "left",
                  // textUnderlinePosition: "from-font",
                  // textDecorationSkipInk: "none",
                  marginBottom: "8px",
                }}
              >
                You Receive
              </p>
              <div
                style={{
                  backgroundColor: "transparent",
                  padding: "8px 0",
                  borderBottom: "2px solid black",
                }}
              >
                <input
                  type="number"
                  min="0"
                  style={{
                    fontFamily: "Lora",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    color: "#666",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    width: "100%",
                  }}
                  placeholder="Receive amount"
                  value={amount?.tokens}
                  onChange={(e) => receiveAmountHandler(e.target)}
                />
              </div>
            </div>
            {publicKey && (
              <button
                className="allbtn text-white py-2 px-4 rounded w-full mb-4"
                onClick={() => buyTokens()}
                disabled={!amount?.sol || !amount?.tokens}
              >
                BUY
              </button>
            )}
            <div className="text-center">
              {/* <button className="allbtn text-white py-2 px-4 rounded">
                Select Wallet
              </button> */}
              <WalletMultiButton
                style={{
                  backgroundColor: "black", 
                  borderRadius: "30px", 
                  width: "172px",
                  height: "56px", 
                  color: "white", 
                  display: "flex", 
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                  fontFamily: "Lora",
                }}
              />
            </div>
          </div>
        </Box>
        
        <Box
          sx={{
            flex: {
              xs: "1 1 100%",
              md: "1 1 50%",
            },
            height: "auto",
            backgroundColor: "#000",
            width: "100%",
            color: "#fff",
            borderRadius: "20px",
            padding: 4,
            gap: '25px',
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <img
              src={logo} 
              alt="Pepe the frog sitting on a throne with gold coins around"
              style={{
                border: "4px solid #EFBF04",
                borderRadius: "50%",
                width: {xs: '275px', sm: '300px', md: '346px'},
                height: {xs: '275px', sm: '300px', md: '346px'},
                objectFit: "cover",
              }}
            />
          </Box>

          <Box>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Zen Dots, sans-serif",
              fontSize: {
                xs: "28px",
                sm: "32px",
                md: "40px", 
              },
              fontWeight: 400,
              lineHeight: 1.6,
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              marginBottom: 2,
            }}
          >
            Token Allocation
          </Typography>
            <Box
              component="ul"
              sx={{
                textAlign: "left",
                paddingLeft: 4,
                fontFamily: "Lora",
                fontSize: "18px",
                listStyleType: "disc",
              }}
            >
              <li>
              Pre sale - <strong style={{ color: "#E3AB1E" }}>10%</strong> of token supply
              </li>
              <li>
              If Luigi receives the death penalty, <strong style={{ color: "#E3AB1E" }}>90%</strong>  of all remaining tokens will be burned!
              </li>
              <li>
              If Luigi receives 25 to life, <strong style={{ color: "#E3AB1E" }}>50%</strong>  of all remaining tokens will be burned!
              </li>
            </Box>
          </Box>

          <div className="bg-yellow-500 text-white p-3 rounded mt-4 flex items-center justify-between">
              <span className="break-all "style={{fontSize:"20px"}}>
               {text}

              </span>
             <span onClick={handleCopy}>{copyStatus}</span>
            </div>

          <Box
            sx={{
              mt: 4,
            }}
          >
            <button
              style={{
                backgroundColor: "#EFBF04",
                color: "#000",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              Buy LMAG
            </button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

export default Buy;
