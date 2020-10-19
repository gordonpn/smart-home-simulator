import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import RunningStateStore from "../stores/RunningStateStore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import HouseStore from "../stores/HouseStore";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import formStyles from "../styles/formStyles";
import ProfileStore from "../stores/ProfileStore";

export default function AddUser() {
  const classes = formStyles();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [permission, setPermission] = useState("");
  const { currentState } = RunningStateStore();
  const { currentHouse } = HouseStore();
  const { setProfiles } = ProfileStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postBody = {
      name: name,
      location: location,
      role: role,
      permission: permission,
    };
    const res = await axios.post("/api/profiles", postBody);
    if (res.status === 200) {
      setName("");
      setLocation("");
      setRole("");
      setPermission("");
      const response = await axios.get("/api/profiles");
      if (response.status === 200) {
        setProfiles(response.data);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add
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
              Add A Profile
            </Typography>
            {currentState ? (
              <Typography variant="body1">
                You must stop the simulation to add a profile
              </Typography>
            ) : currentHouse ? (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                  <TextField
                    label="Permission"
                    value={permission}
                    onChange={(e) => {
                      const { value } = e.target;
                      return setPermission(value);
                    }}
                  />
                </Box>
                <Box p={1} display="flex" justifyContent="flex-end">
                  <Button variant="outlined" color="primary" type="submit">
                    Create
                  </Button>
                </Box>
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
