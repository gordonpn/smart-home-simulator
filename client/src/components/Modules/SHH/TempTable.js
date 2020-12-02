import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React, { useEffect, useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import SHHStore from "@/src/stores/SHHStore";
import RunningStateStore from "@/src/stores/RunningStateStore";
import HouseStore from "@/src/stores/HouseStore";
import Button from "@material-ui/core/Button";

export default function TempTable() {
  const {
    actualTemps,
    invertedIndexZones,
    roomsTemps,
    seasons,
    setActualTemps,
  } = SHHStore();
  const { currentState, currentTime, timeSpeed } = RunningStateStore();
  const { currentTemperature } = HouseStore();
  const [open, setOpen] = useState(false);

  const round = (value, decimals) => {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  };

  const isMorning = currentTime.getHours() > 7 && currentTime.getHours() < 12;
  const isDaytime =
    currentTime.getHours() >= 12 && currentTime.getHours() <= 17;
  const isSummer =
    currentTime.getMonth() >= seasons.get("summer").start - 1 &&
    currentTime.getMonth() <= seasons.get("summer").end - 1;

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!currentState) {
      return;
    }
    const interval = setInterval(() => {
      for (const roomName of Array.from(actualTemps.keys())) {
        let desiredTemp = 0;

        if (roomsTemps.get(roomName) !== null) {
          desiredTemp = roomsTemps.get(roomName);
        } else if (invertedIndexZones.get(roomName) !== undefined) {
          if (isMorning) {
            desiredTemp = invertedIndexZones.get(roomName).get("morning");
          } else if (isDaytime) {
            desiredTemp = invertedIndexZones.get(roomName).get("daytime");
          } else {
            desiredTemp = invertedIndexZones.get(roomName).get("night");
          }
        } else {
          if (isSummer) {
            desiredTemp = seasons.get("summer").temperature;
          } else {
            desiredTemp = seasons.get("winter").temperature;
          }
        }

        const hvacShouldTurnOn =
          Math.abs(actualTemps.get(roomName) - desiredTemp) > 0.25;

        let tempChange = 0;

        if (hvacShouldTurnOn) {
          tempChange = 0.1;
        } else {
          tempChange = 0.05;
        }

        if (
          (!hvacShouldTurnOn &&
            currentTemperature < actualTemps.get(roomName)) ||
          (hvacShouldTurnOn && desiredTemp < actualTemps.get(roomName))
        ) {
          tempChange = tempChange * -1;
        }

        setActualTemps(
          roomName,
          round(actualTemps.get(roomName) + tempChange, 2)
        );
      }
    }, 1000 / timeSpeed);

    return () => clearInterval(interval);
  }, [
    actualTemps,
    currentState,
    currentTemperature,
    invertedIndexZones,
    isDaytime,
    isMorning,
    isSummer,
    roomsTemps,
    seasons,
    setActualTemps,
    timeSpeed,
  ]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Toggle View Room Temperatures
      </Button>
      {open && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room</TableCell>
                <TableCell>Current Temperature</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(actualTemps.keys()).map((roomName) => (
                <TableRow key={roomName}>
                  <TableCell> {roomName}</TableCell>
                  <TableCell>{actualTemps.get(roomName)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
