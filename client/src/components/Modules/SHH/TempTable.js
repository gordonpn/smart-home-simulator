import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import TableHead from "@material-ui/core/TableHead";
import SHHStore from "@/src/stores/SHHStore";

export default function TempTable() {
  const { actualTemps } = SHHStore();

  return (
    <>
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
    </>
  );
}
