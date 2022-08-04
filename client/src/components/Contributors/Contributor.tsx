import React from 'react';
import { Avatar, Stack, Typography, Link } from '@mui/material';
import { contributors } from './contributors';

interface IProps {
  contributor: typeof contributors[number];
  topContributor?: boolean;
}

const topContributorStyle = {
  backgroundColor: 'primary.main',
  width: '250px',
  p: 2,
  color: '#000',
  '&:hover': {
    boxShadow: '0px 2px 50px 0px #000000',
  },
};

const contributorStyle = {
  backgroundColor: 'background.paper',
  m: 1,
  width: '200px',
  height: '80px',
  borderRadius: 2,
  p: 2,
  color: 'text.secondary',
  '&:hover': {
    boxShadow: '0px 2px 15px 0px #000000',
  },
};

const Contributor: React.FC<IProps> = ({ contributor, topContributor }) => (
  <Link href={contributor.profile} underline="none">
    <Stack
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
