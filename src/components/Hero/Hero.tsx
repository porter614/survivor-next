import React, { useEffect, useState } from "react";
import { FeatureTiles } from "@components/FeatureTiles";
import { FaArrowDown, FaFire } from "react-icons/fa/";
import { GiTorch } from "react-icons/gi/";
import styles from "./Hero.module.scss";

interface HeroProps {}

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById("featureTiles");
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[90vh] py-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 to-transparent z-0"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div
        className={`flex flex-col items-center relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Main content */}
        <h1 className="px-16 text-[12vw] md:text-6xl lg:text-9xl font-bold from-white via-slate-200 to-gray-300 tracking-tight flex">
          <span className="shadow-text px-0">Survivor</span>{" "}
          <span className="shadow-text text-orange-400">{"<"}</span>
          <strong className="text-blue-950">{"DB"}</strong>
          <span className="shadow-text text-orange-400">{">"}</span>
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full my-4"></div>

        <h2 className="text-sm md:text-base text-slate-300 shadow-text font-light tracking-wider mb-12 mx-16 text-center">
          A COMPREHENSIVE DATABASE FOR ALL THINGS SURVIVOR
        </h2>

        <div
          className="flex animate-bounce w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex-wrap content-center justify-center cursor-pointer hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20 group"
          onClick={scrollToFeatures}
          aria-label="Scroll to features"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToFeatures();
            }
          }}
        >
          <FaFire className="text-white m-auto group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
