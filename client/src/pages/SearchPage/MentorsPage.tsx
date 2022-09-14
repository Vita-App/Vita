import React from 'react';
import { Grid, InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ReactSelect as Select } from 'components/common';
import { expertiseOptions } from 'data';
import UserCard from 'components/UserCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { expertiseState, topicState } from 'store';
import { useInfiniteQuery, InfiniteData } from 'react-query';
import Loader from 'react-loader-spinner';
import { useTheme } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getMentors, GetMentorsResponse } from 'utils/api-helper';

const GridWrapper = styled(Grid)({
  '.search_wrapper': {
    display: 'flex',
    alignItems: 'center',
  },
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
  display: 'grid',
  columnGap: '1rem',
  // padding: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, 300px)',
  justifyContent: 'space-between',
  marginTop: '3rem',
});

const RenderCards = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data?: InfiniteData<GetMentorsResponse>;
}) => {
  if (isLoading || !data) return <div />;

  return (
    <CardContainer container>
      {data.pages.map((page) =>
        page.mentors.map((user, index) => <UserCard key={index} user={user} />),
      )}
    </CardContainer>
  );
};

let timer: any;

const MentorsPage = () => {
  const [expertise, setExpertise] = useRecoilState(expertiseState);
  // @ts-ignore
  const expertiseValue = expertise?.value;
  const [mentorSearchText, setMentorSearchText] = React.useState('');
  const topic = useRecoilValue(topicState);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { isLoading, data, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery<GetMentorsResponse>(
      ['mentors', expertiseValue, topic],
      ({ pageParam }) =>
        getMentors(expertiseValue, mentorSearchText, topic, pageParam),
      {
        getNextPageParam: (lastPage) =>
          lastPage.nextPage === null ? undefined : lastPage.nextPage,
        getPreviousPageParam: (lastPage) =>
          lastPage.prevPage === null ? undefined : lastPage.prevPage,
      },
    );

  const debounceSearch = (text: string) => {
    setMentorSearchText(text);
    clearTimeout(timer);
    timer = setTimeout(() => {
      refetch();
    }, 700);
  };

  const content = (
    <>
      <InfiniteScroll
        dataLength={
          data?.pages.reduce((acc, page) => page.mentors.length + acc, 0) || 0
        }
        loader={
          isLoading && (
            <StyledBox>
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            </StyledBox>
          )
        }
        next={fetchNextPage}
        hasMore={Boolean(hasNextPage)}>
        {null}
      </InfiniteScroll>
      <RenderCards isLoading={isLoading} data={data} />
    </>
  );

  return (
    <>
      <GridWrapper container spacing={2}>
        <Grid item xs={10} sm={4} className="search_wrapper">
          <TextAreaWrapper>
            <SearchIcon sx={{ color: 'darkgrey' }} />
            <InputBase
              className="Search_Input"
              placeholder="Search by Company, Position"
              inputProps={{
                'aria-label': 'Search by Company Position',
              }}
              value={mentorSearchText}
              onChange={(e) => debounceSearch(e.currentTarget.value)}
            />
          </TextAreaWrapper>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} className="search_wrapper">
          <Paper
            sx={{ display: 'flex', minWidth: '240px', marginLeft: '16px' }}>
            <Select
              menuPlacement="auto"
              name="Expertise"
              sx={{ fontSize: '20px', width: '100%' }}
              options={[...expertiseOptions, { label: 'All', value: 'All' }]}
              value={expertise}
              onChange={setExpertise}
              isSearchable={matches}
              classNamePrefix="select"
              placeholder={<span>Filter by Expertise</span>}
            />
          </Paper>
        </Grid>
      </GridWrapper>
      {content}
    </>
  );
};

export default MentorsPage;
