import React from 'react';
import { styled } from '@mui/material/styles';

const TextWrapper = styled('div')({
  color: 'white',
  textAlign: 'center',
  fontFamily: 'Raleway, sans-serif',
  fontSize: '36px',
  fontWeight: 'bolder',
});

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
      <img src="/Google.svg" />
      <img src="/Microsoft.svg" />
      <img src="/Amazon.svg" />
      <img src="/Flipkart.svg" />
      <img src="/Intuit.svg" />
    </CompaniesWrapper>
  </div>
);

export default CompaniesHero;
