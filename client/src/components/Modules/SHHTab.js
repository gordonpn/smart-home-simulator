import React from "react";
import Box from "@material-ui/core/Box";
import ChangeRoomTemp from "@/src/components/Modules/ChangeRoomTemp";

export default function SHHTab() {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box p={0.5}>
          <ChangeRoomTemp />
        </Box>
      </Box>
    </>
  );
}
