import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@material-ui/core";
import HouseStore from "@/src/stores/HouseStore";
import formStyles from "@/src/styles/formStyles";
import axios from "axios";

export default function OpenCloseDoor() {
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const {
    doors,
    setDoors,
    currentHouse,
    setTriggerRender,
    triggerRender,
  } = HouseStore();
  const [doorListTemp, setDoorListTemp] = useState(new Map());
  const [renderList, setRenderList] = useState(false);
  const [doorChanges, setDoorChanges] = useState(new Map());

  useEffect(() => {
    if (currentHouse !== undefined) {
      setDoorListTemp(doors);
    }
  }, [currentHouse, renderList, doors]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    doorChanges.forEach(async (value, key) => {
      const requestBody = {
        doorName: key,
        roomName: modifyString(key),
        state: value.open,
      };

      await axios
        .put("/api/rooms/doors/open-door", requestBody)
        .then((response) => {
          if (response.status === 200) {
            console.warn("Open/close successfully");
          }
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
    });
    setDoors(doorListTemp);
    setDoorChanges(new Map());
    setTriggerRender(!triggerRender);
    setOpen(false);
  };

  const handleSelect = (event) => {
    const openState = event.target.checked;
    const doorMap = doorListTemp;
    const previousState = doorListTemp.get(event.target.value);
    doorMap.set(event.target.value, { ...previousState, open: openState });
    setDoorListTemp(doorMap);
    doorChanges.set(event.target.value, { ...previousState, open: openState });
    setRenderList(!renderList);
  };

  const handleRestrictions = (doorName) => {
    if (doors) {
      return doors.get(doorName).locked;
    }
  };

  const modifyString = (string) => {
    return string.substr(0, string.indexOf("-d"));
  };

  return (
    <>
      <Button
        color="primary"
        size="large"
        variant="outlined"
        onClick={handleOpen}
      >
        Open & Close Doors
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
            <h2 id="transition-modal-title">Select doors to open</h2>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <div>
                <h3>Note: Locked doors cannot be opened!</h3>
              </div>
              <List>
                {currentHouse && currentHouse.houseCoor.doors.length
                  ? currentHouse.houseCoor.doors.map((door) => (
                      <ListItem key={door.name} value={door.name}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            value={door.name}
                            onChange={handleSelect}
                            checked={
                              doorListTemp.get(door.name) !== undefined
                                ? doorListTemp.get(door.name).open
                                : false
                            }
                            disabled={handleRestrictions(door.name)}
                          />
                        </ListItemIcon>
                        <ListItemText primary={door.name} />
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
