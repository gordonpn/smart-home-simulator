import RunningStateStore from "@/src/stores/RunningStateStore";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProfileStore from "@/src/stores/ProfileStore";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function AwayMode() {
  const { currentState } = RunningStateStore();
  const { profiles } = ProfileStore();
  const [awayMode, setAwayMode] = useState(false);
  const { appendToLogs } = ConsoleStore();

  useEffect(() => {
    const fetchAwayMode = async () => {
      if (currentState) {
        for (const profile of profiles) {
          if (profile.location.toLowerCase() !== "outside") {
            appendToLogs({
              timestamp: new Date(),
              message: "Away mode has been turned off automatically",
              module: "SHP",
            });
            setAwayMode(false);
            return;
          }
        }
        appendToLogs({
          timestamp: new Date(),
          message: "Away mode has been turned on automatically",
          module: "SHP",
        });
        setAwayMode(true);
      }
    };
    fetchAwayMode();
  }, [appendToLogs, currentState, profiles]);

  return (
    <>
      {currentState && awayMode && (
        <Typography variant="h6" color="primary">
          System is in Away Mode
        </Typography>
      )}
    </>
  );
}
