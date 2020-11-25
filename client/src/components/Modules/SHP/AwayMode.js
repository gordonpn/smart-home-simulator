import RunningStateStore from "@/src/stores/RunningStateStore";
import React, { useEffect, useState } from "react";
import HouseStore from "@/src/stores/HouseStore";
import ConsoleStore from "@/src/stores/ConsoleStore";
import Button from "@material-ui/core/Button";
import SHPStore from "@/src/stores/SHPStore";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import formStyles from "@/src/styles/formStyles";

export default function AwayMode() {
  const [everyoneOutside, setEveryoneOutside] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openPermissionError, setOpenPermissionError] = useState(false);
  const classes = formStyles();
  const { appendToLogs } = ConsoleStore();
  const { awayMode, setAwayMode } = SHPStore();
  const { currentState } = RunningStateStore();
  const { profiles, currentProfile } = HouseStore();

  useEffect(() => {
    const isEveryoneOutside = () => {
      for (const profile of profiles) {
        if (profile.location.toLowerCase() !== "outside") {
          setEveryoneOutside(false);
          return;
        }
      }
      setEveryoneOutside(true);
    };
    isEveryoneOutside();
  }, [profiles]);

  const handleClick = () => {
    if (
      currentProfile.permission.toLowerCase() === "stranger" ||
      currentProfile.permission.toLowerCase() === "guest"
    ) {
      setOpenPermissionError(true);
      return;
    }
    if (!everyoneOutside && !awayMode) {
      setOpenError(true);
      return;
    }
    setAwayMode(!awayMode);
    if (awayMode) {
      appendToLogs({
        timestamp: new Date(),
        message: "Away mode has been turned on automatically",
        module: "SHP",
      });
    } else {
      appendToLogs({
        timestamp: new Date(),
        message: "Away mode has been turned off automatically",
        module: "SHP",
      });
    }
  };

  const handleClose = () => {
    setOpenError(false);
    setOpenPermissionError(false);
  };

  return (
    <>
      {currentState && (
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleClick}
        >
          Away Mode: {awayMode ? "ON" : "OFF"}
        </Button>
      )}
      <Modal
        className={classes.modal}
        open={openError}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openError}>
          <div className={classes.paper}>
            <Typography variant="h6">
              Cannot set away mode to ON when there are still people in the
              house
            </Typography>
          </div>
        </Fade>
      </Modal>
      <Modal
        className={classes.modal}
        open={openPermissionError}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPermissionError}>
          <div className={classes.paper}>
            <Typography variant="h6">
              Your permission does not allow changing this setting
            </Typography>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
