import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    minWidth: 200,
  },
}));

export default function AddUser() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [permission, setPermission] = useState("");
  const { currentState } = RunningStateStore();
  const { currentHouse } = HouseStore();

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
    const res = await axios.post("/api/profile", postBody);
    if (res.status === 200) {
      setName("");
      setLocation("");
      setRole("");
      setPermission("");
    }
    setOpen(false);
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
                <Box p={1}>
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
