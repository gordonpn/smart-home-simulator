import React, { Fragment } from "react";
import Title from "./Title";
import ConsoleStore from "@/src/stores/ConsoleStore";
import Typography from "@material-ui/core/Typography";

export default function Console() {
  const { logs } = ConsoleStore();

  return (
    <Fragment>
      <Title>Output Console</Title>
      {logs.map((log) => (
        <Typography variant="body1" key={log}>
          {log.timestamp.toLocaleString()}
          &emsp;
          {log.module}
          &emsp;
          {log.message}
        </Typography>
      ))}
    </Fragment>
  );
}
