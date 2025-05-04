import { Link } from 'react-router-dom';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  stat?: {
    label: string;
    value: number | string;
  };
}

const PlayerCard = ({ player, stat }: PlayerCardProps) => {
  return (
    <Link 
      to={`/players/${player._id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
    >
      <div className="aspect-w-1 aspect-h-1 relative w-full pt-[100%]">
        <img
          src={player.photoUrl || `https://via.placeholder.com/300?text=${player.name.charAt(0)}`}
          alt={player.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/300?text=${player.name.charAt(0)}`;
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {player.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {player.role}
        </p>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {player.battingStyle}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {player.bowlingStyle || '-'}
          </div>
        </div>
        
        {stat && (
          <div className="mt-3 pt-3 border-t dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              <span className="text-lg font-medium text-primary-600 dark:text-primary-400">
                {stat.value}
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PlayerCard;