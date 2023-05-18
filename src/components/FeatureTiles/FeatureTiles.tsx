import React from "react";
import FeatureCard from "./FeatureTile";
import { GrGraphQl } from "react-icons/gr/";
import { GiFireBowl, GiSolarTime } from "react-icons/gi/";
import { IoIosPeople } from "react-icons/io/";

const FeatureContainer = () => (
  <div className="grid md:grid-cols-2 gap-4">
    <FeatureCard
      title="Players"
      link="/players"
      details="Rank your favorite players. Sort them according to gender, race, age, SurvivorScore, etc..."
      icon={<IoIosPeople />}
    />
    <FeatureCard
      title="Versus"
      link="/versus"
      details="Matchup Contestants 1 v 1 to see who played it best"
      icon={<GiFireBowl />}
    />
    <FeatureCard
      title="Seasons"
      link="/seasons"
      details="Get rankings for all the seasons. Based on third party reviews and stats accumulated from player data."
      icon={<GiSolarTime />}
    />
    <FeatureCard
      title="Connections"
      link="/graph"
      details="Returning player visualization of who has played with who in the game of survivor."
      icon={<GrGraphQl />}
    />
  </div>
);

export default FeatureContainer;
