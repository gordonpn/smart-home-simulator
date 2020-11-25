import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import formStyles from "@/src/styles/formStyles";
import SHHStore from "@/src/stores/SHHStore";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import ConsoleStore from "@/src/stores/ConsoleStore";

export default function ChangeRoomTemp() {
  const [invertedIndexZones, setInvertedIndexZones] = useState(new Map());
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [roomTemp, setRoomTemp] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [tempChange, setTempChange] = useState(false);
  const classes = formStyles();
  const { appendToLogs } = ConsoleStore();
  const { roomsTemps, addRoomsTemps, zones, zonesTemps } = SHHStore();

  const handleOpen = () => {
    setOpen(true);
    setTempChange(!tempChange);
  };

  const handleOpenEdit = (e) => {
    e.preventDefault();
    setSelectedRoom(e.currentTarget.value);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRoomsTemps(selectedRoom, roomTemp);
    appendToLogs({
      timestamp: new Date(),
      message: `Temperature set for room ${selectedRoom} to ${roomTemp}\u00b0C`,
      module: "SHH",
    });
    setSelectedRoom("");
    setRoomTemp("");
    setOpenEdit(false);
    setTempChange(!tempChange);
  };

  useEffect(() => {
    const loadTemps = () => {
      Array.from(zones.keys()).forEach((zoneName) => {
        const temp = zonesTemps.get(zoneName);
        zones.get(zoneName).forEach((room) => {
          const thisInvertedIndex = invertedIndexZones;
          thisInvertedIndex.set(room, temp);
          setInvertedIndexZones(thisInvertedIndex);
        });
      });
    };
    loadTemps();
  }, [invertedIndexZones, zones, zonesTemps, tempChange]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        View and Change Room Temperature
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
            <Typography variant="h6" gutterBottom align="center">
              View and Change Room Temperature
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Room</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(roomsTemps.keys()).map((roomName) => (
                    <TableRow key={roomName}>
                      <TableCell component="th" scope="row">
                        {roomName}
                      </TableCell>
                      <TableCell>
                        {roomsTemps.get(roomName) !== null
                          ? invertedIndexZones.has(roomName)
                            ? `Overridden with ${roomsTemps.get(
                                roomName
                              )}\u00b0C`
                            : `Temperature set to ${roomsTemps.get(
                                roomName
                              )}\u00b0C`
                          : invertedIndexZones.get(roomName) !== undefined
                          ? Array.from(
                              invertedIndexZones.get(roomName).keys()
                            ).map((thisPeriod) => (
                              <Typography key={thisPeriod}>
                                {thisPeriod}:{" "}
                                {invertedIndexZones
                                  .get(roomName)
                                  .get(thisPeriod)}
                                {"\u00b0C"}
                              </Typography>
                            ))
                          : "Not set"}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleOpenEdit}
                          value={roomName}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
      <Modal
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEdit}>
          <div className={classes.paper}>
            <Typography variant="h6" gutterBottom align="center">
              Change Temperature
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
              {selectedRoom}
            </Typography>
            <Box p={1}>
              <form
                className={classes.container}
                noValidate
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Temperature"
                  type="number"
                  onInput={(e) => {
                    const { value } = e.target;
                    return setRoomTemp(value);
                  }}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Box p={1}>
                  <Button variant="outlined" color="primary" type="submit">
                    Set
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
