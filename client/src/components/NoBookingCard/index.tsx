import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Hidden } from '@mui/material';
import { StyledButton as Button } from 'components/common';

const Card = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '1rem 0rem' }}>
      <Grid
        container
        sx={{
          padding: 2,
          border: '1px solid gray',
          borderRadius: '8px',
          maxWidth: '800px',
        }}>
        <Grid item xs={12} sm={12} md={8}>
          <h1>Connect and Grow</h1>
          <p>
            To get started, find a mentor that suits your need and send them a
            session request, your activity will appear here.
          </p>
          <Button
            sx={{ my: 2, backgroundColor: '#3e3e3e' }}
            onClick={() => navigate('/search/')}>
            Explore Mentors
          </Button>
        </Grid>
        <Grid item xs={0} sm={0} md={4}>
          <Hidden mdDown>
            <img
              src="./i1.svg"
              style={{
                padding: '1rem 1rem',
                height: '100%',
                maxHeight: '235px',
                // width: '100%',
                textAlign: 'center',
              }}></img>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
};

export default Card;
