import { Box, Container, Flex, Text } from "@radix-ui/themes";
import Target from "../Target";
import { AimTrainerGameProps } from "./AimTrainerGame.types";

const AimTrainerGame: React.FC<AimTrainerGameProps> = ({
  timeLeft,
  targetsHit,
  score,
  gameAreaRef,
  targetPosition,
  handleTargetClick,
}) => {
  return (
    <Flex
      direction={"column"}
      height={"100vh"}
      align={"center"}
      justify={"center"}
      width={"100%"}
    >
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
  );
};

export default AimTrainerGame;
