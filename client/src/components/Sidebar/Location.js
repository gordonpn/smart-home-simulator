import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import formStyles from "@/src/styles/formStyles";
import axios from "axios";
import HouseStore from "@/src/stores/HouseStore";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function Location() {
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const {
    currentHouse,
    currentProfile,
    changeLocation,
    setProfiles,
  } = HouseStore();
  const [location, setLocation] = useState("");
  const { appendToLogs } = ConsoleStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLocation("");
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const putBody = {
      name: currentProfile.name,
      location: location,
    };
    const res = await axios.put("/api/profiles/location", putBody);
    if (res.status === 200) {
      changeLocation(location);
      const response = await axios.get("/api/profiles");
      if (response.status === 200) {
        setProfiles(response.data);
        appendToLogs({
          timestamp: new Date(),
          message: `Moved selected profile to location "${location}"`,
          module: "SHS",
        });
        setOpen(false);
      }
    }
  };

  return (
    <>
      {currentHouse !== undefined && (
        <Button color="primary" onClick={handleOpen}>
          <Box
            display="flex"
            p={2}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Location:</Typography>
            {currentProfile === undefined ? <></> : currentProfile.location}
          </Box>
        </Button>
      )}
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
              Change User Location
            </Typography>
            {currentProfile ? (
              <>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <Box p={1}>
                    <FormControl className={classes.formControl}>
                      <InputLabel>New Location</InputLabel>
                      <Select
                        value={location}
                        onChange={(e) => {
                          const { value } = e.target;
                          return setLocation(value);
                        }}
                      >
                        {currentHouse
                          ? Object.keys(currentHouse.rooms).map((room) => (
                              <MenuItem key={room} value={room}>
                                {room}
                              </MenuItem>
                            ))
                          : null}
                        <MenuItem key="outside" value="outside">
                          outside
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box p={1} display="flex" justifyContent="flex-end">
                    <Button variant="outlined" color="primary" type="submit">
                      Move
                    </Button>
                  </Box>
                </form>
              </>
            ) : (
              <Typography variant="body1">Select a profile first</Typography>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
