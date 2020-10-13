import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

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

export default function LocationLink() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        p={2}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>Location:</Typography>
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Kitchen
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
            <h2 id="transition-modal-title">Change User Location</h2>
            <p id="transition-modal-description">
              There will be a dropdown with available locations here.
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
