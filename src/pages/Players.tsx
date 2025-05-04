import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import PlayerCard from '../components/PlayerCard';
import { Player } from '../types';
import { getMockPlayers } from '../utils/mockData';

const Players = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // In a real app, we would fetch this data from the API
    const fetchedPlayers = getMockPlayers();
    setPlayers(fetchedPlayers);
    setFilteredPlayers(fetchedPlayers);
  }, []);

  useEffect(() => {
    let result = players;
    
    if (searchQuery) {
      result = result.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (roleFilter) {
      result = result.filter((player) => player.role === roleFilter);
    }
    
    setFilteredPlayers(result);
  }, [searchQuery, roleFilter, players]);

  const roles = ['Batsman', 'Bowler', 'All-rounder', 'Wicket Keeper'];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Players</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage all your cricket players
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate('/players/new')}>
            <Plus size={18} className="mr-1" />
            Add New Player
          </Button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search players..."
              className="pl-10 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="md:w-64">
            <select
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              No players found matching your criteria
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setRoleFilter(''); }}>
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Players;