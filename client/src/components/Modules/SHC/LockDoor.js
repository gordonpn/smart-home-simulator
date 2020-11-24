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
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function LockDoor() {
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
  const { appendToLogs } = ConsoleStore();

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
        state: value.locked,
      };

      await axios
        .put("/api/rooms/doors/lock-door", requestBody)
        .then((response) => {
          if (response.status === 200) {
            console.warn("Open/close successfully");
          }
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
      appendToLogs({
        timestamp: new Date(),
        message: `Door in room "${key}" is ${
          value.locked ? "locked" : "unlocked"
        }`,
        module: "SHC",
      });
    });
    setDoors(doorListTemp);
    setDoorChanges(new Map());
    setTriggerRender(!triggerRender);
    setOpen(false);
  };

  const handleSelect = (event) => {
    const lockState = event.target.checked;
    const doorMap = doorListTemp;
    const previousState = doorListTemp.get(event.target.value);
    doorMap.set(event.target.value, { ...previousState, locked: lockState });
    setDoorListTemp(doorMap);
    doorChanges.set(event.target.value, {
      ...previousState,
      locked: lockState,
    });
    setRenderList(!renderList);
  };

  const handleRestrictions = (doorName) => {
    if (doors) {
      return doors.get(doorName).open;
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
        Lock Doors
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
            <h2 id="transition-modal-title">Select doors to lock</h2>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <div>
                <h3>Note: Opened doors cannot be locked!</h3>
              </div>
              <List>
                {currentHouse && currentHouse.houseCoor.doors.length
                  ? currentHouse.houseCoor.doors.map((door) => {
                      const doorName = door.name;
                      if (
                        doorName.toLowerCase().includes("garage") ||
                        doorName.toLowerCase().includes("kitchen") ||
                        doorName.toLowerCase().includes("living")
                      ) {
                        return (
                          <ListItem key={door.name} value={door.name}>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                value={door.name}
                                onChange={handleSelect}
                                checked={
                                  doorListTemp.get(door.name) !== undefined
                                    ? doorListTemp.get(door.name).locked
                                    : false
                                }
                                disabled={handleRestrictions(door.name)}
                              />
                            </ListItemIcon>
                            <ListItemText primary={door.name} />
                          </ListItem>
                        );
                      }
                    })
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
