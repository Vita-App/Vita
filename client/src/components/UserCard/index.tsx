import { Paper, styled, Grid } from '@mui/material';
import React from 'react';

const StyledPaper = styled(Paper)`
  height: 300px;
  width: 200px;
  background: url('https://social.hays.com/wp-content/uploads/2018/05/ThinkstockPhotos-600055362.jpg')
    no-repeat;
  background-size: contain;
  object-fit: cover;
  object-position: center center;
`;

const UserCard = () => {
  const name = 'Rishabh Malhotra';
  const company = 'Adobe';
  const position = 'MTS -1';
  const topics = ['Carrer Advice', 'Motivation', 'Leadership'];
  return (
    <StyledPaper sx={{}}>
      <Grid container flexDirection="column-reverse">
        <Grid item>{name}</Grid>
        <Grid item></Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </StyledPaper>
  );
};

export default UserCard;
