import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { SERVER_URL } from 'config.keys';

import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { authState } from 'store';
import { MentorSchemaType } from 'types';

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

const getMentor = async (id: string | undefined) => {
  const { data: response } = await axios.get<MentorSchemaType>(
    `${SERVER_URL}/api/get-mentor`,
    {
      params: {
        id,
      },
    },
  );
  return response;
};

const Settings = () => {
  const auth = useRecoilValue(authState);
  const id = auth.user?._id;
  const { data: mentor, refetch } = useQuery(['getMentorInfo', id], () =>
    getMentor(id),
  );
  const mutation = useMutation(
    'updateUserMentoringStatus',
    updateUserMentoringStatus,
    {
      onSuccess: () => {
        toast.success('Successfully updated your mentoring status');
        refetch();
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
              checked={mentor?.is_mentoring}
              onChange={() => mutation.mutate()}
            />
          }
        />
      </Stack>
    </Box>
  );
};

export default Settings;
