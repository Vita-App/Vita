import React from "react";
import { Drawer, Avatar, Stack } from "@mui/material";
import Toolbar from "./Toolbar";
import { useLocation } from "react-router";

const drawerWidth = "60px";

const SideDrawer = () => {
  const { pathname } = useLocation();

  if (pathname === "/auth") return <></>;

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          borderRight: "0px",
        },
      }}
    >
      <Stack alignItems="center" mt={2} spacing={2}>
        <Avatar src="logo192.png" />
        <Toolbar />
      </Stack>
    </Drawer>
  );
};

export default SideDrawer;
