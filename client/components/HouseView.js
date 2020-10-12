import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Button from "@material-ui/core/Button";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({});

export default function HouseView() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>House View</Title>
      <Button variant="contained" color="primary">
        Upload house-layout file
      </Button>
    </React.Fragment>
  );
}
