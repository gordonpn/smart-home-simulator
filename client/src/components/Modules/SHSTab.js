import { Typography } from "@material-ui/core";
import React from "react";
import AddUser from "./AddUser";
import Box from "@material-ui/core/Box";
import RemoveUser from "./RemoveUser";
import EditUser from "./EditUser";

export default function SHSTab() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Profiles
      </Typography>
      <Box display="flex" flexDirection="row">
        <Box p={0.5}>
          <AddUser />
        </Box>
        <Box p={0.5}>
          <RemoveUser />
        </Box>
        <Box p={0.5}>
          <EditUser />
        </Box>
      </Box>
    </>
  );
}