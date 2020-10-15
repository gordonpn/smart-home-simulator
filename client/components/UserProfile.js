import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import ProfileStore from "../stores/ProfileStore";

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
}));

export default function UserProfile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { currentProfile } = ProfileStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                <></>
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
            <h2 id="transition-modal-title">Change User Profile</h2>
            <p id="transition-modal-description">
              There will be a dropdown with available profiles here.
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
