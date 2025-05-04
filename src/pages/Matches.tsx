import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Search, Calendar, Filter } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../components/Button';
import Card from '../components/Card';
import MatchCard from '../components/MatchCard';
import { Match } from '../types';
import { getMockMatches } from '../utils/mockData';

const Matches = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [groundFilter, setGroundFilter] = useState('');
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  useEffect(() => {
    // In a real app, we would fetch this data from the API
    const fetchedMatches = getMockMatches();
    setMatches(fetchedMatches);
    setFilteredMatches(fetchedMatches);
    
    // Check if there's a match ID in the URL
    const searchParams = new URLSearchParams(location.search);
    const matchId = searchParams.get('id');
    
    if (matchId) {
      const match = fetchedMatches.find((m) => m._id === matchId) || null;
      setSelectedMatch(match);
    }
  }, [location]);

  useEffect(() => {
    let result = matches;
    
    if (searchQuery) {
      result = result.filter(
        (match) =>
          match.teamAName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.teamBName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.ground.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (groundFilter) {
      result = result.filter((match) => match.ground === groundFilter);
    }
    
    setFilteredMatches(result);
  }, [searchQuery, groundFilter, matches]);

  const grounds = Array.from(new Set(matches.map((match) => match.ground)));

  const handleCloseMatchDetails = () => {
    setSelectedMatch(null);
    navigate('/matches', { replace: true });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Matches</h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage all cricket matches
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate('/matches/new')}>
            <Plus size={18} className="mr-1" />
            New Match
          </Button>
        </div>
      </div>
      
      {selectedMatch ? (
        <MatchDetail match={selectedMatch} onClose={handleCloseMatchDetails} />
      ) : (
        <>
          {/* Filters and Search */}
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search matches..."
                  className="pl-10 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="md:w-64">
                <select
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={groundFilter}
                  onChange={(e) => setGroundFilter(e.target.value)}
                >
                  <option value="">All Grounds</option>
                  {grounds.map((ground) => (
                    <option key={ground} value={ground}>
                      {ground}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
          
          {/* Matches Grid */}
          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match._id}
                  match={match}
                  onClick={() => {
                    setSelectedMatch(match);
                    navigate(`/matches?id=${match._id}`);
                  }}
                />
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  No matches found matching your criteria
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setGroundFilter(''); }}>
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

interface MatchDetailProps {
  match: Match;
  onClose: () => void;
}

const MatchDetail = ({ match, onClose }: MatchDetailProps) => {
  // Calculate team scores
  const teamAScore = match.teamA.reduce((sum, p) => sum + p.runs, 0);
  const teamBScore = match.teamB.reduce((sum, p) => sum + p.runs, 0);
  
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button variant="outline" size="sm" onClick={onClose} className="mr-4">
          <Calendar size={16} className="mr-1" />
          All Matches
        </Button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Match Details
        </h2>
      </div>
      
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</h3>
            <p className="font-medium text-gray-800 dark:text-white">
              {format(new Date(match.date), 'dd MMMM yyyy')}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ground</h3>
            <p className="font-medium text-gray-800 dark:text-white">{match.ground}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Toss Winner</h3>
            <p className="font-medium text-gray-800 dark:text-white">{match.tossWinner}</p>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-700 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team A */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {match.teamAName}
                </h3>
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {teamAScore}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Runs
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Balls
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Wickets
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {match.teamA.map((performance) => (
                      <tr key={performance.playerId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                          {performance.playerName}
                        </td>
                        <td className="px-3 py-2 text-sm font-medium text-secondary-600 dark:text-secondary-400">
                          {performance.runs}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                          {performance.balls}
                        </td>
                        <td className="px-3 py-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                          {performance.wickets}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Team B */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {match.teamBName}
                </h3>
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {teamBScore}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Runs
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Balls
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Wickets
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {match.teamB.map((performance) => (
                      <tr key={performance.playerId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                          {performance.playerName}
                        </td>
                        <td className="px-3 py-2 text-sm font-medium text-secondary-600 dark:text-secondary-400">
                          {performance.runs}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                          {performance.balls}
                        </td>
                        <td className="px-3 py-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                          {performance.wickets}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              // In a real app, we would navigate to the edit page
              alert('Edit functionality would go here');
            }}
          >
            Edit Match
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Matches;