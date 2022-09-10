import React from 'react';
import { Stack, Typography } from '@mui/material';
import { topContributors } from './contributors';
import Contributor from './Contributor';

const Contributors = () => (
  <Stack spacing={2} p={2} pb={4}>
    <Typography variant="h5" textAlign="center" color="#fff" gutterBottom>
      Made with ❤️ by
    </Typography>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap">
      {topContributors.map((contributor, index) => (
        <Contributor key={index} contributor={contributor} topContributor />
      ))}
    </Stack>
    {/* <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap">
      {contributors.map((contributor, index) => (
        <Contributor key={index} contributor={contributor} />
      ))}
    </Stack> */}
  </Stack>
);

export default Contributors;
