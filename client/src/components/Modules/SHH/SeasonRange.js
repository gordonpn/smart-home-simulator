import React, { useEffect } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ConsoleStore from "@/src/stores/ConsoleStore";
import SHHStore from "@/src/stores/SHHStore";
import RunningStateStore from "@/src/stores/RunningStateStore";
import HouseStore from "@/src/stores/HouseStore";
import moment from "moment";

export default function SeasonRange() {
  const { appendToLogs } = ConsoleStore();
  const { setIsSummer, setIsWinter, seasons, setSeasons } = SHHStore();
  const { currentProfile } = HouseStore();
  const { currentTime } = RunningStateStore();

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const season = ["winter", "summer"];

  const handleStart = (event) => {
    const isWinter = event.target.name.includes("winter");
    if (isWinter) {
      setSeasons("winter", "start", event.target.value);
    } else {
      setSeasons("summer", "start", event.target.value);
    }
    appendToLogs({
      timestamp: new Date(),
      message: `Start month modified for ${isWinter ? "winter" : "summer"}`,
      module: "SHH",
    });
  };

  const handleEnd = (event) => {
    const isWinter = event.target.name.includes("winter");
    if (isWinter) {
      setSeasons("winter", "end", event.target.value);
    } else {
      setSeasons("summer", "end", event.target.value);
    }
    appendToLogs({
      timestamp: new Date(),
      message: `End month modified for ${isWinter ? "winter" : "summer"}`,
      module: "SHH",
    });
  };

  const handleTemp = (event) => {
    const isWinter = event.target.name.includes("winter");
    const newTemp = event.target.value;
    if (isWinter) {
      setSeasons("winter", "temperature", newTemp);
    } else {
      setSeasons("summer", "temperature", newTemp);
    }
    appendToLogs({
      timestamp: new Date(),
      message: `Default temperature modified for ${
        isWinter ? "winter" : "summer"
      } to ${newTemp}\u00b0C`,
      module: "SHH",
    });
  };

  useEffect(() => {
    const currentYear = currentTime.getFullYear();
    const currentYearMonth =
      currentYear + "-" + (parseInt(currentTime.getMonth()) + 1);
    const winter = seasons.get("winter");
    const summer = seasons.get("summer");
    const addOneYear = (summer, winter, isWinter, currentYear) => {
      if (isWinter) {
        return winter.start > winter.end ? currentYear + 1 : currentYear;
      }
      return summer.start > summer.end ? currentYear + 1 : currentYear;
    };
    const isSummer = moment(currentYearMonth).isBetween(
      moment(currentYear + "-" + summer.start, moment.HTML5_FMT.MONTH),
      moment(
        addOneYear(summer, winter, false, currentYear) + "-" + summer.end,
        moment.HTML5_FMT.MONTH
      ),
      undefined,
      "[]"
    );
    const isWinter = moment(currentYearMonth).isBetween(
      moment(currentYear + "-" + winter.start, moment.HTML5_FMT.MONTH),
      moment(
        addOneYear(summer, winter, true, currentYear) + "-" + winter.end,
        moment.HTML5_FMT.MONTH
      ),
      undefined,
      "[]"
    );
    setIsWinter(isWinter);
    setIsSummer(isSummer);
  }, [currentTime, seasons, setIsSummer, setIsWinter]);

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
