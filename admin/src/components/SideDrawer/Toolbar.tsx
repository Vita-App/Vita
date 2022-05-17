import React from "react";
import { Stack, IconButton } from "@mui/material";
import { Group, Mail, Assignment, Add, VideoCall } from "@mui/icons-material";
import ToolbarLink from "./ToolbarLink";

const Toolbar = () => {
  return (
    <Stack spacing={1}>
      <ToolbarLink icon={<Group />} tooltip="Users" to="/" />
      <ToolbarLink
        icon={<Assignment />}
        tooltip="Mentor Applications"
        to="/applications"
      />
      <ToolbarLink icon={<VideoCall />} tooltip="Meetings" to="/meetings" />
      <ToolbarLink icon={<Mail />} tooltip="Emails" to="/emails" />
      <IconButton
        onClick={() => {}}
        sx={{
          backgroundColor: "#ef4848",
          color: "white",
          "&:hover": {
            bgcolor: "#e03030",
            color: "white",
          },
        }}
      >
        <Add />
      </IconButton>
    </Stack>
  );
};

export default Toolbar;
