import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React from "react";

export default function Toggle() {
  const [runningState, setRunningState] = React.useState("off");

  const handleRunningState = (event, newRunningState) => {
    setRunningState(newRunningState);
  };

  return (
    <>
      <ToggleButtonGroup
        value={runningState}
        exclusive
        onChange={handleRunningState}
      >
        <ToggleButton value="on">
          <Typography variant="body1" gutterBottom>
            On
          </Typography>
        </ToggleButton>
        <ToggleButton value="off">
          <Typography variant="body1" gutterBottom>
            Off
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
