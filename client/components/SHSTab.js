import { Typography } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import AddUser from "./AddUser";

export default function SHSTab() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Profiles
      </Typography>
      <AddUser />
      <Button variant="outlined" color="primary">
        Remove
      </Button>
      <Button variant="outlined" color="primary">
        Edit
      </Button>
    </>
  );
}
