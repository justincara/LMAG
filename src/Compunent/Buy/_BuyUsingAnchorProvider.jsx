// import React, { useEffect, useState } from "react";
// import sol from "../assets/download.jpg";
// import lmag from "../assets/logo.jpeg";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useWallet, useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
// import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
// import { Program, AnchorProvider, BN } from "@project-serum/anchor";
// import idl from "../context/idl.json";
// import { admin, icoMint, icoPda, programAta, ProgramID } from "../context/addresses";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

// function Buy() {
//   const { publicKey, sendTransaction } = useWallet();
//   const wallet = useAnchorWallet();
//   const { connection } = useConnection();

//   const [balance, setBalance] = useState();

//   const getBalance = () => {
//     console.log("SOL: ", publicKey.toString());
//     connection.getBalance(publicKey).then((balance) => {
//       setBalance(balance / LAMPORTS_PER_SOL);
//       console.log("SOL: ", balance / LAMPORTS_PER_SOL);
//     });
//   };

//   const getProvider = () => {
//     const prodramId = new PublicKey(ProgramID);
//     const opts = { preflightCommitment: "processed" };
//     const provider = new AnchorProvider(connection, publicKey, opts.preflightCommitment);
//     const program = new Program(idl, prodramId, provider);
//     return { provider, program };
//   };

//   function getProgram({ connection, wallet }) {
//     const prodramId = new PublicKey(ProgramID);
//     const provider = new AnchorProvider(connection, wallet, {});
//     return new Program(idl, prodramId, provider);
//   }

//   const buyTokens = async () => {
//     try {
//       if (!wallet) throw new WalletNotConnectedError();

//       console.log("Buying Token with SOL");
//       const program  = getProgram({connection, wallet});

//       const solAmount = new BN(100);
//       const tx = await program.methods
//         .buyWithSol(solAmount)
//         .accounts({
//           buyer: publicKey.toString(),
//           admin: admin,
//           buyerAta: "AnxLikqfDFVTrMeUFhxZf58GnyK2p99xiAmDzEGpEGbY",
//           programAta: programAta,
//           icoPda: icoPda,
//           tokenProgram: TOKEN_PROGRAM_ID,
//           systemProgram: "11111111111111111111111111111111",
//         })
//         .rpc();
//       console.log("Your transaction signature", tx);
//     } catch (error) {
//       console.error("===> Error", error);
//     }
//   };

//   useEffect(() => {
//     if (publicKey) {
//       getBalance();
//     }
//   }, [publicKey]);

//   return (
//     <div className="container">
//       <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center mb-5 text_shadow text-yellow-500">
//         LMAG Presale{" "}
//       </h1>

//       <div className="flex justify-center items-center min-h-screen  p-4 widthAbout ">
//         <div className=" text-white p-6 rounded-lg  w-full max-w-3xl">
//           <h1 className="text-3xl  font-bold mb-4 text-center text_shadow text-yellow-500">
//             The Most LMAG Coin Representing Luigi Mangione – On Presale Now!
//           </h1>
//           <div className="flex flex-col sm:flex-row justify-center items-center mb-4 gap-3 space-y-2 sm:space-y-0">
//             <button className="allbtn text-black py-2 px-4 rounded">LMAG = $0.01</button>
//             <button className="allbtn text-white py-2 px-4 rounded">
//               Next Price $0.02
//             </button>
//           </div>
//           <div className="flex items-center mb-4">
//             <div className="w-full bg-white h-3 rounded-full">
//               <div
//                 className="bg-yellow-500 h-3 rounded-full"
//                 style={{ width: "1%" }}
//               ></div>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
//             <div>
//               <p className="text-sm">Tokens Sold</p>
//               <p className="text-lg font-bold">9510.54 / 100000000</p>
//             </div>
//             <div>
//               <p className="text-sm">SOL Raised</p>
//               <p className="text-lg font-bold">0.43 / 463542.39</p>
//             </div>
//           </div>
//           <div className=" p-3  mb-4 borderpay">
//             <p className="mb-2">You pay</p>
//             <div className="flex items-center bg-brown-700 p-2 rounded">
//               <input
//                 type="number"
//                 className="bg-transparent text-white w-full outline-none"
//                 placeholder="Enter amount"
//               />
//               <img src={sol} width={50} alt="SOL Logo" className="ml-2" />
//             </div>
//           </div>
//           <div className="borderpay p-3  mb-4">
//             <p className="mb-2">You receive</p>
//             <div className="flex items-center bg-brown-700 p-2 rounded">
//               <input
//                 type="number"
//                 className="bg-transparent text-white w-full outline-none"
//                 placeholder="Receive amount"
//               />
//               <img src={lmag} width={50} alt="BBM Logo" className="ml-2" />
//             </div>
//           </div>
//           {publicKey && (
//             <button
//               className="allbtn text-white py-2 px-4 rounded w-full mb-4"
//               onClick={() => buyTokens()}
//             >
//               BUY
//             </button>
//           )}
//           <div className="text-center">
//             <p className="mb-2">Balance: {balance}</p>
//             {/* <button className="allbtn text-white py-2 px-4 rounded">
//               Select Wallet
//             </button> */}
//             <WalletMultiButton />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Buy;
