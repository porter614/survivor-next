import { useRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";
import { alltimeSurvivorPlayers } from "@components/Players/playerData";
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

const VersusPage = () => {
  const router = useRouter();
  const [player1Id, setPlayer1Id] = useState<string | null>(null);
  const [player2Id, setPlayer2Id] = useState<string | null>(null);

  // Set initial player1 from URL params
  useEffect(() => {
    if (router.isReady && router.query.player1) {
      setPlayer1Id(router.query.player1 as string);
    }
  }, [router.isReady, router.query.player1]);

  const player1 = useMemo(() => {
    if (!player1Id) return null;
    return alltimeSurvivorPlayers.find((p) => p.contestant_id === player1Id);
  }, [player1Id]);

  const player2 = useMemo(() => {
    if (!player2Id) return null;
    return alltimeSurvivorPlayers.find((p) => p.contestant_id === player2Id);
  }, [player2Id]);

  const compareStats = (stat1: number, stat2: number | null) => {
    if (stat2 === null) return "";
    if (stat1 > stat2) return "bg-green-400/20 text-green-400"; // Modified to include background
    if (stat1 < stat2) return "bg-red-400/20 text-red-400"; // Modified to include background
    return ""; // Equal values
  };

  const statGroups = [
    {
      title: "Challenge Performance",
      stats: [
        {
          label: "Challenge Wins",
          getValue: (p: any) => p.challengeWins,
          icon: <FaTrophy className="text-orange-400" />,
        },
        {
          label: "Win Rate",
          getValue: (p: any) => Math.round(p.challengeWinPercentage * 100),
          format: (val: number) => `${val}%`,
          icon: <FaTrophy className="text-orange-400" />,
        },
        {
          label: "Individual Immunity",
          getValue: (p: any) => p.individualImmunityChallengeWins,
          icon: <FaMedal className="text-orange-400" />,
        },
        {
          label: "Individual Reward",
          getValue: (p: any) => p.individualRewardChallengeWins,
          icon: <FaGift className="text-orange-400" />,
        },
        {
          label: "Sit Outs",
          getValue: (p: any) => p.sitOuts,
          icon: <FaChair className="text-orange-400" />,
          reverse: true, // Higher is worse for this stat
        },
      ],
    },
    {
      title: "Tribal Council",
      stats: [
        {
          label: "Correct Votes",
          getValue: (p: any) => p.votesForBootee,
          icon: <FaCheck className="text-green-400" />,
        },
        {
          label: "Wrong Votes",
          getValue: (p: any) => p.wrongSideOfTheVote,
          icon: <FaTimes className="text-red-400" />,
          reverse: true,
        },
        {
          label: "Votes Against",
          getValue: (p: any) => p.votesAgainst,
          icon: <FaVoteYea className="text-orange-400" />,
          reverse: true,
        },
        {
          label: "Jury Votes",
          getValue: (p: any) => p.juryVotesReceived,
          icon: <GiPodium className="text-orange-400" />,
        },
      ],
    },
    {
      title: "Game Stats",
      stats: [
        {
          label: "Days Played",
          getValue: (p: any) => p.daysPlayed,
          icon: <FaCalendarAlt className="text-orange-400" />,
        },
        {
          label: "Place",
          getValue: (p: any) => p.place,
          icon: <GiPodium className="text-orange-400" />,
          reverse: true,
        },
        {
          label: "Season",
          getValue: (p: any) => p.season,
          icon: <FaUsers className="text-orange-400" />,
        },
        {
          label: "Rank",
          getValue: (p: any) => Number(p.rank),
          format: (val: number) => val.toFixed(2),
          icon: <GiPodium className="text-orange-400" />,
        },
      ],
    },
  ];

  const PlayerSelector = ({
    playerId,
    setPlayerId,
    otherPlayerId,
    label,
  }: {
    playerId: string | null;
    setPlayerId: (id: string | null) => void;
    otherPlayerId: string | null;
    label: string;
  }) => (
    <div className="bg-gray-800 rounded-lg p-6 flex-1">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {label}
      </h2>
      <select
        className="bg-gray-700 text-white rounded p-2 w-full max-w-md mx-auto block"
        value={playerId || ""}
        onChange={(e) => setPlayerId(e.target.value || null)}
      >
        <option value="">Choose a player...</option>
        {alltimeSurvivorPlayers
          .filter((p) => p.contestant_id !== otherPlayerId)
          .map((p) => (
            <option key={p.contestant_id} value={p.contestant_id}>
              {p.contestant} (Season {p.season})
            </option>
          ))}
      </select>
    </div>
  );

  const renderPlayerStats = (player: any, otherPlayer: any | null) => (
    <div className="bg-gray-800 rounded-lg p-6 flex-1">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-48 h-64 mb-4">
          <img
            src={
              player.profile_image_link ||
              player.image_link ||
              "/placeholder.jpg"
            }
            alt={player.contestant}
            className="w-full h-full rounded-3xl object-cover border-4 border-orange-400"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
        <h2 className="text-2xl font-bold text-white">{player.contestant}</h2>
        <p className="text-gray-400">
          Season {player.season} •{" "}
          {player.hometown !== "unknown" ? player.hometown : ""}
        </p>
      </div>

      {statGroups.map((group, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-orange-400 font-semibold text-lg mb-3">
            {group.title}
          </h3>
          <div className="space-y-2">
            {group.stats.map((stat, statIdx) => {
              const value = stat.getValue(player);
              const otherValue = otherPlayer
                ? stat.getValue(otherPlayer)
                : null;
              const compareClass = otherPlayer
                ? compareStats(
                    stat.reverse ? -value : value,
                    stat.reverse ? -otherValue! : otherValue
                  )
                : "";

              return (
                <div
                  key={statIdx}
                  className={`flex items-center justify-between rounded p-2 transition-colors duration-200 ${
                    compareClass || "bg-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {stat.icon}
                    <span
                      className={`${
                        compareClass ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <span className="font-semibold">
                    {stat.format ? stat.format(value) : value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <PlayerSelector
            playerId={player1Id}
            setPlayerId={setPlayer1Id}
            otherPlayerId={player2Id}
            label="Select Player 1"
          />
          <PlayerSelector
            playerId={player2Id}
            setPlayerId={setPlayer2Id}
            otherPlayerId={player1Id}
            label="Select Player 2"
          />
        </div>

        {player1 ? (
          <div className="flex flex-col md:flex-row gap-8">
            {renderPlayerStats(player1, player2)}
            {player2 && renderPlayerStats(player2, player1)}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg">
            Please select a player to view their stats
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => router.push("/players")}
          >
            Back to Players
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersusPage;
