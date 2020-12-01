import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import RunningStateStore from "@/src/stores/RunningStateStore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import formStyles from "@/src/styles/formStyles";
import ConsoleStore from "@/src/stores/ConsoleStore";
import HouseStore from "@/src/stores/HouseStore";
import SHPStore from "@/src/stores/SHPStore";
import moment from "moment";

export default function DateTime() {
  const [userDateInput, setUserDateInput] = useState("");
  const [userTimeInput, setUserTimeInput] = useState("");
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const { currentState, currentTime, setCurrentTime } = RunningStateStore();
  const { appendToLogs } = ConsoleStore();
  const {
    lightsSchedule,
    lights,
    setTriggerRender,
    triggerRender,
  } = HouseStore();
  const { awayMode } = SHPStore();
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
    let newTime = new Date();
    if (dateArray.length > 1 && timeArray.length > 1) {
      newTime = new Date(
        parseInt(dateArray[0]),
        parseInt(dateArray[1]) - 1,
        parseInt(dateArray[2]),
        parseInt(timeArray[0]),
        parseInt(timeArray[1]),
        currentTime.getSeconds()
      );
    } else if (dateArray.length > 1 && timeArray.length <= 1) {
      //  only the date is set
      newTime = new Date(
        parseInt(dateArray[0]),
        parseInt(dateArray[1]) - 1,
        parseInt(dateArray[2]),
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds()
      );
    } else if (dateArray.length <= 1 && timeArray.length > 1) {
      //  only the time is set
      newTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        parseInt(timeArray[0]),
        parseInt(timeArray[1]),
        currentTime.getSeconds()
      );
    }
    setCurrentTime(newTime);
    setOpen(false);
    appendToLogs({
      timestamp: new Date(),
      message: `Changed simulated date time to ${newTime.toLocaleString()}`,
      module: "SHS",
    });
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
      if (lightsSchedule.size && awayMode) {
        lightsSchedule.forEach((value, key) => {
          let currentHour = currentTime.getHours().toString();
          let currentMinute = currentTime.getMinutes().toString();
          currentHour =
            currentHour.length === 1 ? "0" + currentHour : currentHour;
          currentMinute =
            currentMinute.length === 1 ? "0" + currentMinute : currentMinute;
          const start = moment(value.startTime, moment.HTML5_FMT.TIME);
          const end = moment(value.endTime, moment.HTML5_FMT.TIME);
          const myTime = moment(
            currentHour + ":" + currentMinute,
            moment.HTML5_FMT.TIME
          );

          if (myTime.isBetween(start, end, undefined, "[]")) {
            lights.set(key, { isOn: true });
            setTriggerRender(!triggerRender);
          } else {
            lights.set(key, { isOn: false });
            setTriggerRender(!triggerRender);
          }
        });
      }
      const interval = setInterval(() => {
        const incrementSeconds = currentTime.getSeconds() + 1;
        const newTime = currentTime.setSeconds(incrementSeconds);
        setCurrentTime(new Date(newTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    currentState,
    currentTime,
    setCurrentTime,
    lightsSchedule,
    awayMode,
    lights,
    setTriggerRender,
    triggerRender,
  ]);

  return (
    <>
      <Button
        size="large"
        onClick={handleOpen}
        style={currentState ? null : { color: "red" }}
      >
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
                  <Button variant="outlined" color="primary" type="submit">
                    Save
                  </Button>
                </form>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
