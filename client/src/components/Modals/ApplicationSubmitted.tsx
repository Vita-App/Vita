import React, { FC } from 'react';
import SuccessSvg from './success.svg';
import {
  DialogContent,
  Stack,
  Avatar,
  Button,
  Dialog,
  Typography,
} from '@mui/material';

const ApplicationSubmitted: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent sx={{ p: 8 }}>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        textAlign="center">
        <Avatar
          src={SuccessSvg}
          alt="Success"
          sx={{
            width: '150px',
            height: '150px',
          }}
        />
        <Typography variant="h5" fontWeight={700}>
          Application Submitted!
        </Typography>
        <Typography variant="h6" fontWeight={700} color="textSecondary">
          You have successfully applied for being a mentor. Wait for some days
          for further information.
        </Typography>
      </Stack>
      <Stack mt={4}>
        <Button variant="contained" color="success" onClick={onClose}>
          OK
        </Button>
      </Stack>
    </DialogContent>
  </Dialog>
);

export default ApplicationSubmitted;
