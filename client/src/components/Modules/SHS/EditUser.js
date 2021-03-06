import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import RunningStateStore from "@/src/stores/RunningStateStore";
import HouseStore from "@/src/stores/HouseStore";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import formStyles from "@/src/styles/formStyles";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function EditUser() {
  const classes = formStyles();
  const [open, setOpen] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { currentState } = RunningStateStore();
  const {
    currentHouse,
    profiles,
    changeLocation,
    currentProfile,
    setProfiles,
  } = HouseStore();
  const [selectedProfile, setSelectedProfile] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [permission, setPermission] = useState("");
  const [permissionsAvail, setPermissionsAvail] = useState([]);
  const { appendToLogs } = ConsoleStore();

  const loadProfiles = async () => {
    const res = await axios.get("/api/profiles");
    if (res.status === 200) {
      setProfiles(res.data);
    }
  };

  const handleOpen = async () => {
    loadProfiles().then(async () => {
      const res = await axios.get("/api/profiles/permissions");
      if (res.status === 200) {
        setPermissionsAvail(res.data);
        setOpen(true);
      }
    });
  };

  const handleClose = () => {
    setSelectedProfile("");
    setShowEditForm(false);
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    appendToLogs({
      timestamp: new Date(),
      message: `Modified profile "${name}"`,
      module: "SHS",
    });
    const putBody = {
      oldName: selectedProfile,
      name: name,
      location: location,
      role: role,
      permission: permission,
    };

    const res = await axios.put("/api/profiles", putBody);
    if (res.status === 200) {
      setSelectedProfile("");
      setShowEditForm(false);
      if (currentProfile && selectedProfile === currentProfile.name) {
        changeLocation(location);
      }
      loadProfiles().then(() => {
        setOpen(false);
      });
    }
  };

  const handleProfileChange = (event) => {
    const { value } = event.target;
    profiles.forEach((profile) => {
      if (profile.name === value) {
        setLocation(profile.location);
        setName(profile.name);
        setRole(profile.role);
        setPermission(profile.permission);
        setShowEditForm(true);
      }
    });
    return setSelectedProfile(value);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Edit
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
              Edit A Profile
            </Typography>
            {currentState ? (
              <Typography variant="body1">
                You must stop the simulation to edit profiles
              </Typography>
            ) : profiles.length < 1 ? (
              <Typography variant="body1">
                You must have at least one profile.
              </Typography>
            ) : (
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
                      {profiles.length &&
                        profiles.map((profile) => (
                          <MenuItem key={profile.name} value={profile.name}>
                            {profile.name}
                          </MenuItem>
                        ))}
                    </Select>
                    {showEditForm && (
                      <>
                        <Box p={1}>
                          <TextField
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(e) => {
                              const { value } = e.target;
                              return setName(value);
                            }}
                          />
                        </Box>
                        <Box p={1}>
                          <FormControl className={classes.formControl}>
                            <InputLabel>Location</InputLabel>
                            <Select
                              value={location}
                              onChange={(e) => {
                                const { value } = e.target;
                                return setLocation(value);
                              }}
                            >
                              {Object.keys(currentHouse.rooms).map((room) => (
                                <MenuItem key={room} value={room}>
                                  {room}
                                </MenuItem>
                              ))}
                              <MenuItem key="outside" value="outside">
                                outside
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box p={1}>
                          <TextField
                            label="Role"
                            value={role}
                            onChange={(e) => {
                              const { value } = e.target;
                              return setRole(value);
                            }}
                          />
                        </Box>
                        <Box p={1}>
                          <FormControl className={classes.formControl}>
                            <InputLabel>Permission</InputLabel>
                            <Select
                              required
                              value={permission}
                              onChange={(e) => {
                                const { value } = e.target;
                                return setPermission(value);
                              }}
                            >
                              {permissionsAvail.map((thisPermission) => (
                                <MenuItem
                                  key={thisPermission}
                                  value={thisPermission}
                                >
                                  {thisPermission}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </>
                    )}
                  </FormControl>
                </Box>
                <Box p={1} display="flex" justifyContent="flex-end">
                  <Button variant="outlined" color="primary" type="submit">
                    Update
                  </Button>
                </Box>
              </form>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
