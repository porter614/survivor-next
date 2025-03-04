import React, { useState, useMemo } from "react";
import { alltimeSurvivorPlayers } from "@components/Players/playerData";
import NextLink from "next/link";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaTrophy,
  FaCalendarAlt,
  FaMedal,
  FaGift,
  FaChair,
  FaCheck,
  FaTimes,
  FaVoteYea,
  FaUsers,
} from "react-icons/fa";
import { GiTrophy, GiPodium } from "react-icons/gi";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

// Define the Player type based on the data structure
type Player = {
  id: number;
  season: number;
  contestant_id: string;
  contestant: string;
  image_link: string;
  profile_image_link: string;
  birthdate: string;
  occupations: string[];
  hometown: string;
  challengeWins: number;
  challengeAppearances: number;
  challengeWinPercentage: number;
  immunityChallengeAppearances: number;
  immunityChallengeWins: number;
  rewardChallengeAppearances: number;
  rewardChallengeWins: number;
  individualImmunityChallengeWins: number;
  individualRewardChallengeWins: number;
  place: number;
  rank: number;
  sitOuts: number;
  votesForBootee: number;
  wrongSideOfTheVote: number;
  votesAgainst: number;
  totalVotesCast: number;
  tribalCouncilAppearances: number;
  juryVotesReceived: number;
  daysPlayed: number;
  didNotFinish: boolean;
};

// Define the column configuration
type Column = {
  key: keyof Player;
  label: string;
  description: string;
  sortable: boolean;
  render?: (value: any, player: Player) => React.ReactNode;
};

// Add this new type for the stats display
type StatGroup = {
  title: string;
  stats: {
    label: string;
    value: number | string;
    icon?: React.ReactNode;
    color?: string;
  }[];
};

