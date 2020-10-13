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
      <Box
        display="flex"
        p={2}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ToggleButtonGroup
          exclusive
          onChange={handleRunningState}
          size="large"
          value={runningState}
        >
          <ToggleButton value="on">
            <Typography variant="button" display="block">
              On
            </Typography>
          </ToggleButton>
          <ToggleButton value="off">
            <Typography variant="button" display="block">
              Off
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
}
