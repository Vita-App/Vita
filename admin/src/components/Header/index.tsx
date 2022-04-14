import React from "react";
import { AppBar, Toolbar, IconButton, Switch } from "@mui/material";

interface IProps {
  onThemeChange: () => void;
}

const Header: React.FC<IProps> = ({ onThemeChange }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton onClick={() => {}} color="inherit">
          Vita
        </IconButton>
        <Switch></Switch>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
