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

export default function SwitchLights() {
  const classes = formStyles();
  const [open, setOpen] = React.useState(false);
  const {
    lights,
    setLights,
    currentHouse,
    setTriggerRender,
    triggerRender,
    currentProfile,
  } = HouseStore();
  const [lightListTemp, setLightListTemp] = useState(new Map());
  const [renderList, setRenderList] = useState(false);
  const [permission, setPermission] = useState("");
  const [userLocation, setUserLocation] = useState();
  const [lightChanges, setLightChanges] = useState(new Map());
  const { appendToLogs } = ConsoleStore();

  useEffect(() => {
    if (currentHouse !== undefined) {
      setLightListTemp(lights);
    }
  }, [currentHouse, renderList, lights]);

  useEffect(() => {
    if (currentProfile !== undefined) {
      setPermission(currentProfile.permission);
      setUserLocation(currentProfile.location);
    }
  }, [currentProfile]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    lightChanges.forEach(async (value, key) => {
      const requestBody = {
        lightName: key,
        roomName: modifyString(key),
        state: value.isOn,
      };

      await axios
        .put("/api/rooms/lights/open-light", requestBody)
        .then((response) => {
          if (response.status === 200) {
            console.warn("Turn on/off light successfully");
          }
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
      appendToLogs({
        timestamp: new Date(),
        message: `Light in room "${key}" is ${
          value.isOn ? "turned on" : "turned off"
        }`,
        module: "SHC",
      });
    });

    setLights(lightListTemp);
    setLightChanges(new Map());
    setTriggerRender(!triggerRender);
    setOpen(false);
  };

  const handleSelect = (event) => {
    const onOffState = event.target.checked;
    const lightMap = lightListTemp;

    lightMap.set(event.target.value, { isOn: onOffState });
    setLightListTemp(lightMap);
    lightChanges.set(event.target.value, { isOn: onOffState });
    setRenderList(!renderList);
  };

  const handleRestrictions = (lightLocation) => {
    return (
      permission.toLowerCase() !== "parent" &&
      (userLocation === "outside" ||
        userLocation !== modifyString(lightLocation))
    );
  };

  const modifyString = (string) => {
    return string.substr(0, string.indexOf("-l"));
  };

  return (
    <>
      <Button
        color="primary"
        size="large"
        variant="outlined"
        onClick={handleOpen}
      >
        Switch Lights
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
            <h2 id="transition-modal-title">Select lights to turn on/off</h2>
            {permission.toLowerCase() === "stranger" ? (
              <div>
                <h3>Your permission level restricts this functionality</h3>
              </div>
            ) : (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                {permission.toLowerCase() !== "parent" ? (
                  <div>
                    <h3>
                      You can only switch on/off lights based on your current
                      location
                    </h3>
                  </div>
                ) : null}
                <List>
                  {currentHouse && currentHouse.houseCoor.lights.length
                    ? currentHouse.houseCoor.lights.map((light) => (
                        <ListItem key={light.name} value={light.name}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              value={light.name}
                              onChange={handleSelect}
                              checked={
                                lightListTemp.get(light.name) !== undefined
                                  ? lightListTemp.get(light.name).isOn
                                  : false
                              }
                              disabled={handleRestrictions(light.name)}
                            />
                          </ListItemIcon>
                          <ListItemText primary={light.name} />
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
