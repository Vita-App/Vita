import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';
import { SERVER_URL } from 'config.keys';

interface BannerResponse {
  height: number;
  content: string;
  show: boolean;
}

const getBanner = async () => {
  const { data } = await axios.get<BannerResponse>(
    `${SERVER_URL}/api/get-banner`,
  );

  return data;
};

const Banner = () => {
  const { isLoading, isError, data } = useQuery('getBanner', getBanner);

  if (isLoading || isError) return <div />;

  if (!data?.show) return <div />;

  return (
    <Box
      width="100%"
      height={`${data.height}px`}
      bgcolor="#000"
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Typography
        zIndex={10}
        variant="h5"
        color="#fff"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Box>
  );
};

export default Banner;
