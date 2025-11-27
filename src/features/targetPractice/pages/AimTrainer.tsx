import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useAimTrainerTimeBased } from "../hooks/useAimTrainerTimeBased";
import Target from "../components/Target";
import AimTrainerResults from "../components/AimTrainerResults/AimTrainerResults";

const AimTrainer: React.FC = () => {
  // default duration 15s; pass argument to change
  const {
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
  } = useAimTrainerTimeBased(15000);

  return (
    <Box style={{minHeight: "100vh"}}>
      <Container>
        {gameState === "start" && (
          <Flex
            direction="column"
            align="center"
            justify={"center"}
            gap="3"
            height={"100vh"}
          >
            <Heading as="h1" size="8" weight="bold">
              Aim trainer target practice
            </Heading>

            <Box>
              <Text as="p" align={"center"} mb={"0"} size={"5"}>
                You have 15 seconds,
              </Text>
              <Text as="p" align={"center"} size={"5"}>
                How targets Can you hit?
              </Text>
            </Box>
            
            <Button color="orange" size={"4"} onClick={startGame}>
              START TEST
            </Button>
            <Text size={"5"}>
              Time starts as soon as you press the start button
            </Text>
          </Flex>
        )}
      </Container>

      {gameState === "playing" && (
        <Flex direction={"column"} height={"100vh"} align={"center"} justify={"center"} width={"100%"}>
          <Box width={"100%"}>
            
          <Container>
            <Flex justify="between" mb="3" align="center">
              <Text size="4">Time: {(timeLeft / 1000).toFixed(2)}s</Text>
              <Text size="4">Score: {Math.round(score)}</Text>
              <Text size="4">Hits: {targetsHit}</Text>
            </Flex>
          </Container>

          <div
            ref={gameAreaRef as any}
            style={{
              position: "relative",
              width: "100%",
              height: "56vh",
              background: "white",
              borderRadius: 8,
              overflow: "hidden",
            }}
            onClick={() => {
              // clicking empty space should not spawn new target
            }}
          >
            <Target
              x={targetPosition.x}
              y={targetPosition.y}
              onClick={(e) => {
                e.stopPropagation();
                handleTargetClick(e);
              }}
            />
          </div>

          </Box>
        </Flex>
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
