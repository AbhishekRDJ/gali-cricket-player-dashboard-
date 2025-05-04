import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, User, Calendar, Activity } from 'lucide-react';
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
import { Line, Bar } from 'react-chartjs-2';
import Card from '../components/Card';
import Button from '../components/Button';
import { Player, Match } from '../types';
import { getMockPlayers, getMockMatches, getPlayerChartData } from '../utils/mockData';
import { format } from 'date-fns';

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

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRuns: 0,
    totalWickets: 0,
    matchesPlayed: 0,
    avgRuns: 0,
    strikeRate: 0,
  });

  useEffect(() => {
    // In a real app, we would fetch this data from the API
    const fetchData = () => {
      setIsLoading(true);
      
      if (id === 'new') {
        setPlayer(null);
        setIsLoading(false);
        return;
      }
      
      const foundPlayer = getMockPlayers().find((p) => p._id === id) || null;
      setPlayer(foundPlayer);
      
      if (foundPlayer) {
        const allMatches = getMockMatches();
        const playerMatches = allMatches.filter(
          (match) =>
            match.teamA.some((p) => p.playerId === id) ||
            match.teamB.some((p) => p.playerId === id)
        );
        
        setMatches(playerMatches);
        
        // Calculate stats
        let totalRuns = 0;
        let totalBalls = 0;
        let totalWickets = 0;
        
        playerMatches.forEach((match) => {
          const inTeamA = match.teamA.find((p) => p.playerId === id);
          const inTeamB = match.teamB.find((p) => p.playerId === id);
          
          if (inTeamA) {
            totalRuns += inTeamA.runs;
            totalBalls += inTeamA.balls;
            totalWickets += inTeamA.wickets;
          } else if (inTeamB) {
            totalRuns += inTeamB.runs;
            totalBalls += inTeamB.balls;
            totalWickets += inTeamB.wickets;
          }
        });
        
        setStats({
          totalRuns,
          totalWickets,
          matchesPlayed: playerMatches.length,
          avgRuns: playerMatches.length > 0 ? totalRuns / playerMatches.length : 0,
          strikeRate: totalBalls > 0 ? (totalRuns / totalBalls) * 100 : 0,
        });
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!player && id !== 'new') {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Player not found
          </p>
          <Button variant="outline" onClick={() => navigate('/players')}>
            Back to Players
          </Button>
        </div>
      </Card>
    );
  }

  // For new player form or editing existing player
  if (id === 'new' || !player) {
    return (
      <div>
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" onClick={() => navigate('/players')} className="mr-4">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {id === 'new' ? 'Add New Player' : 'Edit Player'}
          </h1>
        </div>
        
        <Card>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Player Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Photo URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Role</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-rounder">All-rounder</option>
                <option value="Wicket Keeper">Wicket Keeper</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Batting Style
                </label>
                <select
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Batting Style</option>
                  <option value="Right Handed">Right Handed</option>
                  <option value="Left Handed">Left Handed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Bowling Style
                </label>
                <select
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Bowling Style</option>
                  <option value="Right Arm Fast">Right Arm Fast</option>
                  <option value="Right Arm Medium">Right Arm Medium</option>
                  <option value="Right Arm Off-spin">Right Arm Off-spin</option>
                  <option value="Right Arm Leg-spin">Right Arm Leg-spin</option>
                  <option value="Left Arm Fast">Left Arm Fast</option>
                  <option value="Left Arm Medium">Left Arm Medium</option>
                  <option value="Left Arm Orthodox">Left Arm Orthodox</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Joined On
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => navigate('/players')}>
                Cancel
              </Button>
              <Button type="submit">
                {id === 'new' ? 'Create Player' : 'Update Player'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // For viewing player details
  const { runData, wicketData, cumulativeRuns } = getPlayerChartData(player._id || '');

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button variant="outline" size="sm" onClick={() => navigate('/players')} className="mr-4">
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Player Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Player Profile */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center">
            <img
              src={player.photoUrl || `https://via.placeholder.com/150?text=${player.name.charAt(0)}`}
              alt={player.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/150?text=${player.name.charAt(0)}`;
              }}
            />
            
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
              {player.name}
            </h2>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {player.role}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/players/edit/${player._id}`)}
              className="mb-6"
            >
              <Edit size={16} className="mr-1" />
              Edit Profile
            </Button>
            
            <div className="w-full space-y-4">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mr-3">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Batting Style</div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {player.battingStyle}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mr-3">
                  <Activity size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Bowling Style</div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {player.bowlingStyle || 'Not specified'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mr-3">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Joined On</div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {format(new Date(player.joinedOn), 'dd MMM yyyy')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Player Stats Summary */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Career Statistics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Matches</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.matchesPlayed}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Runs</div>
              <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                {stats.totalRuns}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Wickets</div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {stats.totalWickets}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Strike Rate</div>
              <div className="text-2xl font-bold text-accent-500">
                {stats.strikeRate.toFixed(2)}
              </div>
            </div>
          </div>
          
          {/* Batting Performance Graph */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cumulative Runs
            </h4>
            <div className="h-64">
              <Line
                data={{
                  labels: cumulativeRuns.map((d) => d.date),
                  datasets: [
                    {
                      label: 'Cumulative Runs',
                      data: cumulativeRuns.map((d) => d.value),
                      borderColor: '#DC2626',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(107, 114, 128, 0.1)',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
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
          </div>
          
          {/* Bowling Performance Graph */}
          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
              Wickets Per Match
            </h4>
            <div className="h-64">
              <Bar
                data={{
                  labels: wicketData.map((d) => d.date),
                  datasets: [
                    {
                      label: 'Wickets',
                      data: wicketData.map((d) => d.value),
                      backgroundColor: '#059669',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(107, 114, 128, 0.1)',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
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
          </div>
        </Card>
      </div>
      
      {/* Recent Matches */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Matches</h3>
        
        {matches.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Runs
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Balls
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Wickets
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {matches.map((match) => {
                  const performance = match.teamA.find((p) => p.playerId === player._id) || 
                                     match.teamB.find((p) => p.playerId === player._id);
                  
                  return (
                    <tr key={match._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {format(new Date(match.date), 'dd MMM yyyy')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {match.teamAName} vs {match.teamBName}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-secondary-600 dark:text-secondary-400">
                        {performance?.runs || 0}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {performance?.balls || 0}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                        {performance?.wickets || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">No match records found for this player</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PlayerDetail;