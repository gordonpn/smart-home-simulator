import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RunningStateStore from "@/src/stores/RunningStateStore";
import ProfileStore from "@/src/stores/ProfileStore";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function Toggle() {
  const { currentState, setRunningState } = RunningStateStore();
  const { currentProfile, setCurrentProfile } = ProfileStore();
  const [openAlert, setOpenAlert] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [logOutAlert, setLogOutAlert] = useState(false);
  const { appendToLogs } = ConsoleStore();

  const handleRunningState = async (event, newRunningState) => {
    if (newRunningState) {
      if (currentProfile === undefined) {
        setOpenAlert(true);
      } else {
        const params = {
          params: {
            name: currentProfile.name,
          },
        };
        const runningRes = await axios.put("/api/running");
        const loginRes = await axios.put("/api/profiles/login", {}, params);
        if (runningRes.status === 200 && loginRes.status === 200) {
          setOnSuccess(true);
          setRunningState(newRunningState);
          appendToLogs({
            timestamp: new Date(),
            message: "Simulation started",
            module: "SHS",
          });
        }
      }
    } else {
      const runningRes = await axios.delete("api/running");
      const logoutRes = await axios.put("/api/profiles/logout");
      if (runningRes.status === 200 && logoutRes.status === 200) {
        setLogOutAlert(true);
        setCurrentProfile(undefined);
        setRunningState(newRunningState);
        appendToLogs({
          timestamp: new Date(),
          message: "Simulation stopped",
          module: "SHS",
        });
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    setOnSuccess(false);
    setLogOutAlert(false);
  };

  useEffect(() => {
    const getRunningState = async () => {
      const res = await axios.get("/api/running");
      const { runningStatus } = res.data;
      setRunningState(runningStatus);
    };
    getRunningState();
  }, [setRunningState]);

  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={2}
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          <Typography variant="h6">
            You may not start or log in to the simulation without a profile
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={onSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <Typography variant="h6">
            Started and logged in the simulation as {currentProfile?.name}
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={logOutAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <Typography variant="h6">
            You have logged out and stopped simulation
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
