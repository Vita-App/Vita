import React from "react";
import SideDrawer from "components/SideDrawer";
import { Box } from "@mui/material";

const App = () => {
  return (
    <>
      <SideDrawer />
      <Box
        sx={{
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "rgb(245, 245, 245)",
        }}
      ></Box>
    </>
  );
};

export default App;
