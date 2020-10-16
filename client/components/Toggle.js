import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RunningStateStore from "../stores/RunningStateStore";
import ProfileStore from "../stores/ProfileStore";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function Toggle() {
  const { currentState, setRunningState } = RunningStateStore();
  const { currentProfile, setCurrentProfile } = ProfileStore();
  const [openAlert, setOpenAlert] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [logOutAlert, setLogOutAlert] = useState(false);

  const handleRunningState = (event, newRunningState) => {
    if (newRunningState) {
      if (currentProfile === undefined) {
        setOpenAlert(true);
      } else {
        setOnSuccess(true);
        axios.put("api/running");
        setRunningState(newRunningState);
      }
    } else {
      setLogOutAlert(true);
      axios.delete("api/running");
      setCurrentProfile(undefined);
      setRunningState(newRunningState);
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
        autoHideDuration={5000}
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
        autoHideDuration={5000}
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
        autoHideDuration={5000}
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
