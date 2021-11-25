import React from 'react';
import Appbar from 'components/Appbar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import MentorsPage from './MentorsPage';
import TopicsPage from './TopicsPage';
import Select from 'react-select';
import ScrollToTop from 'components/ScrollToTop';

const SearchPage = () => {
  const [value, setValue] = React.useState('2');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const Wrapper = styled('div')({
    backgroundColor: '#242424',
    color: '#f5f5f5',

    '& .Mui-selected ': {
      color: '',
    },
    '.MuiTab-root': {
      fontSize: '24px',
      fontWeight: '600',
    },

    '.Tab_Box': {
      borderBottom: 1,
      borderColor: 'transparent',
      padding: '2rem',
    },
  });

  return (
    <>
      <Wrapper>
        <Appbar />
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box className="Tab_Box">
              <TabList
                onChange={handleChange}
                aria-label="mentor-topics switch"
                textColor="secondary"
                indicatorColor="secondary">
                <Tab label="Mentors" value="1" sx={{ typography: 'h4' }} />
                <Tab label="Topics" value="2" sx={{ typography: 'h4' }} />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: '0px 32px 32px 32px' }}>
              <MentorsPage />
            </TabPanel>
            <TabPanel value="2">
              <TopicsPage />
            </TabPanel>
          </TabContext>
        </Box>
      </Wrapper>
    </>
  );
};

export default SearchPage;
