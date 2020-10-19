import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import formStyles from "../styles/formStyles";
import Typography from "@material-ui/core/Typography";
import HouseStore from "../stores/HouseStore";
import ProfileStore from "../stores/ProfileStore";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

export default function MoveUser() {
  const classes = formStyles();
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");
  const { currentHouse } = HouseStore();
  const {
    profiles,
    currentProfile,
    changeLocation,
    setProfiles,
  } = ProfileStore();
  const [location, setLocation] = useState("");

  const loadProfiles = async () => {
    const res = await axios.get("/api/profiles");
    if (res.status === 200) {
      setProfiles(res.data);
    }
  };

  const handleOpen = async () => {
    loadProfiles().then(() => {
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProfile("");
    setLocation("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const putBody = {
      name: selectedProfile,
      location: location,
    };
    const res = await axios.put("/api/profiles/location", putBody);
    if (res.status === 200) {
      if (selectedProfile === currentProfile?.name) {
        changeLocation(location);
      }
      setSelectedProfile("");
      setLocation("");
      loadProfiles().then(() => {
        setOpen(false);
      });
    }
  };

  const handleProfileChange = (event) => {
    const { value } = event.target;
    return setSelectedProfile(value);
  };

  const handleLocationChange = (event) => {
    const { value } = event.target;
    return setLocation(value);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleOpen}
      >
        Move Users
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
              Move User
            </Typography>
            {profiles.length > 0 ? (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box p={1}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Profile</InputLabel>
                    <Select
                      value={selectedProfile}
                      onChange={(e) => {
                        handleProfileChange(e);
                      }}
                    >
                      {profiles.map((profile) => (
                        <MenuItem key={profile.name} value={profile.name}>
                          {profile.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Location</InputLabel>
                    <Select
                      value={location}
                      onChange={(e) => {
                        handleLocationChange(e);
                      }}
                    >
                      {Object.keys(currentHouse.rooms).map((room) => (
                        <MenuItem key={room} value={room}>
                          {room}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box p={1} display="flex" justifyContent="flex-end">
                  <Button variant="outlined" color="primary" type="submit">
                    Move
                  </Button>
                </Box>
              </form>
            ) : (
              <Typography variant="body1">
                You must have at least one profile
              </Typography>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
