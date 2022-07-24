import React from 'react';
import { Card, Stack, Typography, Avatar, Divider } from '@mui/material';

interface IStatProps {
  icon: string;
  stat: number;
  label: string;
}

const Stat: React.FC<IStatProps> = ({ icon, stat, label }) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Avatar>{icon}</Avatar>
    <Stack>
      <Typography variant="h6">{stat}</Typography>
      <Typography variant="body1">{label}</Typography>
    </Stack>
  </Stack>
);

const Stats = () => {
  console.log('Stats');
  return (
    <Card>
      <Stack spacing={2} p={2}>
        <Typography variant="h5">Community Statistics</Typography>
        <Divider />
        <Stack direction="column" spacing={3}>
          <Stat icon="⭐" stat={0} label="Average Rating" />
          <Stat icon="🔥" stat={0} label="Sessions Completed" />
          <Stat icon="🧡" stat={0} label="Total Hearts" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default Stats;
