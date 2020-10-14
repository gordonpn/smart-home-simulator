import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useEffect } from "react";
import axios from "axios";
import RunningStateStore from "../stores/RunningStateStore";

export default function Toggle() {
  const { currentState, setRunningState } = RunningStateStore();

  const handleRunningState = (event, newRunningState) => {
    setRunningState(newRunningState);
    if (newRunningState) {
      axios.put("api/running");
    } else {
      axios.delete("api/running");
    }
  };

  useEffect(() => {
    const getRunningState = async () => {
      const res = await axios.get("/api/running");
      const { runningStatus } = res.data;
      setRunningState(runningStatus);
    };
    getRunningState();
  }, []);

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
          value={currentState}
        >
          <ToggleButton value={true}>
            <Typography variant="button" display="block">
              On
            </Typography>
          </ToggleButton>
          <ToggleButton value={false}>
            <Typography variant="button" display="block">
              Off
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
}
