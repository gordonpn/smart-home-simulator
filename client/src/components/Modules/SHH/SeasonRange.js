import React, { useState } from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
} from "@material-ui/core";

import TemperatureStore from "@/src/stores/TemperatureStore";
export default function SeasonRange() {
  const [winterStart, setWinterStart] = useState("");
  const [winterEnd, setWinterEnd] = useState("");
  const [summerStart, setSummerStart] = useState("");
  const [summerEnd, setSummerEnd] = useState("");
  const season = ["winter", "summer"];
  const { setSeasons } = TemperatureStore();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleStart = (event) => {
    const isWinter = event.target.name.includes("winter");
    if (isWinter) {
      setSeasons("winter", "start", event.target.value);
      setWinterStart(event.target.value);
    } else {
      setSeasons("summer", "start", event.target.value);
      setSummerStart(event.target.value);
    }
  };
  const handleEnd = (event) => {
    const isWinter = event.target.name.includes("winter");
    if (isWinter) {
      setSeasons("winter", "end", event.target.value);
      setWinterEnd(event.target.value);
    } else {
      setSeasons("summer", "end", event.target.value);
      setSummerEnd(event.target.value);
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        {season.map((value) => (
          <Grid key={value} container item spacing={3}>
            <Grid item xs={1}>
              <h3>{value}</h3>
            </Grid>
            <Grid item xs={1}>
              <FormControl style={{ width: 110 }}>
                <InputLabel id={value + "Start"}>Start Month</InputLabel>
                <Select
                  labelId={value + "Start"}
                  value={value === season[0] ? winterStart : summerStart}
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
                  value={value === season[0] ? winterEnd : summerEnd}
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
          </Grid>
        ))}
      </Grid>
    </>
  );
}
