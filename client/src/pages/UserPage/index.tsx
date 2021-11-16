import React from 'react';
import { styled, Grid, Avatar, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { lightGreen } from '@mui/material/colors';
import BookingCard from 'components/BookingCard';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: '100vw';
  background-color: #242424;
  color: #f5f5f5;
`;

const Banner = styled('div')`
  background-color: #7f5a83;
  background-image: linear-gradient(120deg, #7f5a83 0%, #0d324d 74%);
  /* background-image: linear-gradient(90deg, #3512b2, #d18873); */

  width: 100%;
  height: 180px;
`;
const Container = styled(Grid)`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #393939;
`;

const PhotoWrapper = styled('div')`
  padding: 16px;
  display: flex;
  flex-direction: row;

  div {
    padding: 2px 8px;
  }
`;

const Photo = styled('div')`
  width: 50px;
  .MuiAvatar-root {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(50%, -50%);
  }
`;

const UserPage = () => {
  const x = 1;
  return (
    <Wrapper>
      <Banner />
      <Grid
        container
        height="100%"
        justifyContent="center"
        sx={{ background: '#242424' }}>
        <Container item>
          <PhotoWrapper>
            <Photo>
              <Avatar sx={{ bgcolor: lightGreen[500] }}>N</Avatar>
            </Photo>
            <span style={{ flexGrow: 1 }}></span>
            <IconButton aria-label="favorite" size="large">
              <Favorite fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="share" size="large">
              <Favorite fontSize="inherit" />
            </IconButton>
          </PhotoWrapper>

          <h1>Hey there</h1>
          <h1>Hey there</h1>
          <h1>Hey there</h1>

          <div style={{ padding: '2rem' }}>
            <BookingCard />
          </div>
        </Container>
      </Grid>
    </Wrapper>
  );
};

export default UserPage;
