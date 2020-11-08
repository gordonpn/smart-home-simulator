import RunningStateStore from "@/src/stores/RunningStateStore";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProfileStore from "@/src/stores/ProfileStore";

export default function AwayMode() {
  const { currentState } = RunningStateStore();
  const { profiles } = ProfileStore();
  const [awayMode, setAwayMode] = useState(false);

  useEffect(() => {
    const fetchAwayMode = async () => {
      if (currentState) {
        for (const profile of profiles) {
          if (profile.location.toLowerCase() !== "outside") {
            setAwayMode(false);
            return;
          }
        }
        setAwayMode(true);
      }
    };
    fetchAwayMode();
  }, [currentState, profiles]);

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
