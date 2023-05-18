import React from "react";
import { FeatureTiles } from "@components/FeatureTiles";

import { FaArrowDown } from "react-icons/fa/";
import styles from "./Hero.module.scss";

interface HeroProps {}

const Hero = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center fixed">
        <h1 className="text-3xl md:text-6xl lg:text-9xl text-white drop-shadow-2xl">
          Survivor<strong>{"<DB>"}</strong>
        </h1>
        <h2>A database for all things Survivor</h2>
      </div>
    </section>
  );
};

export default Hero;
