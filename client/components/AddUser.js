import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import RunningStateStore from "../stores/RunningStateStore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

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

export default function AddUser() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { currentState } = RunningStateStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");
    setOpen(false);
  };

  return (
    <>
      {currentState ? (
        <Button variant="outlined" disabled>
          Add
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Add
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
              Add A Profile
            </Typography>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Box p={1}>
                <TextField label="Name" />
              </Box>
              <Box p={1}>
                <TextField label="Location" />
              </Box>
              <Box p={1}>
                <TextField label="Role" />
              </Box>
              <Box p={1}>
                <TextField label="Permission" />
              </Box>
              <Box p={1}>
                <Button variant="outlined" color="primary" type="submit">
                  Create
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
