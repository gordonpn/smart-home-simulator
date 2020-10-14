import React from "react";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import { processFile } from "../src/ReadFile";

export default function HouseView() {
  return (
    <React.Fragment>
      <Title>House View</Title>
      <input
        id="file-button"
        type="file"
        accept=".txt"
        style={{ display: "none" }}
        onChange={(e) => {
          processFile(e);
        }}
      />
      <label htmlFor="file-button">
        <Button variant="contained" color="primary" component="span">
          Upload house-layout file
        </Button>
      </label>
    </React.Fragment>
  );
}
