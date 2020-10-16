import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import RunningStateStore from "../stores/RunningStateStore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import formStyles from "../styles/formStyles";

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userDateInput, setUserDateInput] = useState("");
  const [userTimeInput, setUserTimeInput] = useState("");
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const { currentState } = RunningStateStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dateArray = userDateInput.split("-");
    const timeArray = userTimeInput.split(":");
    if (dateArray.length > 1 && timeArray.length > 1) {
      setCurrentTime(
        new Date(
          parseInt(dateArray[0]),
          parseInt(dateArray[1]) - 1,
          parseInt(dateArray[2]),
          parseInt(timeArray[0]),
          parseInt(timeArray[1]),
          currentTime.getSeconds()
        )
      );
    } else if (dateArray.length > 1 && timeArray.length <= 1) {
      //  only the date is set
      setCurrentTime(
        new Date(
          parseInt(dateArray[0]),
          parseInt(dateArray[1]) - 1,
          parseInt(dateArray[2]),
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds()
        )
      );
    } else if (dateArray.length <= 1 && timeArray.length > 1) {
      //  only the time is set
      setCurrentTime(
        new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          parseInt(timeArray[0]),
          parseInt(timeArray[1]),
          currentTime.getSeconds()
        )
      );
    }
    setOpen(false);
    const postBody = {
      currentTime: currentTime,
    };
    await axios.put("/api/date-time", postBody);
  };

  const defaultDateValue = () => {
    const year = currentTime.getFullYear();
    const currentMonth = currentTime.getMonth() + 1;
    const month =
      currentMonth.toString().length === 1
        ? "0" + currentMonth.toString()
        : currentMonth;
    const currentDate = currentTime.getDate();
    const date =
      currentDate.toString().length === 1
        ? "0" + currentDate.toString()
        : currentDate;
    return `${year}-${month}-${date}`;
  };

  const defaultTimeValue = () => {
    const currentHours = currentTime.getHours();
    const hours =
      currentHours.toString().length === 1
        ? "0" + currentHours.toString()
        : currentHours;
    const currentMinutes = currentTime.getMinutes();
    const minutes =
      currentMinutes.toString().length === 1
        ? "0" + currentMinutes.toString()
        : currentMinutes;

    return `${hours}:${minutes}`;
  };

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
                <form noValidate onSubmit={handleSubmit}>
                  <TextField
                    type="date"
                    onInput={(e) => {
                      const { value } = e.target;
                      return setUserDateInput(value);
                    }}
                    defaultValue={defaultDateValue()}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    type="time"
                    onInput={(e) => {
                      const { value } = e.target;
                      return setUserTimeInput(value);
                    }}
                    defaultValue={defaultTimeValue()}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                  />
                  <Button type="submit">Save</Button>
                </form>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
