import { Typography } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import AddUser from "./AddUser";
import Box from "@material-ui/core/Box";

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
          <Button variant="outlined" color="primary">
            Remove
          </Button>
        </Box>
        <Box p={0.5}>
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        </Box>
      </Box>
    </>
  );
}
