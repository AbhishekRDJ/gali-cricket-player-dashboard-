import { Player, Match, PlayerStats } from '../types';

// Mock player data
export const getMockPlayers = (): Player[] => {
  return [
    {
      _id: '1',
      name: 'Virat Sharma',
      photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      role: 'Batsman',
      battingStyle: 'Right Handed',
      bowlingStyle: 'Right Arm Medium',
      joinedOn: new Date('2022-01-15'),
    },
    {
      _id: '2',
      name: 'Rohit Patel',
      photoUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      role: 'All-rounder',
      battingStyle: 'Right Handed',
      bowlingStyle: 'Right Arm Off-spin',
      joinedOn: new Date('2022-02-20'),
    },
    {
      _id: '3',
      name: 'Jasprit Kumar',
      photoUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      role: 'Bowler',
      battingStyle: 'Right Handed',
      bowlingStyle: 'Right Arm Fast',
      joinedOn: new Date('2022-01-10'),
    },
    {
      _id: '4',
      name: 'Ravindra Singh',
      photoUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      role: 'All-rounder',
      battingStyle: 'Left Handed',
      bowlingStyle: 'Left Arm Orthodox',
      joinedOn: new Date('2022-03-05'),
    },
    {
      _id: '5',
      name: 'Suresh Gupta',
      photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      role: 'Batsman',
      battingStyle: 'Right Handed',
      bowlingStyle: '',
      joinedOn: new Date('2022-02-12'),
    },
  ];
};

// Mock match data
export const getMockMatches = (): Match[] => {
  return [
    {
      _id: '1',
      date: new Date('2023-11-05'),
      ground: 'Colony Ground',
      teamAName: 'Strikers',
      teamBName: 'Royals',
      teamA: [
        { playerId: '1', playerName: 'Virat Sharma', runs: 45, balls: 30, wickets: 0 },
        { playerId: '2', playerName: 'Rohit Patel', runs: 32, balls: 25, wickets: 1 },
      ],
      teamB: [
        { playerId: '3', playerName: 'Jasprit Kumar', runs: 10, balls: 15, wickets: 3 },
        { playerId: '4', playerName: 'Ravindra Singh', runs: 56, balls: 40, wickets: 1 },
      ],
      tossWinner: 'Strikers',
    },
    {
      _id: '2',
      date: new Date('2023-11-12'),
      ground: 'City Park',
      teamAName: 'Titans',
      teamBName: 'Strikers',
      teamA: [
        { playerId: '5', playerName: 'Suresh Gupta', runs: 78, balls: 50, wickets: 0 },
        { playerId: '4', playerName: 'Ravindra Singh', runs: 23, balls: 18, wickets: 2 },
      ],
      teamB: [
        { playerId: '1', playerName: 'Virat Sharma', runs: 67, balls: 45, wickets: 0 },
        { playerId: '2', playerName: 'Rohit Patel', runs: 45, balls: 30, wickets: 1 },
      ],
      tossWinner: 'Titans',
    },
    {
      _id: '3',
      date: new Date('2023-11-19'),
      ground: 'Colony Ground',
      teamAName: 'Royals',
      teamBName: 'Titans',
      teamA: [
        { playerId: '3', playerName: 'Jasprit Kumar', runs: 12, balls: 10, wickets: 4 },
        { playerId: '4', playerName: 'Ravindra Singh', runs: 34, balls: 28, wickets: 1 },
      ],
      teamB: [
        { playerId: '5', playerName: 'Suresh Gupta', runs: 56, balls: 40, wickets: 0 },
        { playerId: '1', playerName: 'Virat Sharma', runs: 23, balls: 18, wickets: 0 },
      ],
      tossWinner: 'Royals',
    },
  ];
};

// Mock player stats
export const getMockStats = (): PlayerStats[] => {
  return [
    {
      _id: '1',
      name: 'Virat Sharma',
      photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      totalRuns: 135,
      totalWickets: 0,
      matchesPlayed: 3,
      avgRuns: 45,
      strikeRate: 144.23,
    },
    {
      _id: '2',
      name: 'Rohit Patel',
      photoUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      totalRuns: 77,
      totalWickets: 2,
      matchesPlayed: 2,
      avgRuns: 38.5,
      strikeRate: 140.0,
    },
    {
      _id: '3',
      name: 'Jasprit Kumar',
      photoUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      totalRuns: 22,
      totalWickets: 7,
      matchesPlayed: 2,
      avgRuns: 11,
      strikeRate: 88.0,
    },
    {
      _id: '4',
      name: 'Ravindra Singh',
      photoUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      totalRuns: 113,
      totalWickets: 4,
      matchesPlayed: 3,
      avgRuns: 37.67,
      strikeRate: 131.4,
    },
    {
      _id: '5',
      name: 'Suresh Gupta',
      photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      totalRuns: 134,
      totalWickets: 0,
      matchesPlayed: 2,
      avgRuns: 67,
      strikeRate: 148.89,
    },
  ];
};

// Get chart data for a player
export const getPlayerChartData = (playerId: string) => {
  // In a real app, we would calculate this from the match data
  // Here we'll just return some mock data
  const runData = [
    { date: '2023-05-12', value: 45 },
    { date: '2023-06-18', value: 23 },
    { date: '2023-07-02', value: 67 },
    { date: '2023-08-15', value: 12 },
    { date: '2023-09-10', value: 56 },
    { date: '2023-10-22', value: 34 },
    { date: '2023-11-05', value: 78 },
  ];

  const wicketData = [
    { date: '2023-05-12', value: 0 },
    { date: '2023-06-18', value: 2 },
    { date: '2023-07-02', value: 0 },
    { date: '2023-08-15', value: 3 },
    { date: '2023-09-10', value: 1 },
    { date: '2023-10-22', value: 1 },
    { date: '2023-11-05', value: 0 },
  ];

  return {
    runData,
    wicketData,
    cumulativeRuns: runData.reduce(
      (acc, item, index) => [
        ...acc,
        {
          date: item.date,
          value: item.value + (index > 0 ? acc[index - 1].value : 0),
        },
      ],
      [] as { date: string; value: number }[]
    ),
  };
};