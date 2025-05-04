import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
  description?: string;
}

const StatCard = ({ title, value, change, icon, description }: StatCardProps) => {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          
          {change !== undefined && (
            <div className="mt-1 flex items-center">
              {change > 0 ? (
                <TrendingUp size={16} className="text-green-500 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              )}
              <span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(change)}% {change > 0 ? 'increase' : 'decrease'}
              </span>
            </div>
          )}
          
          {description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        
        {icon && (
          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;