import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface IProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
}

const BookingRejectModal: React.FC<IProps> = ({
  open,
  loading,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ p: 8 }}>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          textAlign="center">
          <Typography variant="h5" fontWeight={700}>
            Reject Booking?
          </Typography>
          <Typography variant="h6" fontWeight={700} color="textSecondary">
            Please enter a reason for rejecting this booking. (Optional)
          </Typography>
          <TextField
            label="Reason"
            fullWidth
            autoFocus
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            variant="outlined"
            placeholder='e.g. "Hey, I am not available on this date and time, maybe you can book a session with me on this date and time instead?"'
          />
        </Stack>
        <Stack mt={4} direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => onConfirm(reason)}
            disabled={loading}>
            Confirm
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default BookingRejectModal;
