import React, { Fragment } from "react";
import Title from "./Title";
import ConsoleStore from "@/src/stores/ConsoleStore";
import Typography from "@material-ui/core/Typography";
import RunningStateStore from "@/src/stores/RunningStateStore";

export default function Console() {
  const { logsSHS, logsSHC, logsSHP } = ConsoleStore();
  const { activeTab } = RunningStateStore();

  return (
    <Fragment>
      <Title>Output Console</Title>
      {activeTab === 0 &&
        logsSHS.map((log) => (
          <Typography variant="body1" key={log}>
            {log}
          </Typography>
        ))}
      {activeTab === 1 &&
        logsSHC.map((log) => (
          <Typography variant="body1" key={log}>
            {log}
          </Typography>
        ))}
      {activeTab === 2 &&
        logsSHP.map((log) => (
          <Typography variant="body1" key={log}>
            {log}
          </Typography>
        ))}
    </Fragment>
  );
}
