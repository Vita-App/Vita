import React from 'react';
import { Grid, List, Pagination, styled } from '@mui/material';
import BookingCard from './BookingCard';
import { Topic } from 'types';

interface PaginatedBookingCardProps {
  motivation: string;
  topics: Topic[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CssPagination = styled(Pagination)({
  '& .Mui-selected': {
    backgroundColor: '#3f51b5 !important',
  },

  '& .MuiPagination-root': {
    color: 'white',
    '& svg': {
      fill: 'white',
    },
    '& button': {
      color: 'white',
    },
  },
});

const filterTopics = (topicOptions: Topic[], motivation: string) => {
  if (motivation === 'All') {
    return topicOptions;
  }

  return topicOptions.filter((topic: Topic) => topic.motivation === motivation);
};

const PaginatedBookingCard: React.FC<PaginatedBookingCardProps> = ({
  motivation,
  topics: topics_,
  page,
  setPage,
}) => {
  /*
  Along with query paranmeter of the mentor
  axios.get('/api/motivation', )
  */
  const rowsPerPage = 5;

  const topics = filterTopics(topics_, motivation);
  const count = Math.floor(
    topics.length % rowsPerPage === 0
      ? topics.length / rowsPerPage
      : topics.length / rowsPerPage + 1,
  );

  return (
    <>
      <Grid item width="100%">
        <List component="nav" aria-label="booking appointments">
          {(rowsPerPage > 0
            ? topics.slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage,
              )
            : topics
          ).map((topic: Topic, index) => (
            <BookingCard topic={topic} topics={topics} key={index} />
          ))}
        </List>
      </Grid>
      <Grid
        item
        sx={{
          py: 2,
          justifyContent: 'center',
          display: 'flex',
          width: '100%',
        }}>
        <CssPagination
          shape="rounded"
          count={count}
          page={page}
          onChange={(event, val) => setPage(val)}
        />
      </Grid>
    </>
  );
};

export default PaginatedBookingCard;
