import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  secondaryBar: {
    zIndex: 0,
  },
});

export default function Modules() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="SHS" />
          <Tab textColor="inherit" label="SHC" />
          <Tab textColor="inherit" label="SHP" />
          <Tab textColor="inherit" label="SHH" />
          <Tab textColor="inherit" label="+" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}
