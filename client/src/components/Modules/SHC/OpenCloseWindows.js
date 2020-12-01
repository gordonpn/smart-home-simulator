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
import SHHStore from "@/src/stores/SHHStore";
import SHPStore from "@/src/stores/SHPStore";

export default function OpenCloseWindows() {
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const {
    windows,
    setWindows,
    currentHouse,
    setTriggerRender,
    triggerRender,
    currentProfile,
    currentTemperature
  } = HouseStore();
  const [windowListTemp, setWindowListTemp] = useState(new Map());
  const [renderList, setRenderList] = useState(false);
  const [permission, setPermission] = useState("");
  const [userLocation, setUserLocation] = useState();
  const [windowChanges, setWindowChanges] = useState(new Map());
  const { appendToLogs } = ConsoleStore();
  const { isWinter, isSummer,setIsSummer, setIsWinter, seasons, roomsTemps } = SHHStore();
  const {awayMode} = SHPStore();

  useEffect(() => {
    if (currentHouse !== undefined) {
      setWindowListTemp(windows);
    }
  }, [currentHouse, renderList, windows]);

  useEffect(() => {
    if (currentProfile !== undefined) {
      setPermission(currentProfile.permission);
      setUserLocation(currentProfile.location);
    }
  }, [currentProfile]);

  // useEffect(()=>{
  //   console.log("hey")
  //   if(isSummer && !awayMode){
  //     console.log("inside")
  //     const tempWindows = windows
  //     let aWindowBlocked =false
  //     roomsTemps.forEach((value,key)=>{
  //       if(value>currentTemperature){
  //         const windowName = key+"-w1"
  //         console.log(windowName)
  //         const currentWindowState = windows.get(windowName)
  //         console.log(windows)
  //         console.log(currentWindowState)
  //         if(currentWindowState && !currentWindowState.blocked){
  //           tempWindows.set(windowName,{...currentWindowState, isOpen: true})
  //         }
  //         else
  //         {
  //           aWindowBlocked = true
  //         }
  //       }
  //     })
  //     console.log(tempWindows)
  //     !aWindowBlocked? setWindows(tempWindows): null
  //     setTriggerRender(!triggerRender)
  //   }
    

  // },[currentTemperature, isSummer, roomsTemps, windows])

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
        state: value.isOpen,
      };

      const res = await axios.put(
        "/api/rooms/windows/open-window",
        requestBody
      );

      appendToLogs({
        timestamp: new Date(),
        message: `Window in room "${key}" is ${
          value.isOpen ? "opened" : "closed"
        }`,
        module: "SHC",
      });

      if (res.status === 200) {
        console.warn("block/unblock window successfully");
      }
    });
    setWindows(windowListTemp);
    setWindowChanges(new Map());
    setTriggerRender(!triggerRender);
    setOpen(false);
  };

  const handleSelect = (event) => {
    const openState = event.target.checked;
    const winMap = windowListTemp;
    const previousState = windowListTemp.get(event.target.value);
    winMap.set(event.target.value, { ...previousState, isOpen: openState });
    setWindowListTemp(winMap);
    windowChanges.set(event.target.value, {
      ...previousState,
      isOpen: openState,
    });
    setRenderList(!renderList);
  };

  const handleRestrictions = (windowName) => {
    return (
      (permission.toLowerCase() !== "parent" &&
        (userLocation === "outside" ||
          userLocation !== modifyString(windowName))) ||
      windowListTemp.get(windowName).blocked
    );
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
        Open & Close Windows
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
            <h2 id="transition-modal-title">Select Windows to Open</h2>
            {permission.toLowerCase() === "stranger" ? (
              <div>
                <h3>Your permission level restricts this functionality</h3>
              </div>
            ) : (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                {permission.toLowerCase() !== "parent" ? (
                  <div>
                    <h3>
                      You can only open and close windows based on your current
                      location.
                    </h3>
                  </div>
                ) : null}
                <div>
                  <h3>Note: Blocked windows cannot be opened or closed!</h3>
                </div>
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
                                  ? windowListTemp.get(window.name).isOpen
                                  : false
                              }
                              disabled={handleRestrictions(window.name)}
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
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
