import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Grid from '@mui/material/Grid';
import Testimonial from './Card';
import { TextWrapper } from 'components/common';

const Testimonials: React.FC = () => {
  const { isLoading, data: testimonials } = useQuery(
    'testimonials',
    async () => {
      const { data } = await axios.get(
        'https://testimonialapi.toolcarton.com/api',
      );
      return data;
    },
  );

  return (
    <>
      <TextWrapper>{"What's Buzzing"}</TextWrapper>
      {isLoading ? (
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      ) : (
        <Grid container spacing={2} maxWidth="lg" mx="auto" my={2}>
          {testimonials.map((testimonial: any) => (
            <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
              <Testimonial testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Testimonials;
