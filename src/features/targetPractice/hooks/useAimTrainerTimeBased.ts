import { useRef, useState, useEffect } from "react";

type ScoreDetail = { ms: number; points: number };

export const useAimTrainerTimeBased = (gameDurationMs = 15000) => {
  const GAME_DURATION = gameDurationMs; // default 15s

  const [gameState, setGameState] = useState<"start" | "playing" | "results">(
    "start"
  );
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  const [score, setScore] = useState(0);
  const [targetsHit, setTargetsHit] = useState(0);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [clickTimes, setClickTimes] = useState<number[]>([]);

  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const lastClickTimeRef = useRef<number | null>(null);

  const [scoreDetails, setScoreDetails] = useState<ScoreDetail[]>([]);
  const [timeBuckets, setTimeBuckets] = useState({
    fast: 0,
    good: 0,
    average: 0,
    slow: 0,
    late: 0,
  });

  const categorizeClick = (ms: number) => {
    if (ms <= 200) return "fast";
    if (ms <= 350) return "good";
    if (ms <= 500) return "average";
    if (ms <= 800) return "slow";
    return "late";
  };

  const getRandomPosition = () => {
    if (!gameAreaRef.current) return { x: 0, y: 0 };

    const rect = gameAreaRef.current.getBoundingClientRect();
    const targetSize = 80;
    const padding = 20;

    const maxX = Math.max(0, rect.width - targetSize - padding * 2);
    const maxY = Math.max(0, rect.height - targetSize - padding * 2 - 100);

    return {
      x: Math.random() * maxX + padding,
      y: Math.random() * maxY + padding + 100,
    };
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTargetsHit(0);
    setClickTimes([]);
    setScoreDetails([]);
    setTimeBuckets({ fast: 0, good: 0, average: 0, slow: 0, late: 0 });

    const now = Date.now();
    setStartTime(now);
    lastClickTimeRef.current = now;
    setTimeLeft(GAME_DURATION);

    // ensure we have a valid rect for positioning
    requestAnimationFrame(() => setTargetPosition(getRandomPosition()));
  };

  // TIMER LOOP
  useEffect(() => {
    if (gameState !== "playing") return;

    const tick = () => {
      if (!startTime) return;
      const elapsed = Date.now() - startTime;
      const remaining = GAME_DURATION - elapsed;
      setTimeLeft(Math.max(0, remaining));
      if (remaining <= 0) {
        setGameState("results");
      }
    };

    // use interval for smooth countdown; 50ms is a good balance
    const interval = setInterval(tick, 50);
    tick();

    return () => clearInterval(interval);
  }, [gameState, startTime, GAME_DURATION]);

  const handleTargetClick = (e?: MouseEvent | any) => {
    if (gameState !== "playing") return;
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    const now = Date.now();
    const timeSinceLastClick = now - (lastClickTimeRef.current ?? now);
    lastClickTimeRef.current = now;

    // Store time
    setClickTimes((prev) => [...prev, timeSinceLastClick]);

    // Categorize
    const bucket = categorizeClick(timeSinceLastClick);
    setTimeBuckets((prev) => ({
      ...prev,
      [bucket]: prev[bucket] + 1,
    }));

    // Points formula (same as before)
    const points = Math.max(0, 1000 - timeSinceLastClick);
    setScoreDetails((prev) => [...prev, { ms: timeSinceLastClick, points }]);
    setScore((prev) => prev + points);

    setTargetsHit((prev) => prev + 1);

    // Immediately spawn next target
    setTargetPosition(getRandomPosition());
  };

  const calculateStats = () => {
    const totalSeconds = GAME_DURATION / 1000;

    const avgTime =
      clickTimes.length > 0
        ? clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length / 1000
        : 0;

    const hitsPerSecond = totalSeconds > 0 ? targetsHit / totalSeconds : 0;

    return {
      totalTime: (GAME_DURATION / 1000).toFixed(2),
      avgTime: avgTime.toFixed(3),
      targetsPerSecond: hitsPerSecond.toFixed(2),
      targetsHit,
    };
  };

  return {
    // state + helpers
    calculateStats,
    handleTargetClick,
    startGame,
    setGameState,
    score,
    gameState,
    targetPosition,
    targetsHit,
    gameAreaRef,
    timeLeft,
    scoreDetails,
    timeBuckets,
  };
};
