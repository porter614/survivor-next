import React from "react";
import { FeatureTiles } from "@components/FeatureTiles";

import { FaArrowDown } from "react-icons/fa/";
import styles from "./Hero.module.scss";

interface HeroProps {}

const Hero = () => {
  return (
    <section className="flex items-center justify-center h-[90vh]">
      <div className="flex flex-col items-center">
        <h1 className="px-16 text-[12vw] md:text-6xl lg:text-9xl text-white text-slate-200 shadow-text">
          Survivor<span className="text-orange-400">{"<"}</span>
          <strong className="text-neutral-700">{"DB"}</strong>
          <span className="text-orange-400">{">"}</span>
        </h1>
        <h2 className="text-xs text-slate-300 shadow-text">
          A database for all things Survivor
        </h2>
        <div className="flex animate-bounce w-8 h-8 bg-orange-400 rounded-xl flex-wrap content-center justify-center mt-4">
          <FaArrowDown />
        </div>
      </div>
    </section>
  );
};

export default Hero;
