import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import RunningStateStore from "@/src/stores/RunningStateStore";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function SaveProfiles() {
  const [onSuccess, setOnSuccess] = useState(false);
  const [onFailure, setOnFailure] = useState(false);
  const [onConflict, setOnConflict] = useState(false);
  const { currentState } = RunningStateStore();
  const { appendToLogs } = ConsoleStore();

  const handleClick = async () => {
    if (currentState) {
      setOnConflict(true);
      return;
    }
    const response = await axios.get("/api/profiles/save");
    if (response.status === 200) {
      setOnSuccess(true);
      appendToLogs({
        timestamp: new Date(),
        message: `Saved profiles to filesystem "${name}"`,
        module: "SHS",
      });
    } else if (response.status === 500) {
      setOnFailure(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOnFailure(false);
    setOnSuccess(false);
    setOnConflict(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        Save To Disk
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={onSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <Typography variant="h6">
            Saved profiles to disk successfully.
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={onFailure}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          <Typography variant="h6">
            Failed to save the profiles to disk.
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={onConflict}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          <Typography variant="h6">
            You must stop the simulation before saving.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
