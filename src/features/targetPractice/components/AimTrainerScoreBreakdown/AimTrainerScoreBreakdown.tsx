import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";

/**
 * Grouped score breakdown.
 * Groups hits into rating buckets (S+ -> F) and shows items in each group.
 */

type Entry = { ms: number; points: number };

const getRating = (ms: number) => {
  if (ms <= 200) return { label: "S+ (Insane)", color: "green", tier: 1 };
  if (ms <= 300) return { label: "S (Excellent)", color: "lime", tier: 2 };
  if (ms <= 400) return { label: "A (Great)", color: "cyan", tier: 3 };
  if (ms <= 550) return { label: "B (Good)", color: "yellow", tier: 4 };
  if (ms <= 800) return { label: "C (Slow)", color: "orange", tier: 5 };
  return { label: "F (Too Slow)", color: "red", tier: 6 };
};

const AimTrainerScoreBreakdown: React.FC<{ scoreDetails: Entry[] }> = ({
  scoreDetails,
}) => {
  if (!scoreDetails || scoreDetails.length === 0) return null;

  // Build groups
  const groupsMap: Record<
    string,
    { label: string; color: string; tier: number; items: Entry[] }
  > = {};

  scoreDetails.forEach((entry) => {
    const r = getRating(entry.ms);
    if (!groupsMap[r.label]) groupsMap[r.label] = { ...r, items: [] };
    groupsMap[r.label].items.push(entry);
  });

  const groups = Object.values(groupsMap).sort((a, b) => a.tier - b.tier);

  return (
    <Box mt="6">
      <Text size="5" mb="4" weight="bold">
        Score Breakdown
      </Text>

      {groups.map((group) => (
        <Box key={group.label} mb="4">
          <Text weight="bold" size="4" color={group.color as "cyan"}>
            {group.label} — {group.items.length} target
            {group.items.length !== 1 ? "s" : ""}
          </Text>

          <Grid gap="2" mt="2">
            {group.items.map((entry, idx) => (
              <Card key={idx} >
                <Flex justify="between" align="center">
                  <Text weight="bold">{entry.ms} ms</Text>
                  <Text size="2" color="gray">
                    +{Math.round(entry.points)} pts
                  </Text>
                </Flex>
              </Card>
            ))}
          </Grid>
          
        </Box>
      ))}

      <Card mt="5">
        <Text weight="bold" mb="2">
          How Scoring Works
        </Text>
        <Text size="2" color="gray">
          • Faster clicks → more points • Slower clicks → fewer points •
          Formula: <b>points = max(0, 1000 − reactionTime)</b> • Example: 300ms →
          <b> 700 points</b>
        </Text>
      </Card>
    </Box>
  );
};

export default AimTrainerScoreBreakdown;