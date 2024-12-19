import React from "react";
import "./Work.css"
function Work() {
  return (
    <div className="">
      <div
        className=" text-center container pos px-1 px-lg-5 work"
        id="Whitepaper"
      >
        <h1 className="text-3xl md:text-5xl font-bold mt-5 text-center mb-5 text_shadow text-yellow-500">
            HopePepe Roadmap
            </h1>
        <div className="progress progress1 progress-striped ">
          <div
            className="progress-bar progress-bar-danger"
            role="progressbar"
            aria-valuenow={70}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: "100%" }}
          ></div>
        </div>
        <p className="para step_para">
        Launch website, presale.
        </p>
        <div className="step1 step_no">Phase: 1</div>
        <div className="steper stepper_set"></div>
        <p className="para step_para2">
        Token launch, listing on DEXs, and community building.
        </p>
        <div className="step2 step_no">Phase: 2</div>
        <div className="steper2 stepper_set"></div>
        <p className="para step_para3">
        Burn event, token competitions, and strategic partnerships.
        </p>
        <div className="step3 step_no">Phase: 3</div>
        <div className="steper3 stepper_set"></div>
        <p className="para step_para4">
        Expansion of utility, staking, and NFT integration.
        </p>
        <div className="step4 step_no">Phase: 4</div>
        <div className="steper4  stepper_set"></div>
      </div>

      <div className="demo-preview pb-5 d-block d-md-none">
      <h1 className="text-3xl md:text-5xl font-bold  text-center mb-5 text_shadow text-yellow-500">
            HopePepe Roadmap
            </h1>
        <div className="progress2 vertical">
          <div
            role="progressbar2"
            style={{ height: "95%" }}
            className="progress-bar2"
          >
            <div className="">
              <div className="dot dotmove"></div>
              <div className="res_step res_step_move">Phase: 1</div>
              <p className="res_para res_para_move  text-start">
              Launch website, presale.
              </p>
            </div>
            <div className="">
              <div className="dot dotmove2"></div>
              <div className="res_step res_step_move2">Phase: 2</div>
              <p className="res_para res_para_move2 text-start ">
              Token launch, listing on DEXs, and community building.
              </p>
            </div>
            <div className="">
              <div className="dot dotmove3"></div>
              <div className="res_step res_step_move3">Phase: 3</div>
              <p className="res_para res_para_move3 text-start ">
              Burn event, token competitions, and strategic partnerships
              </p>
            </div>
            <div className="">
              <div className="dot dotmove4"></div>
              <div className="res_step res_step_move4">Phase: 4</div>
              <p className="res_para res_para_move4 text-start ">
              Expansion of utility, staking, and NFT integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
