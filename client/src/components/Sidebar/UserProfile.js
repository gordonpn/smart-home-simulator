import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import ProfileStore from "@/src/stores/ProfileStore";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RunningStateStore from "@/src/stores/RunningStateStore";
import formStyles from "@/src/styles/formStyles";
import axios from "axios";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function UserProfile() {
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");
  const { appendToLogs } = ConsoleStore();
  const {
    currentProfile,
    setCurrentProfile,
    profiles,
    setProfiles,
  } = ProfileStore();
  const { currentState } = RunningStateStore();

  const handleOpen = async () => {
    const res = await axios.get("/api/profiles");
    if (res.status === 200) {
      setProfiles(res.data);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedProfile("");
    setOpen(false);
  };

  const handleProfileChange = (event) => {
    const { value } = event.target;
    return setSelectedProfile(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    profiles.forEach((profile) => {
      if (profile.name === selectedProfile) {
        setCurrentProfile(profile);
        appendToLogs({
          timestamp: new Date(),
          message: `Profile "${selectedProfile}" selected for simulation`,
          module: "SHS",
        });
        setOpen(false);
      }
    });
  };

  return (
    <>
      <Box display="flex" p={2}>
        <Button onClick={handleOpen}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar />
            <Box p={1}>
              {currentProfile === undefined ? (
                <Typography>No Profile Selected</Typography>
              ) : (
                <Typography>{currentProfile.name}</Typography>
              )}
            </Box>
          </Box>
        </Button>
      </Box>
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
              Change Profile
            </Typography>
            {currentState ? (
              <Typography variant="body1">
                You must stop the simulation to change profile
              </Typography>
            ) : profiles.length > 0 ? (
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
                </Box>
                <Box p={1} display="flex" justifyContent="flex-end">
                  <Button variant="outlined" color="primary" type="submit">
                    Select Profile
                  </Button>
                </Box>
              </form>
            ) : (
              <Typography variant="body1">
                You must have least one profile
              </Typography>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
