import React, { useState } from 'react';
import { styled, Grid, Avatar, IconButton, Typography } from '@mui/material';
import { Favorite, LinkedIn } from '@mui/icons-material';
import { lightGreen } from '@mui/material/colors';
import PaginatedBookingCard from 'components/PaginatedBookingCard';
import ShowMoreText from 'react-show-more-text';
import Divider from '@mui/material/Divider';
import { commaString } from 'utils/helper';
import { ReactSelect as Select } from 'components/common/Select';
import { motivationOptions } from 'data';

const Wrapper = styled('div')`
  font-family: 'Circular Std';
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  width: '100vw';
  background-color: #242424;
  color: #f5f5f5;
`;

const TextWrapper = styled('div')`
  width: 100%;
  .show-more {
    font-weight: 400;
    color: #d4d4d4;
    font-size: 16px;
  }

  .show-more-anchor {
    color: grey;
  }
  .show-more-anchor:hover {
    color: palevioletred;
  }
  .MuiTypography-root {
    font-family: 'Circular Std';
  }
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
  max-width: 800px;
  /* background: #393939; */
  font-family: inter;
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
    transform: translate(0, -50%);
  }
`;

const UserPage = () => {
  const name = 'Rishabh Malhotra';
  const position = 'Member of Technical Staff';
  const companyName = 'Adobe';
  const userDescription = [
    'As an engineer with a design-focused MBA and experience in Entrepreneurship, I combine the perspectives from business, design, and technology to challenge conventional thinking about innovation and deliver critical & creative insights. I am a technology generalist with a deep interest and understanding of emerging technologies such as ML, chatbot, and Voice assistant technologies. I create experiential prototypes to tell stories about Future and digital experiences.',
    'Currently, I work as a Manager, Customer Experience at Questrade, leading a team of CX and Service Designers, managing and improving the customer experience for our existing offering, and designing and developing the new experiences through product and service innovation.',
    'I am passionate about innovation in financial services, transportation, and retail and actively write on LinkedIn and Medium on innovation, strategy, and Futures.',
  ];
  const mentorExpertise = ['Software Development', 'Product Management'];
  const mentorLanguage = ['Hindi', 'English'];

  const [isExpanded, setIsExpanded] = useState(false);
  const [motivation, setMotivation] = useState<string>('All');
  const [heart, setHeart] = useState<'error' | 'inherit'>('inherit');

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
            <IconButton aria-label="linkedIn" size="large" color="primary">
              <LinkedIn fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => {
                setHeart(heart === 'inherit' ? 'error' : 'inherit');
              }}
              aria-label="add to wish list"
              size="large"
              color={heart}>
              <Favorite fontSize="inherit" />
            </IconButton>
          </PhotoWrapper>

          <TextWrapper>
            <Typography variant="h5" fontWeight={700}>
              Hi, I m {name}
            </Typography>
            <Typography fontWeight={600} sx={{ py: 1 }}>
              {position} at {companyName}
            </Typography>
            <ShowMoreText
              /* Default options */
              lines={3}
              className="show-more"
              more="Show more"
              less="Show less"
              anchorClass="show-more-anchor"
              onClick={() => setIsExpanded(!isExpanded)}
              expanded={false}
              truncatedEndingComponent={'... '}>
              {userDescription}
              {userDescription.map((description, index) => (
                <div key={index}>{description}</div>
              ))}
            </ShowMoreText>
          </TextWrapper>
          <Grid container sx={{ py: 2 }}>
            <Grid container direction="column" item xs={12} md={6} spacing={1}>
              <Grid item fontWeight={700}>
                Expertise
              </Grid>
              <Grid item>{commaString(mentorExpertise)}</Grid>
            </Grid>
            <Grid container direction="column" item xs={12} md={6} spacing={1}>
              <Grid item fontWeight={700}>
                Languages
              </Grid>
              <Grid item>{commaString(mentorLanguage)}</Grid>
            </Grid>
          </Grid>
          <Divider />

          {/* adding select here */}
          <Grid item xs={12} md={4} sx={{ paddingTop: '1rem' }}>
            <Select
              name="Topic"
              options={motivationOptions}
              // @ts-ignore
              onChange={({ value }) => setMotivation(value)} // Value - label
              isSearchable={true}
              classNamePrefix="select"
              placeholder={<span>Filter by Motivation</span>}
            />
          </Grid>

          <Grid container>
            <PaginatedBookingCard motivation={motivation} />
          </Grid>
        </Container>
      </Grid>
    </Wrapper>
  );
};

export default UserPage;
