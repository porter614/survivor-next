import React, { useState, useMemo } from "react";
import { alltimeSurvivorPlayers } from "@components/Players/playerData";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaTrophy,
  FaCalendarAlt,
} from "react-icons/fa";

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
  sortable: boolean;
  render?: (value: any, player: Player) => React.ReactNode;
};

const PlayersPage = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player;
    direction: "ascending" | "descending";
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 20;

  // Define the columns for the table
  const columns: Column[] = [
    {
      key: "contestant",
      label: "Player",
      sortable: true,
      render: (value, player) => (
        <div className="flex items-center space-x-3">
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
        </div>
      ),
    },
    {
      key: "season",
      label: "Season",
      sortable: true,
      render: (value) => <div className="badge badge-outline">{value}</div>,
    },
    {
      key: "daysPlayed",
      label: "Days Played",
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
      sortable: true,
    },
    {
      key: "juryVotesReceived",
      label: "Jury Votes",
      sortable: true,
      render: (value) => (
        <span className={value > 0 ? "font-bold text-orange-400" : ""}>
          {value}
        </span>
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
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((player) => (
              <tr
                key={player.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
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
