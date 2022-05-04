import React from 'react';
import { styled } from '@mui/material/styles';
import { TextWrapper } from 'components/common';

const CompaniesWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '2rem 1rem',
  img: {
    [theme.breakpoints.up('md')]: {
      width: '17vmin',
    },
    [theme.breakpoints.down('md')]: {
      width: '14vmin',
    },
  },
}));

const CompaniesHero = () => (
  <div className="">
    <TextWrapper>Meet Alumni from</TextWrapper>
    <CompaniesWrapper>
      <img src="/company/Google.svg" />
      <img src="/company/Microsoft.svg" />
      <img src="/company/Amazon.svg" />
      <img src="/company/Flipkart.svg" />
      <img src="/company/Intuit.svg" />
    </CompaniesWrapper>
  </div>
);

export default CompaniesHero;
