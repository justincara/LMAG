import React, { useEffect, useState, useRef } from "react";
import RoadmapXS from "./RoadmapXS";
import { Typography } from "@mui/material";

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      description: "Launch Website, Presale",
    },
    {
      phase: "Phase 2",
      description: "Token launch, listing on DEXs, and community building.",
    },
    {
      phase: "Phase 3",
      description: "Burn event, token competitions, and strategic partnerships.",
    },
    {
      phase: "Phase 4",
      description: "Expansion of utility, staking, and NFT integration.",
    },
  ];

  const [activePhase, setActivePhase] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Trigger when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePhase(Number(entry.target.dataset.index));
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const [isXS, setIsXS] = useState(window.matchMedia("(max-width: 640px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const handleResize = () => setIsXS(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (isXS) return <RoadmapXS />;

  return (
    <div id="roadmap" className="min-h-screen bg-black p-8" style={{ paddingTop: "100px", marginTop: '125px' }}>
      <div className="max-w-4xl mx-auto">
        <Typography
          variant="h3"
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
            color: 'white',
            paddingBottom: "40px" 
          }}
        >
          LMAG Roadmap
        </Typography>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-yellow-500 h-full"
            style={{
              zIndex: 1,
            }}
          />

          {phases.map((phase, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="relative mb-64"
              style={{
                "@media (max-width: 640px)": {
                  marginBottom: "48px", // Reduce gap for smaller screens
                },
              }}
            >
              {/* Horizontal Line */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-[150px] h-2 hidden sm:block ${
                  activePhase === index ? "bg-yellow-500" : "bg-gray-700"
                } ${index % 2 === 0 ? "right-1/2" : "left-1/2"}`}
                style={{
                  zIndex: 1,
                }}
              />

              {/* Timeline Node */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full"
                style={{
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  backgroundColor: activePhase === index ? "#fff" : "#000", // Active is white, others black
                  border: activePhase === index ? "6px solid #EFBF04" : "3px solid #666",
                  transition: "all 0.3s ease-in-out", // Smooth transition
                }}
              />

              {/* Phase Label */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                  index % 2 === 0 ? "right-1/2 pr-40" : "left-1/2 pl-40"
                }`}
                style={{
                  "@media (max-width: 640px)": {
                    padding: "0px", // Remove left/right padding for smaller screens
                    transform: "translateY(-60%)", // Adjust gap
                  },
                }}
              >
                <div
                  className={`px-6 py-2 inline-block font-bold ${
                    activePhase === index
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  style={{
                    fontSize: "20px",
                    transition: "all 0.3s ease-in-out",
                    fontFamily: "Lora, serif",
                  }}
                >
                  {phase.phase}
                </div>
              </div>

              {/* Phase Description */}
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? "ml-auto pr-40" : "pl-40"
                }`}
              >
                <p
                  className={`text-white mt-12 ${
                    activePhase === index ? "opacity-100" : "opacity-50"
                  }`}
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.6,
                    transition: "opacity 0.3s ease-in-out",
                    fontFamily: "Lora, serif",
                  }}
                >
                  {phase.description}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom Arrow */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 
                        border-l-[12px] border-l-transparent 
                        border-t-[16px] border-t-yellow-500 
                        border-r-[12px] border-r-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
