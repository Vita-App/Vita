import React from 'react';
import Appbar from 'components/Appbar';
import Grid from '@mui/material/Grid';
import Particles from 'components/Particles';
import Footer from 'components/Footer/Footer';
import Carousel from 'components/Carousel';
import { useQuery } from 'react-query';
import { getMentors } from 'utils/api-helper';
import Loader from 'react-loader-spinner';
import LandingCards from 'components/LandingCards';
import CompaniesHero from 'components/CompaniesHero';
import { MentorValues } from 'components/MentorValues';
import SwipeCards from 'components/SwipeCards';
import LandingHero from 'components/LandingHero';
import Contributors from 'components/Contributors';

const Page1 = () => (
  <Grid container flexDirection={'row-reverse'}>
    <Grid item sx={{ zIndex: 1 }} xs={12}>
      <Appbar />
    </Grid>
    <Grid item xs={12} sm={6} sx={{}}>
      <SwipeCards />
    </Grid>
    <Grid item xs={12} sm={6} sx={{ color: 'white' }}>
      <LandingHero />
    </Grid>
  </Grid>
);

const Landing = () => {
  const { isLoading, data } = useQuery(['topMentors'], () =>
    getMentors('All', '', -1, 1, 50, true),
  );

  const CarouselComponent = () =>
    isLoading === false ? (
      <Carousel userList={data?.mentors || []} />
    ) : (
      <div>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );

  return (
    <>
      <Particles />
      <Page1 />
      <CompaniesHero />
      <MentorValues />
      <CarouselComponent />
      <LandingCards />
      <Contributors />
      <Footer />
    </>
  );
};

export default Landing;
