import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import RunningStateStore from "../stores/RunningStateStore";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { currentState } = RunningStateStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (currentState) {
      const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleString());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentState]);

  return (
    <>
      <Button size="large" onClick={handleOpen}>
        {currentTime}
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Change Current Time</h2>
            <p id="transition-modal-description">
              There will be an option to change current time here.
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
