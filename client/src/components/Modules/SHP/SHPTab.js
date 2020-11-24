import AwayMode from "@/src/components/Modules/SHP/AwayMode";
import React from "react";
import Box from "@material-ui/core/Box";
import SetDelay from "@/src/components/Modules/SHP/SetDelay";
import LightSchedule from "@/src/components/Modules/SHP/LightSchedule";

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
        <Box p={0.5}>
          <LightSchedule />
        </Box>
      </Box>
    </>
  );
}
