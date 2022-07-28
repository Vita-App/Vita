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
import Personal from 'components/UserDashboard/Personal';
import Security from 'components/UserDashboard/Security';

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
  Personal,
  Security,
}

const Settings = () => {
  const [tab, setTab] = useState(TabsEnum.Profile);
  const auth = useRecoilValue(authState);
  const id = auth.user?._id;
  const { data: mentor } = useQuery(['getMentorInfo', id], () => getMentor(id));

  const renderTab = (tab: TabsEnum) => {
    switch (tab) {
      case TabsEnum.Profile:
        return <Profile mentor={mentor} user={auth.user!} />;
      case TabsEnum.Personal:
        return <Personal />;
      case TabsEnum.Security:
        return <Security />;
      default:
        return <div>Error</div>;
    }
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
          <Tab label="Personal" />
          <Tab label="Security" />
        </Tabs>
      </Box>
      {renderTab(tab)}
    </Box>
  );
};

export default Settings;
