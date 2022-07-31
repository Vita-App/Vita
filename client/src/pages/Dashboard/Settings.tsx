import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { SERVER_URL } from 'config.keys';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { authState } from 'store';
import { MentorSchemaType } from 'types';
import Profile from 'components/UserDashboard/Profile';
import TimeSlots from 'components/UserDashboard/TimeSlots';

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

enum TabsEnum {
  Profile,
  TimeSlots,
}

const Settings = () => {
  const [tab, setTab] = useState(TabsEnum.Profile);
  const auth = useRecoilValue(authState);
  const id = auth.user?._id;
  const { data: mentor } = useQuery(['getMentorInfo', id], () => getMentor(id));

  const renderTab = (tab: TabsEnum) => {
    if (tab === TabsEnum.Profile) {
      return <Profile mentor={mentor} user={auth.user!} />;
    }

    if (tab === TabsEnum.TimeSlots && auth?.user?.is_mentor) {
      return <TimeSlots timeSlots={mentor?.time_slots || []} />;
    }

    return <div>Error</div>;
  };

  return (
    <Box>
      <Typography variant="h4" my={2}>
        Settings
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={(event, value) => setTab(value as TabsEnum)}>
          <Tab label="Profile" />
          {auth.user?.is_mentor && <Tab label="TImeSlots" />}
        </Tabs>
      </Box>
      {renderTab(tab)}
    </Box>
  );
};

export default Settings;
