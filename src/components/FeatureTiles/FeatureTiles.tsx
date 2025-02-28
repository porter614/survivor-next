import React from "react";
import FeatureCard from "./FeatureTile";
import { GrGraphQl } from "react-icons/gr/";
import { GiFireBowl, GiSolarTime } from "react-icons/gi/";
import { IoIosPeople } from "react-icons/io/";

const FeatureContainer = () => (
  <section className="pt-16 pb-32 px-0 bg-gradient-to-b from-gray-900 to-gray-800 w-screen">
    <div className="w-full">
      <div className="text-center mb-12 px-4 pt-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Explore Survivor<span className="text-orange-400">DB</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Dive into our comprehensive database of Survivor statistics, players,
          and seasons.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8">
        <FeatureCard
          title="Players"
          link="/players"
          details="Rank your favorite players. Sort them according to gender, race, age, SurvivorScore, and more to discover new insights about contestants."
          icon={<IoIosPeople />}
        />
        <FeatureCard
          title="Versus"
          link="/versus"
          details="Matchup contestants 1v1 to compare their gameplay, statistics, and achievements. See who truly played it best across different seasons."
          icon={<GiFireBowl />}
        />
        <FeatureCard
          title="Seasons"
          link="/seasons"
          details="Get rankings for all the seasons based on third-party reviews and statistics accumulated from player data. Find the most exciting seasons to watch."
          icon={<GiSolarTime />}
        />
        <FeatureCard
          title="Connections"
          link="/graph"
          details="Explore an interactive visualization of returning players and see who has played with whom throughout Survivor history. Discover surprising connections."
          icon={<GrGraphQl />}
        />
      </div>
    </div>
  </section>
);

export default FeatureContainer;
