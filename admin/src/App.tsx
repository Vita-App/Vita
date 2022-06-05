import React from "react";
import { Routes, Route } from "react-router";
import { Box } from "@mui/material";
import SideDrawer from "components/SideDrawer";
import UsersPage from "pages/Users";
import ApplicationsPage from "pages/Applications";
import MeetingsPage from "pages/Meetings";
import EmailsPage from "pages/Emails";
import SettingsPage from "pages/Settings";
import UserPage from "pages/User";
import ApplicationPage from "pages/Application";
import AuthPage from "pages/Auth";

const App = () => {
  return (
    <>
      <SideDrawer />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "rgb(245, 245, 245)",
          py: 3,
        }}
      >
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/application/:id" element={<ApplicationPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/emails" element={<EmailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
