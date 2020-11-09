import React from "react";
import BlockWindow from "./BlockWindow";
import MoveUser from "./MoveUser";
import Box from "@material-ui/core/Box";
import SwitchLights from "./SwitchLights";
import OpenCloseDoor from "./OpenCloseDoor";
import OpenCloseWindows from "./OpenCloseWindows";
import LockDoor from "./LockDoor";
import AutoMode from "./AutoMode";
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
        <Box p={0.5}>
          <OpenCloseWindows />
        </Box>
        <Box p={0.5}>
          <SwitchLights />
        </Box>
        <Box p={0.5}>
          <OpenCloseDoor />
        </Box>
        <Box p={0.5}>
          <LockDoor />
        </Box>
        <Box p={0.5}>
          <AutoMode />
        </Box>
      </Box>
    </>
  );
}
