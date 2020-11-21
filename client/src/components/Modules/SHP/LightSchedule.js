import { Button } from "@material-ui/core";
import React, { useState } from "react";
import HouseStore from "@/src/stores/HouseStore";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import formStyles from "@/src/styles/formStyles";
import TextField from "@material-ui/core/TextField";

export default function LightSchedule() {
  const classes = formStyles();
  const [open, setOpen] = useState(false);
  const { addLightsSchedule, currentHouse } = HouseStore();
  const [selectedLight, setSelectedLight] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const schedule = { startTime: startTime, endTime: endTime };
    addLightsSchedule(selectedLight, schedule);
    setOpen(false);
  };

  const handleLightChange = (event) => {
    const { value } = event.target;
    return setSelectedLight(value);
  };

  return (
    <>
      <Button
        color="primary"
        size="large"
        variant="outlined"
        onClick={handleOpen}
      >
        Light Schedule
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
              Set Light Schedule
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Box p={1}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Lights</InputLabel>
                  <Select
                    value={selectedLight}
                    onChange={(e) => {
                      handleLightChange(e);
                    }}
                  >
                    {currentHouse && currentHouse.houseCoor.lights.length
                      ? currentHouse.houseCoor.lights.map((light) => (
                          <MenuItem key={light.name} value={light.name}>
                            {light.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                type="time"
                label="Start time"
                onInput={(e) => {
                  const { value } = e.target;
                  return setStartTime(value);
                }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
              <TextField
                type="time"
                label="End time"
                onInput={(e) => {
                  const { value } = e.target;
                  return setEndTime(value);
                }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
              <Box p={1} display="flex" justifyContent="flex-end">
                <Button variant="outlined" color="primary" type="submit">
                  Set Schedule
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
