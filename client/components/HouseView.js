import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({});

export default function HouseView() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>House View</Title>
    </React.Fragment>
  );
}
