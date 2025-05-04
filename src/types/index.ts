// Player type definition
export interface Player {
  _id?: string;
  name: string;
  photoUrl: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  joinedOn: Date;
}

// Performance in a match
export interface Performance {
  playerId: string;
  playerName?: string; // For UI display
  runs: number;
  balls: number;
  wickets: number;
}

// Match type definition
export interface Match {
  _id?: string;
  date: Date;
  ground: string;
  teamA: Performance[];
  teamB: Performance[];
  tossWinner: string;
  teamAName: string;
  teamBName: string;
}

// Stats for leaderboards
export interface PlayerStats {
  _id: string;
  name: string;
  photoUrl: string;
  totalRuns: number;
  totalWickets: number;
  matchesPlayed: number;
  avgRuns: number;
  strikeRate: number; // (runs / balls) * 100
}

// Date range filter
export interface DateRangeFilter {
  startDate: Date | null;
  endDate: Date | null;
}

// Filter state for analytics
export interface FilterState extends DateRangeFilter {
  ground: string;
  team: string;
}

// Chart data point
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}