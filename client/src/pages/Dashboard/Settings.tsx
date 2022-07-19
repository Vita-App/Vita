import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { SERVER_URL } from 'config.keys';

import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { mentorState } from 'store';

const updateUserMentoringStatus = async () => {
  const { data } = await axios.put(
    `${SERVER_URL}/api/mentor/mentoring-status`,
    {},
    {
      withCredentials: true,
    },
  );

  return data;
};

const Settings = () => {
  const [mentor, setMentor] = useRecoilState(mentorState);
  const mutation = useMutation(
    'updateUserMentoringStatus',
    updateUserMentoringStatus,
    {
      onSuccess: () => {
        toast.success('Successfully updated your mentoring status');
        setMentor({ ...mentor, is_mentoring: !mentor.is_mentoring });
      },
      onError: () => {
        toast.error('Failed to update your mentoring status');
      },
    },
  );

  return (
    <Box>
      <Typography variant="h4">Settings</Typography>
      <Stack spacing={2} direction="row" mt={1}>
        <FormControlLabel
          label="Mentoring"
          control={
            <Switch
              checked={mentor.is_mentoring}
              onChange={() => mutation.mutate()}
            />
          }
        />
      </Stack>
    </Box>
  );
};

export default Settings;
