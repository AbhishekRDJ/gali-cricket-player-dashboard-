import { useState, useEffect } from 'react';
import { FileDown, BarChart2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Card from '../components/Card';
import Button from '../components/Button';
import Filters from '../components/Filters';
import PlayerCard from '../components/PlayerCard';
import { FilterState, PlayerStats } from '../types';
import { getMockStats, getMockMatches } from '../utils/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const Analytics = ({ filters, setFilters }: AnalyticsProps) => {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [orangeCap, setOrangeCap] = useState<PlayerStats[]>([]);
  const [purpleCap, setPurpleCap] = useState<PlayerStats[]>([]);
  const [strikeRateData, setStrikeRateData] = useState<any>(null);
  const [averageData, setAverageData] = useState<any>(null);
  const [grounds, setGrounds] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch this data from the API based on filters
    const stats = getMockStats();
    const matches = getMockMatches();
    
    // Extract grounds and teams for filters
    const uniqueGrounds = Array.from(new Set(matches.map((match) => match.ground)));
    const uniqueTeams = Array.from(
      new Set([...matches.map((match) => match.teamAName), ...matches.map((match) => match.teamBName)])
    );
    
    setGrounds(uniqueGrounds);
    setTeams(uniqueTeams);
    
    // Apply filters (in a real app, this would be done server-side)
    let filteredStats = stats;
    
    // Filter logic would go here based on filter state
    // For demo purposes, we're just using all the data
    
    setPlayerStats(filteredStats);
    
    // Set Orange Cap (top run scorers)
    setOrangeCap(
      [...filteredStats].sort((a, b) => b.totalRuns - a.totalRuns).slice(0, 5)
    );
    
    // Set Purple Cap (top wicket takers)
    setPurpleCap(
      [...filteredStats].sort((a, b) => b.totalWickets - a.totalWickets).slice(0, 5)
    );
    
    // Strike rate histogram data
    const strikeRates = [
      { range: '<100', count: 0 },
      { range: '100-125', count: 0 },
      { range: '125-150', count: 0 },
      { range: '150-175', count: 0 },
      { range: '>175', count: 0 },
    ];
    
    filteredStats.forEach((player) => {
      if (player.strikeRate < 100) strikeRates[0].count++;
      else if (player.strikeRate < 125) strikeRates[1].count++;
      else if (player.strikeRate < 150) strikeRates[2].count++;
      else if (player.strikeRate < 175) strikeRates[3].count++;
      else strikeRates[4].count++;
    });
    
    setStrikeRateData({
      labels: strikeRates.map((item) => item.range),
      datasets: [
        {
          label: 'Number of Players',
          data: strikeRates.map((item) => item.count),
          backgroundColor: '#059669',
        },
      ],
    });
    
    // Average runs data (for a line chart)
    const avgRunsData = filteredStats
      .sort((a, b) => b.avgRuns - a.avgRuns)
      .slice(0, 10);
    
    setAverageData({
      labels: avgRunsData.map((player) => player.name),
      datasets: [
        {
          label: 'Average Runs',
          data: avgRunsData.map((player) => player.avgRuns),
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.5)',
        },
      ],
    });
  }, [filters]);

  const handleExportCSV = () => {
    // In a real app, we would implement CSV export functionality
    alert('CSV export functionality would go here');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Visualize and analyze cricket performance data
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button onClick={handleExportCSV} variant="outline">
            <FileDown size={18} className="mr-1" />
            Export CSV
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        grounds={grounds}
        teams={teams}
      />
      
      {/* Orange Cap & Purple Cap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Orange Cap */}
        <Card title="Orange Cap (Top Run Scorers)">
          <div className="space-y-4">
            {orangeCap.map((player, index) => (
              <div key={player._id} className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 mr-3">
                  {index + 1}
                </div>
                <img
                  src={player.photoUrl || `https://via.placeholder.com/40?text=${player.name.charAt(0)}`}
                  alt={player.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/40?text=${player.name.charAt(0)}`;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">{player.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SR: {player.strikeRate.toFixed(2)}
                  </p>
                </div>
                <div className="text-xl font-bold text-secondary-600 dark:text-secondary-400">
                  {player.totalRuns}
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Purple Cap */}
        <Card title="Purple Cap (Top Wicket Takers)">
          <div className="space-y-4">
            {purpleCap.map((player, index) => (
              <div key={player._id} className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 mr-3">
                  {index + 1}
                </div>
                <img
                  src={player.photoUrl || `https://via.placeholder.com/40?text=${player.name.charAt(0)}`}
                  alt={player.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/40?text=${player.name.charAt(0)}`;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">{player.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {player.matchesPlayed} matches
                  </p>
                </div>
                <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {player.totalWickets}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Strike Rate Distribution */}
        <Card title="Strike Rate Distribution">
          {strikeRateData && (
            <div className="h-64">
              <Bar
                data={strikeRateData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(107, 114, 128, 0.1)',
                      },
                      title: {
                        display: true,
                        text: 'Number of Players',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: 'Strike Rate Range',
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    },
                  },
                }}
              />
            </div>
          )}
        </Card>
        
        {/* Average Runs Comparison */}
        <Card title="Top 10 Players by Average Runs">
          {averageData && (
            <div className="h-64">
              <Line
                data={averageData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(107, 114, 128, 0.1)',
                      },
                      title: {
                        display: true,
                        text: 'Average Runs',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    },
                  },
                }}
              />
            </div>
          )}
        </Card>
      </div>
      
      {/* Player Ranking Table */}
      <Card title="Player Performance Ranking">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Matches
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Runs
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Wickets
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Avg. Runs
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Strike Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {playerStats
                .sort((a, b) => b.totalRuns - a.totalRuns)
                .map((player, index) => (
                  <tr
                    key={player._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img
                          src={player.photoUrl || `https://via.placeholder.com/32?text=${player.name.charAt(0)}`}
                          alt={player.name}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/32?text=${player.name.charAt(0)}`;
                          }}
                        />
                        <div className="text-sm font-medium text-gray-800 dark:text-white">
                          {player.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                      {player.matchesPlayed}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-secondary-600 dark:text-secondary-400">
                      {player.totalRuns}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-primary-600 dark:text-primary-400">
                      {player.totalWickets}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                      {player.avgRuns.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                      {player.strikeRate.toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;