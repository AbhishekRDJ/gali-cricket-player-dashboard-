import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="top-0 z-10 sticky bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden mr-4 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-400"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-semibold text-gray-800 dark:text-white text-xl md:text-2xl">
            Local Cricket Analytics
          </h1>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-400"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;