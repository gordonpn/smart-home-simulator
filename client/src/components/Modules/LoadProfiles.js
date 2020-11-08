import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ProfileStore from "@/src/stores/ProfileStore";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function LoadProfiles() {
  const [onSuccess, setOnSuccess] = useState(false);
  const [onFailure, setOnFailure] = useState(false);
  const { setProfiles } = ProfileStore();
  const { appendToLogs } = ConsoleStore();

  const handleClick = async () => {
    const response = await axios.get("/api/profiles/load");
    if (response.status === 200) {
      const res = await axios.get("/api/profiles");
      if (res.status === 200) {
        setProfiles(res.data);
        setOnSuccess(true);
        appendToLogs({
          timestamp: new Date(),
          message: `Loaded profiles from filesystem "${name}"`,
          module: "SHS",
        });
      }
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
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        Load From Disk
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={onSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <Typography variant="h6">
            Loaded profiles from disk successfully.
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
            Failed to load the profiles from disk.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
