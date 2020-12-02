import React from "react";
import Box from "@material-ui/core/Box";
import ChangeRoomTemp from "@/src/components/Modules/SHH/ChangeRoomTemp";
import CreateZone from "@/src/components/Modules/SHH/CreateZone";
import SeasonRange from "./SeasonRange";
import SetZoneTemp from "@/src/components/Modules/SHH/SetZoneTemp";
import TempTable from "@/src/components/Modules/SHH/TempTable";

export default function SHHTab() {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box p={0.5}>
          <SeasonRange />
        </Box>
        <Box p={0.5}>
          <ChangeRoomTemp />
        </Box>
        <Box p={0.5}>
          <CreateZone />
        </Box>
        <Box p={0.5}>
          <SetZoneTemp />
        </Box>
        <Box p={0.5}>
          <TempTable />
        </Box>
      </Box>
    </>
  );
}
