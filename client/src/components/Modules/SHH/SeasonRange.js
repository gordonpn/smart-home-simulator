import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import SHHStore from "@/src/stores/SHHStore";
import HouseStore from "@/src/stores/HouseStore";

export default function SeasonRange() {
  const { currentProfile } = HouseStore();
  const { seasons, setSeasons } = SHHStore();

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const season = ["winter", "summer"];

  const handleStart = (event) => {
    const isWinter = event.target.name.includes("winter");
    if (isWinter) {
      setSeasons("winter", "start", event.target.value);
    } else {
      setSeasons("summer", "start", event.target.value);
    }
  };
  const handleEnd = (event) => {
    const isWinter = event.target.name.includes("winter");
    if (isWinter) {
      setSeasons("winter", "end", event.target.value);
    } else {
      setSeasons("summer", "end", event.target.value);
    }
  };

  const handleTemp = (event) => {
    const isWinter = event.target.name.includes("winter");
    if (isWinter) {
      setSeasons("winter", "temperature", event.target.value);
    } else {
      setSeasons("summer", "temperature", event.target.value);
    }
  };

  return (
    <>
      {currentProfile?.permission.toLowerCase().includes("parent") && (
        <Grid container spacing={1}>
          {season.map((value) => (
            <Grid key={value} container item spacing={10}>
              <Grid item xs={1}>
                <h3>{value}</h3>
              </Grid>
              <Grid item xs={1}>
                <FormControl style={{ width: 110 }}>
                  <InputLabel id={value + "Start"}>Start Month</InputLabel>
                  <Select
                    labelId={value + "Start"}
                    value={
                      value === season[0] && seasons
                        ? seasons.get("winter").start
                        : seasons.get("summer").start
                    }
                    name={value === season[0] ? "winterStart" : "summerStart"}
                    onChange={handleStart}
                  >
                    {months.map((month) => (
                      <MenuItem key={value + "Start-" + month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <FormControl style={{ width: 110 }}>
                  <InputLabel id={value + "End"}>End Month</InputLabel>
                  <Select
                    labelId={value + "End"}
                    value={
                      value === season[0] && seasons
                        ? seasons.get("winter").end
                        : seasons.get("summer").end
                    }
                    name={value === season[0] ? "winterEnd" : "summerEnd"}
                    onChange={handleEnd}
                  >
                    {months.map((month) => (
                      <MenuItem key={value + "End-" + month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  label="Default Temperature"
                  type="number"
                  value={
                    value === season[0] && seasons
                      ? seasons.get("winter").temperature
                      : seasons.get("summer").temperature
                  }
                  name={value === season[0] ? "winterTemp" : "summerTemp"}
                  style={{ width: 110 }}
                  onInput={handleTemp}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
