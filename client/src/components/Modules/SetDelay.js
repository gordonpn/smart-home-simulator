import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import HouseStore from "@/src/stores/HouseStore";
import formStyles from "@/src/styles/formStyles";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function SetDelay() {
  const classes = formStyles();
  const { delay, setDelay } = HouseStore();
  const [open, setOpen] = useState(false);
  const { appendToLogs } = ConsoleStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    appendToLogs({
      timestamp: new Date(),
      message: `Changed delay to contact authorities to ${delay} minutes`,
      module: "SHP",
    });
    setOpen(false);
  };

  return (
    <>
      <Button color="primary" size="large" onClick={handleOpen}>
        Delay before contacting authorities: {delay} minutes
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
              Change Delay
            </Typography>
            <Box p={1}>
              <form
                className={classes.container}
                noValidate
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Delay in minutes"
                  type="number"
                  min="0"
                  onInput={(e) => {
                    const { value } = e.target;
                    return setDelay(value > -1 ? value : 0);
                  }}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Box p={1}>
                  <Button variant="outlined" color="primary" type="submit">
                    Set
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
