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

const PageOneWrapper = styled('div')({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const Landing = () => {
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
          <Particles />
        </Grid>
        <Grid item sx={{ display: 'flex', flexGrow: 1, zIndex: 1 }}>
          <Hero />
        </Grid>
        <Particles />
      </PageOneWrapper>
      <CarouselComponent />
      <LandingCards />
      <Footer />
    </>
  );
};

export default Landing;
