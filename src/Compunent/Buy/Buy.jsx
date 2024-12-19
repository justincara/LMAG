import React from "react";
import sol from "../assets/download.jpg"
import lmag from "../assets/logo.jpeg"
function Buy() {
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
            <button className="allbtn text-black py-2 px-4 rounded">
              LMAG = $0.01
            </button>
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
              <img
                src={sol}
                width={50}
                alt="SOL Logo"
                className="ml-2"
              />
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
              <img
                src={lmag}
                width={50}
                alt="BBM Logo"
                className="ml-2"
              />
            </div>
          </div>
          <button className="allbtn text-white py-2 px-4 rounded w-full mb-4">
            Select Wallet
          </button>
          <div className="text-center">
            <p className="mb-2">Balance: 0.00</p>
            <button className="allbtn text-white py-2 px-4 rounded">
              Select Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
