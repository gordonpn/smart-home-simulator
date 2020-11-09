import AwayMode from "@/src/components/Modules/AwayMode";
import React from "react";
import Box from "@material-ui/core/Box";
import SetDelay from "@/src/components/Modules/SetDelay";

export default function SHPTab() {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box p={0.5}>
          <AwayMode />
        </Box>
        <Box p={0.5}>
          <SetDelay />
        </Box>
      </Box>
    </>
  );
}
