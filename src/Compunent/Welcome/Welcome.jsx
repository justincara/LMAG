import React, { useState } from "react";
import logo from "../assets/logo.jpeg"
import { Typewriter } from 'react-simple-typewriter'
function Welcome() {
    const handleType = () => {
        // access word count number
        console.log("count")}
     
    
      const handleDone = () => {
        console.log(`Done after 5 loops!`)
      }
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
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <div className="  p-4 ">
        <div className="row items-center">
          <div className="text-center col-12 col-md-6">
            <h1 className="text-yellow-500 text_shadow text-start text-2xl md:text-3xl font-bold">
              Welcome to LMAG Coin
            </h1>
            <h2 className="text-yellow-500 text_shadow text-2xl md:text-4xl lg:text-5xl font-bold mt-4 text-start">
            The Most Potent Coin Representing  Luigi<br/> Mangione –
            <span className="text-4xl" style={{  fontWeight: 'bold' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={[' On Presale Now!', ' On Presale Now!', ' On Presale Now!', ' On Presale Now!']}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={200}
            deleteSpeed={150}
            delaySpeed={1000}
            onLoopDone={handleDone}
            onType={handleType}
          />
        </span>
             
            </h2>
            <div className="bg-yellow-500 text-white p-3 rounded mt-4 flex items-center justify-between">
              <span className="break-all "style={{fontSize:"20px"}}>
               {text}

              </span>
             <span onClick={handleCopy}>{copyStatus}</span>
            </div>
            <div className="flex justify-content-center">
            <button className="allbtn text-white text-sm font-bold py-2 px-4 rounded-full mt-6">
            Buy LMAG Now
            </button>
            {/* <button className="allbtn ms-3 text-white text-sm font-bold py-2 px-4 rounded-full mt-6">
            Copy Token Address <i className="fas fa-copy"></i>
            </button> */}
          </div></div>
          <div className="mt-8 col-12 col-md-6">
            <img
              src={logo} 
              alt="Pepe the frog sitting on a throne with gold coins around"
              className="w-full max-w-md mx-auto rounded-4 "style={{border:"1px solid #e3ab1e",boxShadow:"0px 0px 30px  #e3ab1e"}}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Welcome;
