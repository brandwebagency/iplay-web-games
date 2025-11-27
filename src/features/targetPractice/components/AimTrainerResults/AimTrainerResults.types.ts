export type AimTrainerResultsProps = {
  startGame: () => void;
  calculateStats: () => {
    totalTime: string;
    avgTime: string;
    targetsPerSecond: string;
    targetsHit: number;
  };
  setGameState: (s: "start" | "playing" | "results") => void;
  scoreDetails: { ms: number; points: number }[];
  timeBuckets: {
    fast: number;
    good: number;
    average: number;
    slow: number;
    late: number;
  };
  score: number;
  timeLeft?: number;
  targetsHit: number;
};
