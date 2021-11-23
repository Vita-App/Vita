import { Paper, styled, Grid } from '@mui/material';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import React from 'react';
import { commaString } from 'utils/helper';

const Wrapper = styled(Paper)`
  height: 400px;
  width: 300px;
  position: relative;
`;

const StyledImage = styled('img')`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  background-color: #131313;
`;

const AbsoluteGrid = styled(Grid)`
  background: rgb(0, 0, 0, 0.4);
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
  const topics = ['Carrer Advice', 'Motivation', 'Leadership'];
  return (
    <Wrapper elevation={4}>
      <StyledImage src="https://social.hays.com/wp-content/uploads/2018/05/ThinkstockPhotos-600055362.jpg" />
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
