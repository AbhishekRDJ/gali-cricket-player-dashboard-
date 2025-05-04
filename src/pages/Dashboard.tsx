import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tally1 as Ball, Users, Award, Calendar, Activity } from 'lucide-react';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import PlayerCard from '../components/PlayerCard';
import MatchCard from '../components/MatchCard';
import { Player, Match, PlayerStats } from '../types';
import { getMockPlayers, getMockMatches, getMockStats } from '../utils/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [topBatsmen, setTopBatsmen] = useState<PlayerStats[]>([]);
  const [topBowlers, setTopBowlers] = useState<PlayerStats[]>([]);
  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalMatches: 0,
    avgRuns: 0,
    avgWickets: 0,
  });

  useEffect(() => {
    // In a real app, we would fetch this data from the API
    const matches = getMockMatches().slice(0, 3);
    const players = getMockPlayers();
    const playerStats = getMockStats();
    
    setRecentMatches(matches);
    setTopBatsmen(playerStats.sort((a, b) => b.totalRuns - a.totalRuns).slice(0, 3));
    setTopBowlers(playerStats.sort((a, b) => b.totalWickets - a.totalWickets).slice(0, 3));
    
    setStats({
      totalPlayers: players.length,
      totalMatches: matches.length,
      avgRuns: Math.round(playerStats.reduce((sum, p) => sum + p.avgRuns, 0) / playerStats.length),
      avgWickets: Math.round(playerStats.reduce((sum, p) => sum + p.totalWickets, 0) / playerStats.length),
    });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to Local Cricket Analytics
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Players"
          value={stats.totalPlayers}
          icon={<Users size={24} />}
        />
        <StatCard
          title="Total Matches"
          value={stats.totalMatches}
          icon={<Calendar size={24} />}
        />
        <StatCard
          title="Avg. Runs per Player"
          value={stats.avgRuns}
          icon={<Ball size={24} />}
        />
        <StatCard
          title="Avg. Wickets per Player"
          value={stats.avgWickets}
          icon={<Award size={24} />}
        />
      </div>
      
      {/* Top Performers */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Top Performers</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>
            View All Analytics
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Batsmen */}
          <Card title="Orange Cap (Most Runs)">
            <div className="space-y-4">
              {topBatsmen.map((player) => (
                <div key={player._id} className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
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
                  <div className="text-xl font-bold text-secondary-600 dark:text-secondary-400">
                    {player.totalRuns}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Top Bowlers */}
          <Card title="Purple Cap (Most Wickets)">
            <div className="space-y-4">
              {topBowlers.map((player) => (
                <div key={player._id} className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
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
      </div>
      
      {/* Recent Matches */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Matches</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/matches')}>
            View All Matches
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentMatches.map((match) => (
            <MatchCard
              key={match._id}
              match={match}
              onClick={() => navigate(`/matches?id=${match._id}`)}
            />
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => navigate('/players/new')} fullWidth>
            Add New Player
          </Button>
          <Button onClick={() => navigate('/matches/new')} fullWidth>
            Record New Match
          </Button>
          <Button onClick={() => navigate('/import-export')} fullWidth variant="outline">
            Import/Export Data
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;