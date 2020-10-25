import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import HouseStore from "@/src/stores/HouseStore";
import formStyles from "@/src/styles/formStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

export default function OutsideTemp() {
  const classes = formStyles();
  const [outTemp, setOutTemp] = useState("");
  const [open, setOpen] = useState(false);
  const { currentHouse, currentTemperature, setTemperature } = HouseStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const putBody = {
      outTemp: outTemp,
    };
    const res = await axios.put("/api/outside-temperature", putBody);
    if (res.status === 200) {
      setTemperature(outTemp);
      setOpen(false);
    }
  };

  return (
    <>
      <Button color="primary" size="large" onClick={handleOpen}>
        Outside Temp. {currentTemperature}&deg;C
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
              Change Outside Temperature
            </Typography>
            {currentHouse ? (
              <Box p={1}>
                <form
                  className={classes.container}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <TextField
                    label="Temperature"
                    type="number"
                    onInput={(e) => {
                      const { value } = e.target;
                      return setOutTemp(value);
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
            ) : (
              <Typography variant="body1">
                You must load a house-layout file first
              </Typography>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
