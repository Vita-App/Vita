import { Paper, styled, Grid } from '@mui/material';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import React from 'react';
import { commaString } from 'utils/helper';

const images = [
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1573496527892-904f897eb744?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1573497019707-1c04de26e58c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
];

const Wrapper = styled(Paper)`
  height: 400px;
  width: 300px;
  position: relative;
  border-radius: 16px;
  margin: 1rem;
  cursor: pointer;
`;

const StyledImage = styled('img')`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  background-color: #131313;
  border-radius: 16px;
`;

const AbsoluteGrid = styled(Grid)`
  background: rgb(0, 0, 0, 0.4);
  border-radius: 16px;
  position: absolute;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;

  .MuiSvgIcon-root {
    padding-right: 4px;
  }

  .MuiGrid-item {
    padding: 4px;
    display: flex;
    align-content: center;
  }

  .UserCard_text {
    font-size: 24px;
    font-weight: 700;
    padding: 8px px;
  }
  .UserCard_topics {
    text-overflow: ellipsis;
  }
`;

const UserCard = () => {
  const name = 'Rishabh Malhotra';
  const company = 'Adobe';
  const position = 'MTS -1';
  const topics = ['Career Advice', 'Motivation', 'Leadership'];
  return (
    <Wrapper elevation={4}>
      <StyledImage src={images[Math.floor(Math.random() * images.length)]} />
      <AbsoluteGrid container>
        <Grid item>
          <BookmarksRoundedIcon />
          <span className="UserCard_topics">{commaString(topics)}</span>
        </Grid>
        <Grid item>
          <WorkRoundedIcon />
          <span>{position}</span>
        </Grid>
        <Grid item>{company}</Grid>
        <Grid item className="UserCard_text">
          {name}
        </Grid>
      </AbsoluteGrid>
    </Wrapper>
  );
};

export default UserCard;
