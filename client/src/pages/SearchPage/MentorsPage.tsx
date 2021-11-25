import React, { useState } from 'react';
import { Grid, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ReactSelect as Select } from 'components/common/Select';
import { expertiseOptions } from 'data';
import UserCard from 'components/UserCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const GridWrapper = styled(Grid)({
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
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 300px)',
  justifyContent: 'space-between',
  marginTop: '3rem',
  paddingRight: '3rem',
});

// Const getLength = () => {
//   const height = window.innerHeight;
//   const width = window.innerWidth;

//   const row = Math.round(Math.max(1, (window.innerHeight - 100) / 400));
//   const col = Math.round(Math.max(1, (window.innerHeight - 100) / 300));
//   console.log(row, col);
//   return (row + 1) * col;
// };

const MentorsPage = () => {
  const [expertise, setExpertise] = useState<unknown>();
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const fetchMoreData = () => {
    // A fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 3 })));
    }, 1500);
  };

  return (
    <>
      <GridWrapper container spacing={2}>
        <Grid item xs={6} sm={4} className="search_wrapper">
          <TextAreaWrapper>
            <SearchIcon sx={{ color: 'darkgrey' }} />
            <InputBase
              className="Search_Input"
              placeholder="Search by Company, Position"
              inputProps={{ 'aria-label': 'Search by Company Position' }}
            />
          </TextAreaWrapper>
        </Grid>
        <Grid item xs={6} sm={4} lg={3} className="search_wrapper">
          <Paper sx={{ display: 'flex', minWidth: '240px' }}>
            <Select
              name="Expertise"
              sx={{ fontSize: '20px' }}
              options={expertiseOptions}
              value={expertise}
              onChange={setExpertise}
              isSearchable={true}
              classNamePrefix="select"
              placeholder={<span>Filter by Expertise</span>}
            />
          </Paper>
        </Grid>
      </GridWrapper>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}>
        <CardContainer container>
          {items.map((i, index) => (
            <UserCard key={index} />
          ))}
        </CardContainer>
      </InfiniteScroll>
    </>
  );
};

export default MentorsPage;
