import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SHSTab from "./SHSTab";
import SHCTab from "./SHCTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  tabBorder: {
    borderBottom: "1px solid #c4c4c4",
  },
}));

export default function Modules() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} className={classes.tabBorder}>
        <Tab label="SHS" />
        <Tab label="SHC" />
        <Tab label="SHH" />
        <Tab label="+" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SHSTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SHCTab />
      </TabPanel>
      <TabPanel value={value} index={2} />
      <TabPanel value={value} index={3} />
    </div>
  );
}