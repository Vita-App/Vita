import React, { useEffect, useState } from 'react';
import { Grid, InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ReactSelect as Select } from 'components/common';
import { motivationOptions } from 'data';
import TopicCard from 'components/TopicCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motivationState, tabIndexState, topicState } from 'store';
import { useRecoilState, useSetRecoilState } from 'recoil';
// import { Topic } from 'types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useQuery } from 'react-query';
import { getTopics } from 'utils/api-helper';
import Loader from 'react-loader-spinner';

const LEN = 8;

const SearchWrapper = styled(Grid)({
  '.search_wrapper': {
    display: 'flex',
    alignItems: 'center',
  },
});

const TextAreaWrapper = styled(Paper)({
  marginLeft: '16px',
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'black !important',
  width: 400,

  '.Search_Input': {
    fontSize: '20px',
    padding: '0px 6px',
    width: '100%',
  },
});

const CardContainer = styled(Grid)({
  // Display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'space-around',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 320px)',
  justifyContent: 'space-between',
  marginTop: '3rem',
});

const StyledBox = styled(Box)({
  width: '100%',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& svg': {
    fill: 'lightgray',
  },
});

const MentorsPage = () => {
  const [motivation, setMotivation] = useRecoilState<any>(motivationState);
  const setTabIndex = useSetRecoilState(tabIndexState);
  const setTopic = useSetRecoilState(topicState);
  const [items, setItems] = useState<any>([]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { isLoading, data } = useQuery(['mentors', motivation], () =>
    {
      const motivationArray = (motivation === null) ? [] : motivation.map((mov:any) => mov.value) ;
      const motivationValue = (motivation === null) ? "All" : motivationArray.join(',') ;
      return getTopics(motivationValue);
    }
  );

  useEffect(() => {
    if(!isLoading) setItems(data);
  }, [data])

  const fetchMoreData = () => {
    const n = items.length;
    setTimeout(() => {
      setItems(data?.slice(0, n + LEN));
    }, 300);
  };

  return (
    <div style={{ padding: '0rem 2rem' }}>
      <SearchWrapper container spacing={2}>
        <Grid item xs={10} sm={4} className="search_wrapper">
          <TextAreaWrapper>
            <SearchIcon sx={{ color: 'darkgrey' }} />
            <InputBase
              disabled
              className="Search_Input"
              placeholder="Search by Topics"
              inputProps={{ 'aria-label': 'Search by Topics' }}
            />
          </TextAreaWrapper>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} className="search_wrapper">
          <Paper
            sx={{ display: 'flex', minWidth: '240px', marginLeft: '16px' }}>
            <Select
              menuPlacement="auto"
              name="Motivation"
              sx={{ fontSize: '20px' }}
              options={motivationOptions}
              value={motivation}
              onChange={setMotivation}
              isSearchable={matches}
              isMulti={true}
              classNamePrefix="select"
              placeholder={<span>Filter by Motivation</span>}
            />
          </Paper>
        </Grid>
      </SearchWrapper>
      {
        isLoading === false ? (
          <InfiniteScroll
            dataLength={Math.min(data?.length!, items.length)}
            next={fetchMoreData}
            hasMore={
              items.length < data?.length!
            }
            loader={<h4>Loading...</h4>}>
            <CardContainer container>
              {items.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => {
                    setTopic(index);
                    setTabIndex('1');
                  }}>
                  <TopicCard topic={item} />
                </div>
              ))}
            </CardContainer>
          </InfiniteScroll>
        ) : (
          <StyledBox>
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </StyledBox>
        )
      }
    </div>
  );
};

export default MentorsPage;
