import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import RunningStateStore from "../stores/RunningStateStore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { currentState } = RunningStateStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    if (currentState) {
      const interval = setInterval(() => {
        const incrementSeconds = currentTime.getSeconds() + 1;
        const newTime = currentTime.setSeconds(incrementSeconds);
        setCurrentTime(new Date(newTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentState, currentTime]);

  return (
    <>
      <Button size="large" onClick={handleOpen}>
        {currentTime.toLocaleString()}
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
            <Typography variant="h6" gutterBottom>
              Change Current Time
            </Typography>
            {currentState ? (
              <>
                <Typography variant="body1">
                  Cannot edit time while simulation is running!
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body1">
                  <form
                    className={classes.container}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </Typography>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
