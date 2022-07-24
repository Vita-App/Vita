import React from 'react';
import {
  Card,
  Stack,
  Typography,
  Avatar,
  Divider,
  Skeleton,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { mentorState } from 'store';
import { useQuery } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';

interface IStatProps {
  icon: string;
  stat?: number;
  label: string;
}

interface StatsProps {
  likes: number;
  meetings: number;
}

const Stat: React.FC<IStatProps> = ({ icon, stat, label }) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Avatar>{icon}</Avatar>
    <Stack>
      <Typography variant="h6">
        {stat === undefined || null ? <Skeleton variant="text" /> : stat}
      </Typography>
      <Typography variant="body1">{label}</Typography>
    </Stack>
  </Stack>
);

const getStats = async (mentorId: string) => {
  const { data } = await axios.get<StatsProps>(
    `${SERVER_URL}/api/get-mentor-stats/${mentorId}`,
    {
      withCredentials: true,
    },
  );

  return data;
};

const Stats = () => {
  const mentor = useRecoilValue(mentorState);
  const query = useQuery(['getStats', mentor._id], () => getStats(mentor._id), {
    enabled: Boolean(mentor._id),
  });

  return (
    <Card>
      <Stack spacing={2} p={2}>
        <Typography variant="h5">Community Statistics</Typography>
        <Divider />
        <Stack direction="column" spacing={3}>
          <Stat icon="⭐" stat={0} label="Average Rating" />
          <Stat
            icon="🔥"
            stat={query.data?.meetings}
            label="Sessions Completed"
          />
          <Stat icon="🧡" stat={query.data?.likes} label="Total Hearts" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default Stats;
