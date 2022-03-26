import React from 'react';
import Appbar from 'components/Appbar';
import Footer from 'components/Footer/Footer';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import MentorsPage from './MentorsPage';
import TopicsPage from './TopicsPage';
import { useRecoilState } from 'recoil';
import { tabIndexState } from 'store';
interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

const a11yProps = (index: string) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const SearchPage = () => {
  const [tabIndex, setTabIndex] = useRecoilState(tabIndexState);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const Wrapper = styled('div')({
    backgroundColor: '#242424',
    color: '#f5f5f5',
    minHeight: '100vh',
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
          <Box className="Tab_Box">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="Mentor-Topic Tabs">
              <Tab
                label="Mentors"
                value="1"
                sx={{ typography: 'h4' }}
                {...a11yProps('1')}
              />
              <Tab
                label="Topics"
                value="2"
                sx={{ typography: 'h4' }}
                {...a11yProps('2')}
              />
            </Tabs>
          </Box>
          <TabPanel index="1" value={tabIndex}>
            <Box sx={{ padding: '0px 32px 32px 32px' }}>
              <MentorsPage />
            </Box>
          </TabPanel>
          <TabPanel index="2" value={tabIndex}>
            <TopicsPage />
          </TabPanel>
        </Box>
      </Wrapper>
      <Footer />
    </>
  );
};

export default SearchPage;
