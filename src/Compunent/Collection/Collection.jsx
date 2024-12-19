import React from "react";
import logo from "../assets/logo.jpeg";
import coll1 from "../assets/coool1.jpeg";
import coll2 from "../assets/coool2.jpeg";

function Collection() {
  return (
    <div className="container">
      <h1 className="text-3xl md:text-5xl font-bold my-5 text-center mb-5 text_shadow text-yellow-500">
        LMAG Coin Art Collection
      </h1>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 ">
          {" "}
          <img
            src={coll1}
            alt="Pepe the frog sitting on a throne with gold coins around"
            className="w-full max-w-md mx-auto rounded-4 mt-2"
            style={{
              height:"45vh",
              border: "1px solid #e3ab1e",
              boxShadow: "0px 0px 15px  #e3ab1e",
            }}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          {" "}
          <img
            src={coll2}
            alt="Pepe the frog sitting on a throne with gold coins around"
            className="w-full max-w-md mx-auto rounded-4 mt-2"
            style={{
              height:"45vh",
              border: "1px solid #e3ab1e",
              boxShadow: "0px 0px 15px  #e3ab1e",
            }}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          {" "}
          <img
            src={coll1}
            alt="Pepe the frog sitting on a throne with gold coins around"
            className="w-full max-w-md mx-auto rounded-4 mt-2"
            style={{
              height:"45vh",
              border: "1px solid #e3ab1e",
              boxShadow: "0px 0px 15px  #e3ab1e",
            }}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          {" "}
          <img
            src={coll2}
            alt="Pepe the frog sitting on a throne with gold coins around"
            className="w-full max-w-md mx-auto rounded-4 mt-2"
            style={{
              height:"45vh",
              border: "1px solid #e3ab1e",
              boxShadow: "0px 0px 15px  #e3ab1e",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Collection;
