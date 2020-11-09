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

export default function BlockWindow() {
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const {
    windows,
    setWindows,
    currentHouse,
    setTriggerRender,
    triggerRender,
  } = HouseStore();
  const [windowListTemp, setWindowListTemp] = useState(new Map());
  const [renderList, setRenderList] = useState(false);
  const [windowChanges, setWindowChanges] = useState(new Map());
  const { appendToLogs } = ConsoleStore();

  useEffect(() => {
    if (currentHouse !== undefined) {
      setWindowListTemp(windows);
    }
  }, [currentHouse, renderList, windows]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    windowChanges.forEach(async (value, key) => {
      const requestBody = {
        windowName: key,
        roomName: modifyString(key),
        state: value.blocked,
      };
      appendToLogs({
        timestamp: new Date(),
        message: `Window in room "${key}" is ${
          value ? "blocked" : "unblocked"
        }`,
        module: "SHS",
      });
      await axios.put("/api/rooms/windows/block-window", requestBody);
    });
    setWindows(windowListTemp);
    setWindowChanges(new Map());
    setTriggerRender(!triggerRender);
    setOpen(false);
  };

  const handleSelect = (event) => {
    const blockState = event.target.checked;
    const winMap = windowListTemp;
    const previousState = windowListTemp.get(event.target.value);
    winMap.set(event.target.value, { ...previousState, blocked: blockState });
    setWindowListTemp(winMap);
    windowChanges.set(event.target.value, {
      ...previousState,
      blocked: blockState,
    });
    setRenderList(!renderList);
  };

  const modifyString = (string) => {
    return string.substr(0, string.indexOf("-w"));
  };

  return (
    <>
      <Button
        color="primary"
        size="large"
        variant="outlined"
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
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <List>
                {currentHouse && currentHouse.houseCoor.windows.length
                  ? currentHouse.houseCoor.windows.map((window) => (
                      <ListItem key={window.name} value={window.name}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            value={window.name}
                            onChange={handleSelect}
                            checked={
                              windowListTemp.get(window.name) !== undefined
                                ? windowListTemp.get(window.name).blocked
                                : false
                            }
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
