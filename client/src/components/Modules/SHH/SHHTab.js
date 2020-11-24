import React from "react";
import Box from "@material-ui/core/Box";
import ChangeRoomTemp from "@/src/components/Modules/SHH/ChangeRoomTemp";
import CreateZone from "@/src/components/Modules/SHH/CreateZone";
import SetZoneTemp from "@/src/components/Modules/SHH/SetZoneTemp";

export default function SHHTab() {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box p={0.5}>
          <ChangeRoomTemp />
        </Box>
        <Box p={0.5}>
          <CreateZone />
        </Box>
        <Box p={0.5}>
          <SetZoneTemp />
        </Box>
      </Box>
    </>
  );
}
