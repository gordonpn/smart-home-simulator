import React from "react";
import RunningStateStore from "@/src/stores/RunningStateStore";
import Typography from "@material-ui/core/Typography";
import { ToggleButtonGroup } from "@material-ui/lab";
import ToggleButton from "@material-ui/lab/ToggleButton";

export default function TimeSpeedToggle() {
  const { timeSpeed, setTimeSpeed, currentState } = RunningStateStore();

  const handleSpeedChange = (e, newSpeed) => {
    setTimeSpeed(newSpeed);
  };

  return (
    <>
      {currentState && (
        <>
          <Typography>Adjust Speed</Typography>
          <ToggleButtonGroup
            value={timeSpeed}
            exclusive
            onChange={handleSpeedChange}
          >
            <ToggleButton value={1}>
              <Typography variant="button" display="block">
                x1
              </Typography>
            </ToggleButton>
            <ToggleButton value={2}>
              <Typography variant="button" display="block">
                x2
              </Typography>
            </ToggleButton>
            <ToggleButton value={4}>
              <Typography variant="button" display="block">
                x4
              </Typography>
            </ToggleButton>
            <ToggleButton value={8}>
              <Typography variant="button" display="block">
                x8
              </Typography>
            </ToggleButton>
            <ToggleButton value={16}>
              <Typography variant="button" display="block">
                x16
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </>
      )}
    </>
  );
}
