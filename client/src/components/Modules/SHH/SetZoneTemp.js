import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import TemperatureStore from "@/src/stores/TemperatureStore";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import formStyles from "@/src/styles/formStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ConsoleStore from "@/src/stores/ConsoleStore";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

export default function SetZoneTemp() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const [zoneTemp, setZoneTemp] = useState("");
  const classes = formStyles();
  const { appendToLogs } = ConsoleStore();
  const { zones, zonesTemps, addZonesTemps } = TemperatureStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEdit = (e) => {
    e.preventDefault();
    setSelectedZone(e.currentTarget.value);
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
    addZonesTemps(selectedZone, zoneTemp);
    appendToLogs({
      timestamp: new Date(),
      message: `Temperature set for room ${selectedZone} to ${zoneTemp}\u00b0C`,
      module: "SHH",
    });
    setSelectedZone("");
    setZoneTemp("");
    setOpenEdit(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Set Zone Temperature
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
              Zone Temperatures
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Room</TableCell>
                    <TableCell align="right">Temperature</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(zones.keys()).map((zoneName) => (
                    <TableRow key={zoneName}>
                      <TableCell component="th" scope="row">
                        {zoneName}
                      </TableCell>
                      <TableCell align="right">
                        {zonesTemps.has(zoneName)
                          ? `${zonesTemps.get(zoneName)}\u00b0C`
                          : "Not Set"}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleOpenEdit}
                          value={zoneName}
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
              Change Zone Temperature
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
              {selectedZone}
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
                    return setZoneTemp(value);
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
