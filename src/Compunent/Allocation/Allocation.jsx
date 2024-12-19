import React from 'react'
import logo from "../assets/logo.jpeg"

function Allocation() {
  return (
    <div className='container'>
           <h1 className="text-3xl md:text-5xl font-bold my-5 text-center mb-5 text_shadow text-yellow-500">
           LMAG Tokenomics
      </h1>
        <div className="row items-center">
            <div className="col-12 col-md-6 p-5">
            <img
            src={logo}
            alt="Pepe the frog sitting on a throne with gold coins around"
            className="w-full max-w-md mx-auto rounded-4 mt-2"
            style={{
              border: "1px solid #e3ab1e",
              boxShadow: "0px 0px 25px  #e3ab1e",
            }}
          />
            </div>
            <div className="col-12 col-md-6">
            <div className="widthAllocation mb-5 ">
      <h1 className="text-yellow-500 text_shadow  text-2xl  font-bold">Token Allocation:</h1>
     <ul className='a'>
        <li>Presale Allocation: <strong style={{color:"#e3ab1e"}}>5%</strong> </li>		
        <li>Liquidity: <strong style={{color:"#e3ab1e"}}>10%</strong></li>
        <li>Marketing & Development: <strong style={{color:"#e3ab1e"}}>5%</strong></li>
        <li>Burn Allocation: <strong style={{color:"#e3ab1e"}}>80%</strong></li>
     </ul>
    </div>
            </div>
        </div>
    </div>
  )
}

export default Allocation