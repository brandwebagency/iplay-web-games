import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";

const getRating = (ms: number) => {
  if (ms <= 200) return { label: "S+ (Insane)", color: "green" };
  if (ms <= 300) return { label: "S (Excellent)", color: "lime" };
  if (ms <= 400) return { label: "A (Great)", color: "cyan" };
  if (ms <= 550) return { label: "B (Good)", color: "yellow" };
  if (ms <= 800) return { label: "C (Slow)", color: "orange" };
  return { label: "F (Too Slow)", color: "red" };
};

const AimTrainerScoreBreakdown = ({
  scoreDetails,
  startGame,
  setGameState,
  targetsHit,
}) => {
  if (!scoreDetails.length) return null;

  return (
    <Box mt="6">
      <Flex justify={"between"} align={"center"}>
        <Box>
          <Heading as="h1" size="8" mb="4" align={"center"} weight="bold">
            Target practice finished!
          </Heading>
          <Text as="p" size={"7"} mb="4">
            <Text as="p" size={"7"} mb="4">
              {targetsHit} targets hit!
            </Text>
          </Text>

          <Text as="p" size={"7"} mb="4">
            Reaction time breakdown
          </Text>
        </Box>

        <Flex>
          <Button
            color="orange"
            size={"4"}
            className="secondary"
            onClick={() => setGameState("start")}
          >
            BACK TO START
          </Button>{" "}
        </Flex>
      </Flex>
      <Grid gap="3">
        {scoreDetails
          .sort((a, b) => a.ms - b.ms)
          .map((entry, index) => {
            const rating = getRating(entry.ms);
            const percent = Math.min(1000 / Math.max(entry.ms, 1), 1) * 100; // bar visualization

            return (
              <Card key={index}>
                <Flex direction="column" gap="1">
                  {/* Reaction time + Rating */}
                  <Flex justify="between">
                    <Text weight="bold">{entry.ms} ms</Text>
                    <Text color={rating.color as "cyan"}>{rating.label}</Text>
                  </Flex>

                  {/* Bar visualization */}
                  <Box
                    height="6px"
                    mt="2"
                    style={{
                      background: "#333",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      style={{
                        width: `${percent}%`,
                        height: "100%",
                        background: rating.color,
                      }}
                    />
                  </Box>

                  {/* Points awarded */}
                  <Text size="2" color="gray">
                    +{entry.points} points
                  </Text>
                </Flex>
              </Card>
            );
          })}
      </Grid>
    </Box>
  );
};

export default AimTrainerScoreBreakdown;
