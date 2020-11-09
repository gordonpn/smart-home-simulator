import React, { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import HouseStore from "@/src/stores/HouseStore";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function AutoMode() {
  const { isAutoModeOn, setAutoMode } = HouseStore();
  const [autoModeOn, setAutoModeOn] = useState(false);
  const { appendToLogs } = ConsoleStore();

  useEffect(() => {
    setAutoModeOn(isAutoModeOn);
  }, [isAutoModeOn]);

  const handleChange = (event) => {
    setAutoMode(event.target.checked);
    appendToLogs({
      timestamp: new Date(),
      message: `Auto mode has been set to ${
        event.target.checked ? "on" : "off"
      }`,
      module: "SHC",
    });
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={autoModeOn} onChange={handleChange} />}
          label="Auto Mode On"
        />
      </FormGroup>
    </>
  );
}