// Add this new component for the expanded view
const ExpandedPlayerStats: React.FC<{ player: Player }> = ({ player }) => {
  const statGroups: StatGroup[] = [
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
          icon: <GiTrophy className="text-orange-400" />,
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
          label: "Appearances",
          value: player.tribalCouncilAppearances,
          icon: <FaUsers className="text-orange-400" />,
        },
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
          value: player.place,
          icon: <GiPodium className="text-orange-400" />,
        },
        {
          label: "Rank",
          value: Number(player.rank).toFixed(2),
          icon: <GiPodium className="text-orange-400" />,
        },
      ],
    },
  ];

  return (
    <div className="px-2 sm:px-6 py-4 bg-gray-800 border-t border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statGroups.map((group, idx) => (
          <div key={idx} className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-orange-400 font-semibold mb-3">
              {group.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className="flex items-center space-x-2 min-w-0"
                >
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {stat.icon}
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      {stat.label}:
                    </span>
                  </div>
                  <span className="text-white font-semibold truncate">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add this new component for the tooltip
const Tooltip: React.FC<{
  children: React.ReactNode;
  content: string;
}> = ({ children, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="bg-gray-900 text-white text-sm p-2 rounded-md shadow-lg max-w-xs z-50"
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

const PlayersPage = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player;
    direction: "ascending" | "descending";
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 20;

  // Add this new state
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Define the columns for the table
  const columns: Column[] = [
    {
      key: "contestant",
      label: "Player",
      description: "Contestant's name and hometown information",
      sortable: true,
      render: (value, player) => (
        <NextLink
          href={`/versus?player1=${encodeURIComponent(player.contestant_id)}`}
          onClick={(e) => e.stopPropagation()} // Prevent row expansion when clicking the link
          className="flex items-center space-x-3 hover:text-orange-400 transition-colors"
        >
          <div className="avatar">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={
                  player.profile_image_link ||
                  player.image_link ||
                  "/placeholder.jpg"
                }
                alt={value}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder.jpg";
                }}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{value}</div>
            <div className="text-sm opacity-50">
              {player.hometown !== "unknown" ? player.hometown : ""}
            </div>
          </div>
        </NextLink>
      ),
    },
    {
      key: "season",
      label: "Season",
      description:
        "The Survivor season number in which the contestant participated",
      sortable: true,
      render: (value) => <div className="badge badge-outline">{value}</div>,
    },
    {
      key: "daysPlayed",
      label: "Days Played",
      description: "Total number of days the contestant lasted in the game",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "challengeWins",
      label: "Challenge Wins",
      description:
        "Total number of challenges won (including both tribal and individual challenges)",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaTrophy className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "challengeWinPercentage",
      label: "Win %",
      description:
        "Percentage of challenges won out of total challenges participated in",
      sortable: true,
      render: (value) => {
        const percentage = Math.round(value * 100);
        return (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-orange-400 text-orange-400 font-semibold">
              {percentage}%
            </div>
            <div className="ml-2 w-16 bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-orange-400 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      },
    },
    {
      key: "votesAgainst",
      label: "Votes Against",
      description:
        "Total number of votes cast against this player at tribal council",
      sortable: true,
    },
    {
      key: "juryVotesReceived",
      label: "Jury Votes",
      description:
        "Number of votes received from the jury if the player made it to the final tribal council",
      sortable: true,
      render: (value) => (
        <span className={value > 0 ? "font-bold text-orange-400" : ""}>
          {value}
        </span>
      ),
    },
    {
      key: "place",
      label: "Place",
      description: "Final placement in their season (1st = winner)",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          {value === 1 && <GiTrophy className="mr-2 text-orange-400" />}
          {value > 1 && <GiPodium className="mr-2 text-orange-400" />}
          <div className="badge badge-outline">{value}</div>
        </div>
      ),
    },
    {
      key: "rank",
      label: "Rank",
      description: "Overall player ranking based on game performance metrics",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <div className="text-orange-400 font-semibold">
            {Number(value).toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      key: "immunityChallengeWins",
      label: "Immunity Wins",
      description: "Number of tribal immunity challenges won",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaMedal className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "rewardChallengeWins",
      label: "Reward Wins",
      description: "Number of tribal reward challenges won",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaGift className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "individualImmunityChallengeWins",
      label: "Individual Immunity",
      description:
        "Number of individual immunity challenges won after the merge",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <GiTrophy className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "individualRewardChallengeWins",
      label: "Individual Reward",
      description: "Number of individual reward challenges won after the merge",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaTrophy className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "sitOuts",
      label: "Sit Outs",
      description: "Number of times the player sat out of a challenge",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaChair className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "votesForBootee",
      label: "Correct Votes",
      description:
        "Number of times the player voted for the person who was eliminated",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaCheck className="mr-2 text-green-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "wrongSideOfTheVote",
      label: "Wrong Votes",
      description:
        "Number of times the player voted for someone who was not eliminated",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaTimes className="mr-2 text-red-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "totalVotesCast",
      label: "Total Votes",
      description: "Total number of votes cast by the player at tribal council",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaVoteYea className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "tribalCouncilAppearances",
      label: "Tribal Councils",
      description: "Number of tribal councils attended",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <FaUsers className="mr-2 text-orange-400" />
          <span>{value}</span>
        </div>
      ),
    },
  ];

  // Sort the players based on the current sort configuration
  const sortedPlayers = useMemo(() => {
    let sortablePlayers = [...alltimeSurvivorPlayers] as Player[];

    // Filter players based on search term
    if (searchTerm) {
      sortablePlayers = sortablePlayers.filter(
        (player) =>
          player.contestant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.hometown.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.season.toString().includes(searchTerm)
      );
    }

    // Sort players
    if (sortConfig !== null) {
      sortablePlayers.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortablePlayers;
  }, [alltimeSurvivorPlayers, sortConfig, searchTerm]);

  // Get current players for pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = sortedPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );
  const totalPages = Math.ceil(sortedPlayers.length / playersPerPage);

  // Handle sorting
  const requestSort = (key: keyof Player) => {
    let direction: "ascending" | "descending" = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Get the sort icon for a column
  const getSortIcon = (key: keyof Player) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaSort className="ml-1 text-gray-400" />;
    }

    return sortConfig.direction === "ascending" ? (
      <FaSortUp className="ml-1 text-orange-400" />
    ) : (
      <FaSortDown className="ml-1 text-orange-400" />
    );
  };

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Survivor <span className="text-orange-400">Players</span>
      </h1>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-orange-400 focus:border-orange-400"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="text-sm text-gray-400">
          Showing {indexOfFirstPlayer + 1}-
          {Math.min(indexOfLastPlayer, sortedPlayers.length)} of{" "}
          {sortedPlayers.length} players
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-xl">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-800 text-gray-400 border-b border-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  scope="col"
                  className="px-6 py-3 cursor-pointer hover:bg-gray-700"
                  onClick={() => column.sortable && requestSort(column.key)}
                >
                  <Tooltip content={column.description}>
                    <div className="flex items-center">
                      {column.label}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </Tooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((player) => (
              <>
                <tr
                  key={player.id}
                  className={`border-b border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer ${
                    expandedRow === player.id ? "bg-gray-800" : ""
                  }`}
                  onClick={() =>
                    setExpandedRow(expandedRow === player.id ? null : player.id)
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={`${player.id}-${column.key.toString()}`}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {column.render
                        ? column.render(player[column.key], player)
                        : player[column.key]?.toString() || "-"}
                    </td>
                  ))}
                </tr>
                {expandedRow === player.id && (
                  <tr>
                    <td colSpan={columns.length}>
                      <ExpandedPlayerStats player={player} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav
            className="inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === pageNum
                      ? "bg-gray-700 border-orange-400 text-orange-400"
                      : "border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700"
                  } text-sm font-medium`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
