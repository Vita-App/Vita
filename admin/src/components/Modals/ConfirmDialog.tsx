import React from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { Warning } from "@mui/icons-material";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<Props> = props => {
  return (
    <DialogContent>
      <Box display="flex" justifyContent="center">
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
            backgroundColor: "red",
          }}
        >
          <Warning sx={{ width: "80px", height: "80px" }} />
        </Avatar>
      </Box>
      <Typography
        variant="h4"
        sx={{ color: "#d32f2f" }}
        textAlign="center"
        gutterBottom
      >
        <strong>{props.title}</strong>
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        textAlign="center"
        my={2}
      >
        {props.message}
      </Typography>
      <DialogActions>
        <Button onClick={props.onConfirm} variant="contained">
          Okay
        </Button>
        <Button onClick={props.onClose} variant="contained" color="error">
          Cancel
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default ConfirmDialog;
