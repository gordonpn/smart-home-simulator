import React, { useEffect, useState } from "react";
import { Switch, FormGroup, FormControlLabel } from "@material-ui/core";
import HouseStore from "@/src/stores/HouseStore";
export default function AutoMode() {
  const { isAutoModeOn, setAutoMode } = HouseStore();
  const [autoModeOn, setAutoModeOn] = useState(false);

  useEffect(() => {
    setAutoModeOn(isAutoModeOn);
  }, [isAutoModeOn]);
  const handleChange = (event) => {
    setAutoMode(event.target.checked);
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
