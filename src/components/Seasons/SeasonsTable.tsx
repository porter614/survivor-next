import { useState, useMemo } from "react";
import Image from "next/image";
import {
  FaTrophy,
  FaUsers,
  FaCalendarAlt,
  FaVoteYea,
  FaUserFriends,
  FaChair,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { GiPodium, GiTrophy } from "react-icons/gi";
import { alltimeSurvivorSeasons } from "./seasonData";

type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
};

type Season = {
  title: string;
  total_players: number;
  total_days: number;
  challenge_stats: {
    total_immunity_challenges: number;
    total_reward_challenges: number;
    total_individual_challenges: number;
    total_tribal_challenges: number;
  };
  tribal_stats: {
    total_tribal_councils: number;
    total_votes_cast: number;
    total_wrong_votes: number;
  };
  jury_size: number;
  finalists: number;
  sit_outs: number;
  season_number: number;
  average_player_score: number;
};

const columns = [
  {
    key: "season_number",
    label: "Season",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-4">
        <div className="w-40 h-24 relative rounded-lg overflow-hidden">
          <Image
            src={`https://survivordb.s3.us-east-1.amazonaws.com/${season.season_number}.jpg`}
            alt={season.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
        <div>
          <div className="font-bold text-white text-lg">{season.title}</div>
          <div className="text-sm text-gray-400">
            Season {season.season_number}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "total_players",
    label: "Players",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaUsers className="text-orange-400" />
        <span>{season.total_players}</span>
      </div>
    ),
  },
  {
    key: "total_days",
    label: "Days",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaCalendarAlt className="text-orange-400" />
        <span>{season.total_days}</span>
      </div>
    ),
  },
  {
    key: "challenge_stats.total_immunity_challenges",
    label: "Immunity Challenges",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaTrophy className="text-orange-400" />
        <span>{season.challenge_stats.total_immunity_challenges}</span>
      </div>
    ),
  },
  {
    key: "challenge_stats.total_reward_challenges",
    label: "Reward Challenges",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <GiTrophy className="text-orange-400" />
        <span>{season.challenge_stats.total_reward_challenges}</span>
      </div>
    ),
  },
  {
    key: "challenge_stats.total_individual_challenges",
    label: "Individual Challenges",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaTrophy className="text-orange-400" />
        <span>{season.challenge_stats.total_individual_challenges}</span>
      </div>
    ),
  },
  {
    key: "challenge_stats.total_tribal_challenges",
    label: "Tribal Challenges",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaUsers className="text-orange-400" />
        <span>{season.challenge_stats.total_tribal_challenges}</span>
      </div>
    ),
  },
  {
    key: "tribal_stats.total_tribal_councils",
    label: "Tribal Councils",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaVoteYea className="text-orange-400" />
        <span>{season.tribal_stats.total_tribal_councils}</span>
      </div>
    ),
  },
  {
    key: "tribal_stats.total_votes_cast",
    label: "Votes Cast",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaVoteYea className="text-orange-400" />
        <span>{season.tribal_stats.total_votes_cast}</span>
      </div>
    ),
  },
  {
    key: "tribal_stats.total_wrong_votes",
    label: "Wrong Votes",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaVoteYea className="text-orange-400" />
        <span>{season.tribal_stats.total_wrong_votes}</span>
      </div>
    ),
  },
  {
    key: "jury_size",
    label: "Jury Size",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaUserFriends className="text-orange-400" />
        <span>{season.jury_size}</span>
      </div>
    ),
  },
  {
    key: "finalists",
    label: "Finalists",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <GiPodium className="text-orange-400" />
        <span>{season.finalists}</span>
      </div>
    ),
  },
  {
    key: "sit_outs",
    label: "Sit Outs",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <FaChair className="text-orange-400" />
        <span>{season.sit_outs}</span>
      </div>
    ),
  },
  {
    key: "average_player_score",
    label: "Season Rating",
    sortable: true,
    render: (season: Season) => (
      <div className="flex items-center space-x-2">
        <GiPodium className="text-orange-400" />
        <span>{season.average_player_score.toFixed(2)}</span>
      </div>
    ),
  },
];

export default function SeasonsTable() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "season_number",
    direction: "descending",
  });
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null);

  const sortedSeasons = useMemo(() => {
    const seasons = Object.values(alltimeSurvivorSeasons[0]);
    return [...seasons].sort((a, b) => {
      const getValue = (obj: any, path: string) => {
        return path.split(".").reduce((o, i) => o[i], obj);
      };

      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig]);

  const requestSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  // Mobile header for sorting
  const MobileTableHeader = () => (
    <div className="bg-gray-800 p-4 sticky top-0 z-10">
      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        {columns.map((column) => (
          <div
            key={column.key}
            className={`flex-shrink-0 px-3 py-2 cursor-pointer rounded-lg 
              ${
                sortConfig.key === column.key
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }
              ${
                column.key === "season_number"
                  ? "min-w-[120px]"
                  : "min-w-[100px]"
              }`}
            onClick={() => column.sortable && requestSort(column.key)}
          >
            <div className="flex items-center space-x-1 text-xs uppercase text-gray-400">
              <span>{column.label}</span>
              {column.sortable && sortConfig.key === column.key && (
                <span className="text-orange-400">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile season view
  const MobileSeasonView = ({ season }: { season: Season }) => {
    const isExpanded = expandedSeason === season.season_number;

    return (
      <div className="border-b border-gray-700 last:border-b-0">
        <div
          className="p-4 flex items-center justify-between cursor-pointer"
          onClick={() =>
            setExpandedSeason(isExpanded ? null : season.season_number)
          }
        >
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden">
              <Image
                src={`https://survivordb.s3.us-east-1.amazonaws.com/${season.season_number}.jpg`}
                alt={season.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder.jpg";
                }}
              />
            </div>
            <div>
              <div className="font-bold text-white">{season.title}</div>
              <div className="text-sm text-gray-400">
                Season {season.season_number}
              </div>
            </div>
          </div>
          {isExpanded ? (
            <FaChevronUp className="text-gray-400" />
          ) : (
            <FaChevronDown className="text-gray-400" />
          )}
        </div>

        {isExpanded && (
          <div className="px-4 pb-4 space-y-3">
            {columns.slice(1).map((column) => (
              <div
                key={column.key}
                className="flex justify-between items-center"
              >
                <span className="text-gray-400">{column.label}</span>
                <div>{column.render(season)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Desktop table view
  const DesktopTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-800 text-gray-400">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-4 cursor-pointer hover:bg-gray-700 whitespace-nowrap ${
                  column.key === "season_number"
                    ? "min-w-[400px]"
                    : "min-w-[150px]"
                }`}
                onClick={() => column.sortable && requestSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && sortConfig.key === column.key && (
                    <span>
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {sortedSeasons.map((season) => (
            <tr key={season.season_number} className="hover:bg-gray-800">
              {columns.map((column) => (
                <td
                  key={`${season.season_number}-${column.key}`}
                  className={`px-6 py-4 whitespace-nowrap ${
                    column.key === "season_number"
                      ? "min-w-[400px]"
                      : "min-w-[150px]"
                  }`}
                >
                  {column.render(season)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl">
      {/* Mobile view */}
      <div className="lg:hidden">
        <MobileTableHeader />
        <div className="divide-y divide-gray-700">
          {sortedSeasons.map((season) => (
            <MobileSeasonView key={season.season_number} season={season} />
          ))}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block">
        <DesktopTableView />
      </div>
    </div>
  );
}

// Add this CSS to your global styles or as a styled component
const globalStyles = `
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;
