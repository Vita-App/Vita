import { useNavigate } from 'react-router-dom';
import React from 'react';
import Error from 'components/Error404/Error.svg';
import { styled } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { SVGBackground2 } from 'components/Error404/Error404bg';

const ErrorIlustration = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    height: '55vh',
    margin: 'auto',
    marginTop: '0rem',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '23vh',
  },
  [theme.breakpoints.between(500, 'md')]: {
    marginTop: '10vh',
  },
}));

const ErrorContent = styled('div')(({ theme }) => ({
  fontWeight: '500',
  fontSize: '8vw',
  color: 'white',
  textAlign: 'center',
  width: '70%',
  margin: '1rem auto',

  [theme.breakpoints.up('md')]: {
    fontSize: '5vw',
    width: '60%',
  },
}));
const ErrorButton = styled('button')(({ theme }) => ({
  fontSize: '1rem',
  borderRadius: '10px',
  padding: '1rem',
  fontWeight: '600',
  margin: '1rem auto 6rem auto ',
  width: '12rem',
  backgroundColor: '#b09aff',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '25vh',
  },
  [theme.breakpoints.between(500, 'md')]: {
    marginBottom: '22vh',
  },
}));

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <SVGBackground2>
      <Box>
        <Grid container>
          <Grid item container md={12} xs={12} sm={12}>
            <ErrorIlustration
              className="errorimage"
              src={Error}
              alt="Error Image"
            />
          </Grid>
          <Grid item container md={12} xs={12} sm={12}>
            <ErrorContent>Oh,no! This Page Does Not Exist</ErrorContent>
          </Grid>
          <Grid item container md={12} xs={12} sm={12}>
            <ErrorButton
              onClick={() => {
                navigate('/');
              }}>
              Go to Main Page
            </ErrorButton>
          </Grid>
        </Grid>
      </Box>
    </SVGBackground2>
  );
};

export default Error404;
