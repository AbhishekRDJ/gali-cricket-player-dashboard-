import { useState } from 'react';
import Button from './Button';
import { format } from 'date-fns';
import { FilterState } from '../types';
import { Filter } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  grounds: string[];
  teams: string[];
}

const Filters = ({ filters, setFilters, grounds, teams }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setFilters({
      ...filters,
      [field]: value ? new Date(value) : null,
    });
  };

  const handleClear = () => {
    setFilters({
      startDate: null,
      endDate: null,
      ground: '',
      team: '',
    });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          <Filter size={16} className="mr-1" />
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.startDate ? format(filters.startDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Ground
            </label>
            <select
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.ground}
              onChange={(e) => setFilters({ ...filters, ground: e.target.value })}
            >
              <option value="">All Grounds</option>
              {grounds.map((ground) => (
                <option key={ground} value={ground}>
                  {ground}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Team
            </label>
            <select
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.team}
              onChange={(e) => setFilters({ ...filters, team: e.target.value })}
            >
              <option value="">All Teams</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={handleClear} className="mr-2">
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;