import React from "react";
import BlockWindow from "./BlockWindow";
import MoveUser from "./MoveUser";
import Box from "@material-ui/core/Box";

export default function SHCTab() {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box p={0.5}>
          <MoveUser />
        </Box>
        <Box p={0.5}>
          <BlockWindow />
        </Box>
      </Box>
    </>
  );
}
