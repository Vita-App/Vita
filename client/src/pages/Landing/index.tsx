import React from 'react';
import Appbar from 'components/Appbar';
import Grid from '@mui/material/Grid';
import Particles from 'components/Particles';
import Hero from 'components/Hero';
import Footer from 'components/Footer/Footer';
import { styled } from '@mui/material/styles';
import Carousel from 'components/Carousel';
import { useQuery } from 'react-query';
import { getMentors } from 'utils/api-helper';
import Loader from 'react-loader-spinner';
import LandingCards from 'components/LandingCards';
import CompaniesHero from 'components/CompaniesHero';
import { MentorValues } from 'components/MentorValues';
import SwipeCards from 'components/SwipeCards';
import LandingHero from 'components/LandingHero';

const PageOneWrapper = styled('div')({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const Landing2 = () => {
  const { isLoading, data } = useQuery(['mentors'], () =>
    getMentors(undefined, undefined, 12),
  );

  const CarouselComponent = () =>
    isLoading === false ? (
      <Carousel userList={data || []} />
    ) : (
      <div>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );

  return (
    <>
      <PageOneWrapper>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          sx={{ height: '100%' }}>
          <Grid item sx={{ zIndex: 1 }}>
            <Appbar />
          </Grid>
          <Grid item sx={{ display: 'flex', flexGrow: 1, zIndex: 1 }}>
            <Hero />
          </Grid>
        </Grid>
        <Grid item sx={{ display: 'flex', flexGrow: 1, zIndex: 1 }}>
          <Hero />
        </Grid>
        {/* <Particles /> */}
      </PageOneWrapper>
      <CompaniesHero />
      <MentorValues />
      <CarouselComponent />
      <LandingCards />
      <Footer />
    </>
  );
};

const Landing = () => {
  const x = 1;

  return (
    <>
      <Grid container flexDirection={'row-reverse'}>
        <Grid item sx={{ zIndex: 1 }} xs={12}>
          <Appbar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ background: '#7c7878', height: '65vh' }}>
          <SwipeCards />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ backgroundColor: '#202020', color: 'white', height: '65vh' }}>
          <LandingHero />
        </Grid>
      </Grid>
      <CompaniesHero />
    </>
  );
};

export default Landing;
