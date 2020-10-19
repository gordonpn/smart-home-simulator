import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Box, Fade, Button, List, ListItem, ListItemText, ListItemIcon, Checkbox } from "@material-ui/core";
import HouseStore from "../stores/HouseStore"

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

export default function BlockWindow() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { windows, setWindows, currentHouse } = HouseStore();
  const [tempWindows, setTempWindows] = useState(new Map())
  
  useEffect(() => {
    if (currentHouse !== undefined) {
      const windowsMap = new Map()
      const windowsArr = currentHouse.houseCoor.windows
      windowsArr.forEach((window)=>{
        windowsMap.set(window.name,window)
      })

      setWindows(windowsMap)
      // console.log(currentHouse.houseCoor.windows)
      // const windowsJSON = currentHouse.houseCoor.windows
    }


  }, [currentHouse])
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit =  (event) =>{
    console.log("hey")

  }
 
  const handleSelect = (event) =>{
    console.log(event.target.checked)
    console.log(event.target.value)
    windows.get(event.target.value)

    const selectedWin = tempWindows
    // selectedWin.set(event.target.value,{})
    setTempWindows()
    

  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleOpen}
      >
        Block Windows
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
            <h2 id="transition-modal-title">Select Windows to block</h2>
            <form onSubmit={handleSubmit}>
              <List>
                {currentHouse && currentHouse.houseCoor.windows.length ?
                  currentHouse.houseCoor.windows.map((window) => (
                    <ListItem key={window.name} value={window.name}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          value={window.name}
                          onChange={handleSelect}
                        />
                      </ListItemIcon>
                      <ListItemText primary={window.name} />
                    </ListItem>
                  ))
                  : false}
              </List>
              <Box p={1} display="flex" justifyContent="flex-end">
                <Button variant="outlined" color="primary" type="submit">
                  Save
                  </Button>
              </Box>

            </form>

          </div>
        </Fade>
      </Modal>
    </>
  );
}
