import React, { useState, useEffect } from "react";

const RoadmapXS = () => {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const phaseElements = document.querySelectorAll(".phase-section");

      phaseElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          setActivePhase(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black p-6" style={{ marginTop: '150px'}}>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          LMAG Roadmap
        </h1>

        {/* Timeline for XS Screens */}
        <div className="flex flex-col gap-12">
          {phases.map((phase, index) => (
            <div
              key={index}
              className={`text-center phase-section transition-opacity duration-300 ${
                activePhase === index ? "opacity-100" : "opacity-50"
              }`}
            >
              {/* Phase Circle */}
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors duration-300 ${
                  activePhase === index ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
                }`}
              >
                {index + 1}
              </div>
              {/* Phase Details */}
              <div className="mt-4">
                <div
                  className={`font-bold transition-colors duration-300 text-lg ${
                    activePhase === index ? "text-yellow-500" : "text-gray-500"
                  }`}
                >
                  {phase.phase}
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapXS;
