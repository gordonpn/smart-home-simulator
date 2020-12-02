import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import ConsoleStore from "@/src/stores/ConsoleStore";
import HouseStore from "@/src/stores/HouseStore";

export default function CreateZone() {
  const [availableZones, setAvailableRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [zoneChanged, setZoneChanged] = useState(false);
  const classes = formStyles();
  const { appendToLogs } = ConsoleStore();
  const { currentProfile } = HouseStore();
  const { zones, deleteZone, roomsTemps, createZone } = SHHStore();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleOpen = () => {
    if (!currentProfile.permission.toLowerCase().includes("parent")) {
      setOpenError(true);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    deleteZone(value);
    appendToLogs({
      timestamp: new Date(),
      message: `Deleted zone ${value}`,
      module: "SHH",
    });
    setZoneChanged(!zoneChanged);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedRooms(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedRooms.length < 1) {
      return;
    }
    createZone(selectedRooms);
    setSelectedRooms([]);
    appendToLogs({
      timestamp: new Date(),
      message: `Created a new zone with ${selectedRooms.join(", ")}`,
      module: "SHH",
    });
    setZoneChanged(!zoneChanged);
  };

  useEffect(() => {
    const getAvailableRooms = () => {
      const usedRooms = [];
      const allRooms = [];
      Array.from(zones.values()).forEach((rooms) => {
        usedRooms.push(...rooms);
      });
      Array.from(roomsTemps.keys()).forEach((roomName) => {
        allRooms.push(roomName);
      });
      const difference = allRooms.filter(
        (room) => usedRooms.indexOf(room) === -1
      );
      setAvailableRooms(difference);
    };
    getAvailableRooms();
  }, [roomsTemps, zones, zoneChanged]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Create & Delete Zones
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
              Zones
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
              Current Zones
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Zone</TableCell>
                    <TableCell>Rooms</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(zones.keys()).map((zoneName) => (
                    <TableRow key={zoneName}>
                      <TableCell component="th" scope="row">
                        {zoneName}
                      </TableCell>
                      <TableCell>{zones.get(zoneName).join(", ")}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleDelete}
                          value={zoneName}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="center"
              style={{ marginTop: "1vh" }}
            >
              Create New Zone
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel>Zones</InputLabel>
              <Select
                multiple
                value={selectedRooms}
                onChange={handleChange}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {availableZones.map((roomName) => (
                  <MenuItem key={roomName} value={roomName}>
                    {roomName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box p={1} display="flex" justifyContent="flex-end">
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Create Zone
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
      <Modal
        className={classes.modal}
        open={openError}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openError}>
          <div className={classes.paper}>
            <Typography variant="h6" gutterBottom align="center">
              You must be a parent to modify these settings
            </Typography>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
