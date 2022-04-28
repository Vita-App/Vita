import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Masonry from '@mui/lab/Masonry';
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
        <Masonry
          spacing={2}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          sx={{ maxWidth: 'lg', mx: 'auto', my: 2 }}>
          {testimonials.map((testimonial: any) => (
            <Testimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </Masonry>
      )}
    </>
  );
};

export default Testimonials;
