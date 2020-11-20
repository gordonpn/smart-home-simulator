import React from "react";
import Box from "@material-ui/core/Box";
import SeasonRange from "./SeasonRange"
export default function SHHTab() {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box p={0.5}>
            <SeasonRange/>

        </Box>
      </Box>
    </>
  );
}
