import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import HouseStore from "../stores/HouseStore";
import formStyles from "../styles/formStyles";
import Typography from "@material-ui/core/Typography";

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
              <form
                className={classes.container}
                noValidate
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  onInput={(e) => {
                    const { value } = e.target;
                    return setOutTemp(value);
                  }}
                />
                <Button type="submit">Submit</Button>
              </form>
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
