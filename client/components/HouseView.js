import React from "react";
import Title from "./Title";
import Button from "@material-ui/core/Button";

export default function HouseView() {
  return (
    <React.Fragment>
      <Title>House View</Title>
      <Button variant="contained" color="primary">
        Upload house-layout file
      </Button>
    </React.Fragment>
  );
}
