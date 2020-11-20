import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SHSTab from "./SHSTab";
import SHCTab from "./SHCTab";
import RunningStateStore from "@/src/stores/RunningStateStore";
import SHPTab from "@/src/components/Modules/SHPTab";
import SHHTab from "@/src/components/Modules/SHHTab";

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
  const { currentState, activeTab, setActiveTab } = RunningStateStore();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (!currentState) {
      setActiveTab(0);
    }
  }, [currentState, setActiveTab]);

  return (
    <div className={classes.root}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        className={classes.tabBorder}
      >
        <Tab label="SHS" />
        <Tab label="SHC" disabled={!currentState} />
        <Tab label="SHP" disabled={!currentState} />
        <Tab label="SHH" disabled={!currentState} />
        <Tab label="+" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <SHSTab />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <SHCTab />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <SHPTab />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <SHHTab />
      </TabPanel>
      <TabPanel value={activeTab} index={4} />
    </div>
  );
}
