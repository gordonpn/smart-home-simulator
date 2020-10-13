import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({}));

export default function Console() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Output Console</Title>
    </React.Fragment>
  );
}
