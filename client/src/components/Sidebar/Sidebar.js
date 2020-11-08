import Box from "@material-ui/core/Box";
import Toggle from "./Toggle";
import UserProfile from "./UserProfile";
import Location from "./Location";
import OutsideTemp from "./OutsideTemp";
import DateTime from "./DateTime";
import React from "react";
import AwayMode from "@/src/components/Sidebar/AwayMode";

export default function Sidebar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Toggle />
      <UserProfile />
      <Location />
      <OutsideTemp />
      <DateTime />
      <AwayMode />
    </Box>
  );
}
