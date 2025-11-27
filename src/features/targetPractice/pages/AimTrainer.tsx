import React from "react";
import { Box, Container } from "@radix-ui/themes";
import { useAimTrainerTimeBased } from "../hooks/useAimTrainerTimeBased";
import AimTrainerResults from "../components/AimTrainerResults/AimTrainerResults";
import AimTrainerStart from "../components/AimTrainerStart/AimTrainerStart";
import AimTrainerGame from "../components/AimTrainerGame/AimTrainerGame";

const AimTrainer: React.FC = () => {
  const {
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
  } = useAimTrainerTimeBased(15000); // 15 seconds time limit

  return (
    <Box style={{ minHeight: "100vh" }}>
      <Container>
        <AimTrainerStart gameState={gameState} startGame={startGame} />
      </Container>

      {gameState === "playing" && (
        <AimTrainerGame
          timeLeft={timeLeft}
          targetsHit={targetsHit}
          score={score}
          gameAreaRef={gameAreaRef}
          targetPosition={targetPosition}
          handleTargetClick={handleTargetClick}
        />
      )}

      <Container>
        {gameState === "results" && (
          <AimTrainerResults
            startGame={startGame}
            setGameState={setGameState}
            scoreDetails={scoreDetails}
            targetsHit={targetsHit}
          />
        )}
      </Container>
    </Box>
  );
};

export default AimTrainer;
