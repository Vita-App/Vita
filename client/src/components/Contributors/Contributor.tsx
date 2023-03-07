import React from 'react';
import { Avatar, Stack, Typography, Link, Paper } from '@mui/material';
import { contributors } from './contributors';

interface IProps {
  contributor: (typeof contributors)[number];
  topContributor?: boolean;
}

const topContributorStyle = {
  backgroundColor: 'black',
  width: '250px',
  p: 2,
  color: 'text.secondary',
  // '&:hover': {
  //   boxShadow: '0px 2px 25px 0px #000000',
  // },
};

const contributorStyle = {
  backgroundColor: 'background.paper',
  m: 1,
  width: '200px',
  height: '80px',
  borderRadius: 2,
  p: 2,
  color: 'text.secondary',
  // '&:hover': {
  //   boxShadow: '0px 2px 15px 0px #000000',
  // },
};

const Contributor: React.FC<IProps> = ({ contributor, topContributor }) => (
  <Link href={contributor.profile} underline="none">
    <Stack
      component={Paper}
      elevation={6}
      position="relative"
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={
        topContributor
          ? { ...contributorStyle, ...topContributorStyle }
          : contributorStyle
      }>
      <Avatar
        src={contributor.avatar_url}
        sx={{
          width: '70px',
          height: '70px',
        }}
      />
      <Typography variant="h6" fontWeight="bold">
        {contributor.name}
      </Typography>
    </Stack>
  </Link>
);

export default Contributor;
