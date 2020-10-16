import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ProfileStore from "../stores/ProfileStore";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";

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
export default function RemoveUser() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");
  const { profiles, setProfiles } = ProfileStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      params: {
        name: selectedProfile,
      },
    };
    const res = await axios.delete("/api/profile", params);
    if (res.status === 200) {
      setSelectedProfile("");
    }
    setOpen(false);
  };

  useEffect(() => {
    const getProfiles = async () => {
      const res = await axios.get("/api/profile");
      if (res.status === 200) {
        setProfiles(res.data);
      }
    };
    getProfiles();
  });

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Remove
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
              Remove A Profile
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Box p={1}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Profile</InputLabel>
                  <Select
                    value={selectedProfile}
                    onChange={(e) => {
                      const { value } = e.target;
                      return setSelectedProfile(value);
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
              <Box p={1}>
                <Button variant="outlined" color="primary" type="submit">
                  Remove
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
