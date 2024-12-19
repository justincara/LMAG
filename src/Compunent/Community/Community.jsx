import React from 'react'

function Community() {
  return (
    <div className='container pt-5' style={{marginTop:"7%"}}>
 <div className="widthAbout my-5 ">
      <h1 className="text-yellow-500 text_shadow text-center text-3xl md:text-5xl font-bold">Join the LMAG Community</h1>
      <p className="text-center pt-4">
      Be a part of the LMAG family. Share your voice and support the movement!
      </p>
      <div className='d-flex justify-content-center gap-3 mt-5'>
      <button className="allbtn text-white font-bold py-2 px-4 rounded-full d-flex items-center gap-2">Join Telegram <i className="fa fa-telegram" style={{fontSize:"24px"}}></i></button>
      <button className="allbtn text-white font-bold py-2 px-4 rounded-full d-flex items-center gap-2">Follow on Twitte <i className="fa fa-twitter" style={{fontSize:"24px"}}></i></button>

      </div>
    </div>

    </div>
  )
}

export default Community