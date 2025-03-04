import React from "react";
import {
  FaTrophy,
  FaMedal,
  FaCalendarAlt,
  FaUsers,
  FaCheck,
  FaTimes,
  FaVoteYea,
  FaChair,
  FaGift,
} from "react-icons/fa";
import { GiPodium } from "react-icons/gi";

type Player = {
  id: number;
  season: number;
  contestant_id: string;
  contestant: string;
  image_link: string;
  profile_image_link: string;
  challengeWins: number;
  challengeWinPercentage: number;
  individualImmunityChallengeWins: number;
  individualRewardChallengeWins: number;
  sitOuts: number;
  votesForBootee: number;
  wrongSideOfTheVote: number;
  votesAgainst: number;
  juryVotesReceived: number;
  daysPlayed: number;
  place: number;
  rank: number;
  hometown: string;
};

interface PlayerShowcaseProps {
  player: Player;
}

const PlayerShowcase: React.FC<PlayerShowcaseProps> = ({ player }) => {
  const statGroups = [
    {
      title: "Challenge Performance",
      stats: [
        {
          label: "Challenge Wins",
          value: player.challengeWins,
          icon: <FaTrophy className="text-orange-400" />,
        },
        {
          label: "Win Rate",
          value: `${Math.round(player.challengeWinPercentage * 100)}%`,
          icon: <FaTrophy className="text-orange-400" />,
        },
        {
          label: "Individual Immunity",
          value: player.individualImmunityChallengeWins,
          icon: <FaMedal className="text-orange-400" />,
        },
        {
          label: "Individual Reward",
          value: player.individualRewardChallengeWins,
          icon: <FaGift className="text-orange-400" />,
        },
        {
          label: "Sit Outs",
          value: player.sitOuts,
          icon: <FaChair className="text-orange-400" />,
        },
      ],
    },
    {
      title: "Tribal Council",
      stats: [
        {
          label: "Correct Votes",
          value: player.votesForBootee,
          icon: <FaCheck className="text-green-400" />,
        },
        {
          label: "Wrong Votes",
          value: player.wrongSideOfTheVote,
          icon: <FaTimes className="text-red-400" />,
        },
        {
          label: "Votes Against",
          value: player.votesAgainst,
          icon: <FaVoteYea className="text-orange-400" />,
        },
        {
          label: "Jury Votes",
          value: player.juryVotesReceived,
          icon: <GiPodium className="text-orange-400" />,
        },
      ],
    },
    {
      title: "Game Stats",
      stats: [
        {
          label: "Days Played",
          value: player.daysPlayed,
          icon: <FaCalendarAlt className="text-orange-400" />,
        },
        {
          label: "Place",
          value: `${player.place}${getOrdinalSuffix(player.place)}`,
          icon: <GiPodium className="text-orange-400" />,
        },
        {
          label: "Season",
          value: player.season,
          icon: <FaUsers className="text-orange-400" />,
        },
        {
          label: "Rank",
          value: player.rank.toFixed(2),
          icon: <GiPodium className="text-orange-400" />,
        },
      ],
    },
  ];

  function getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center mb-12 space-y-6 md:space-y-0 md:space-x-6 py-4">
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex-shrink-0">
          <img
            src={
              player.profile_image_link ||
              player.image_link ||
              "/placeholder.jpg"
            }
            alt={player.contestant}
            className="w-full h-full rounded-full object-cover border-4 border-orange-400"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-2">
            {player.contestant}
          </h1>
          <p className="text-gray-400 text-lg">
            Season {player.season} •{" "}
            {player.hometown !== "unknown" ? player.hometown : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statGroups.map((group, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <h2 className="text-orange-400 font-semibold text-xl mb-4 text-center">
              {group.title}
            </h2>
            <div className="space-y-3">
              {group.stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className="flex items-center justify-between bg-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-2">
                    {stat.icon}
                    <span className="text-gray-300">{stat.label}</span>
                  </div>
                  <span className="text-white font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerShowcase;
