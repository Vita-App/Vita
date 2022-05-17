import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Tooltip, IconButton, styled } from "@mui/material";

interface Props {
  icon: React.ReactElement;
  tooltip: string;
  to: string;
}

const StyledButton = styled(IconButton)({
  "&": {
    transition: "all 0.2s ease-in-out",
  },
  "&:hover": {
    color: "#ef4848",
  },
});

const ToolbarLink: React.FC<Props> = ({ icon, tooltip, to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Tooltip title={tooltip} placement="right" arrow>
      <StyledButton
        onClick={() => navigate(to)}
        sx={{
          color: path === to ? "#ef4848" : "gray",
        }}
      >
        {icon}
      </StyledButton>
    </Tooltip>
  );
};

export default ToolbarLink;
