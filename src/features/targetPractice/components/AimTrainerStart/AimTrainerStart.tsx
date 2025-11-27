import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

const AimTrainerStart: React.FC<{ gameState: any; startGame: any }> = ({
  gameState,
  startGame,
}) => {
  return (
    <>
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
              How many targets can you hit?
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
    </>
  );
};

export default AimTrainerStart;
