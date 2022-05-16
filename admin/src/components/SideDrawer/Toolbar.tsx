import React from "react";
import { Stack, styled, IconButton, Tooltip } from "@mui/material";
import {
  Group,
  Mail,
  Assignment,
  Settings,
  Add,
  VideoCall,
} from "@mui/icons-material";

const StyledButton = styled(IconButton)({
  "&": {
    transition: "all 0.2s ease-in-out",
  },
  "&:hover": {
    color: "#ef4848",
  },
});

const Toolbar = () => {
  return (
    <Stack spacing={1}>
      <Tooltip title="Users" placement="right">
        <StyledButton onClick={() => {}}>
          <Group />
        </StyledButton>
      </Tooltip>
      <Tooltip title="Mentee Applications" placement="right">
        <StyledButton onClick={() => {}}>
          <Assignment />
        </StyledButton>
      </Tooltip>
      <Tooltip title="Meetings" placement="right">
        <StyledButton onClick={() => {}}>
          <VideoCall />
        </StyledButton>
      </Tooltip>
      <Tooltip title="Emails" placement="right">
        <StyledButton onClick={() => {}}>
          <Mail />
        </StyledButton>
      </Tooltip>
      <Tooltip title="Settings" placement="right">
        <StyledButton onClick={() => {}}>
          <Settings />
        </StyledButton>
      </Tooltip>
      <StyledButton
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
      </StyledButton>
    </Stack>
  );
};

export default Toolbar;
