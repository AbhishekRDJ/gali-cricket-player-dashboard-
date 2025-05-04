import { format } from 'date-fns';
import { Match } from '../types';
import Card from './Card';

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

const MatchCard = ({ match, onClick }: MatchCardProps) => {
  // Calculate team scores
  const teamAScore = match.teamA.reduce((sum, p) => sum + p.runs, 0);
  const teamBScore = match.teamB.reduce((sum, p) => sum + p.runs, 0);
  
  // Determine winner
  const winner = teamAScore > teamBScore ? match.teamAName : teamBScore > teamAScore ? match.teamBName : 'Draw';
  
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={onClick}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(match.date), 'dd MMM yyyy')}
        </span>
        <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
          {match.ground}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-center flex-1">
          <div className="font-semibold text-gray-800 dark:text-white mb-1">{match.teamAName}</div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{teamAScore}</div>
        </div>
        
        <div className="text-xl font-bold text-gray-400 dark:text-gray-500 px-4">vs</div>
        
        <div className="text-center flex-1">
          <div className="font-semibold text-gray-800 dark:text-white mb-1">{match.teamBName}</div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{teamBScore}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500 dark:text-gray-400">
          <span className="font-medium">Toss:</span> {match.tossWinner}
        </div>
        
        <div className="font-medium">
          <span className={`${winner === 'Draw' ? 'text-accent-500' : 'text-secondary-600 dark:text-secondary-400'}`}>
            {winner === 'Draw' ? 'Match Drawn' : `${winner} won`}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;