import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Matches from './pages/Matches';
import PlayerDetail from './pages/PlayerDetail';
import Analytics from './pages/Analytics';
import ImportExport from './pages/ImportExport';
import { FilterState } from './types';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    startDate: null,
    endDate: null,
    ground: '',
    team: '',
  });

  // Check if the user prefers dark mode
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="players" element={<Players />} />
            <Route path="players/:id" element={<PlayerDetail />} />
            <Route path="matches" element={<Matches />} />
            <Route path="analytics" element={<Analytics filters={filters} setFilters={setFilters} />} />
            <Route path="import-export" element={<ImportExport />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;