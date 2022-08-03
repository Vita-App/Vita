import React from 'react';
import { Avatar, Stack, Typography, Link } from '@mui/material';
import { contributors, topContributors } from './contributors';

const Contributors = () => (
  <Stack spacing={2} mb={4} p={2}>
    <Typography variant="h5" textAlign="center" color="#fff" gutterBottom>
      Thanks to these awesome contributors 🧡
    </Typography>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      spacing={2}>
      {topContributors.map((contributor, index) => (
        <Link href={contributor.profile} key={index} underline="none">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              backgroundColor: 'primary.main',
              m: 1,
              width: '250px',
              height: '100px',
              borderRadius: 2,
              p: 2,
              '&:hover': {
                boxShadow: '0px 2px 50px 0px #000000',
              },
            }}>
            <Avatar
              src={contributor.avatar_url}
              sx={{
                width: '70px',
                height: '70px',
              }}
            />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#000' }}>
              {contributor.name}
            </Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap">
      {contributors.map((contributor, index) => (
        <Link href={contributor.profile} key={index} underline="none">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              backgroundColor: 'background.paper',
              m: 1,
              width: '200px',
              height: '80px',
              borderRadius: 2,
              p: 2,
              '&:hover': {
                boxShadow: '0px 2px 15px 0px #000000',
              },
            }}>
            <Avatar src={contributor.avatar_url} />
            <Typography variant="h6" sx={{ color: 'darkgray' }}>
              {contributor.name}
            </Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
  </Stack>
);

export default Contributors;
