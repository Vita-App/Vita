import React from 'react';
import { Box, Stack, Typography, Grid, alpha, styled } from '@mui/material';

const AvatarDiv = styled('div')`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  color: rgb(255, 255, 255);
  background-color: rgb(189, 189, 189, 0.3);
`;

const IconDiv = styled('div')`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(0%, -50%);
  font-size: 32px;
`;

const Card = () => {
  const x = 1;
  return (
    <Grid container width="400px">
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100%',
          borderRadius: '16px',
          backgroundColor: 'success.light',
          padding: '4rem 3rem',
          color: 'black',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            borderRadius: '4px',
            backgroundColor: 'darkseagreen',
            position: 'relative',
          }}
        >
          <IconDiv>🎂</IconDiv>
          <Grid container wrap="nowrap" alignItems="center">
            <Grid item sx={{ padding: '16px ' }}>
              <AvatarDiv>😂</AvatarDiv>
            </Grid>
            <Grid item xs>
              <Typography fontWeight={700}>
                Fostering A good Team Culture
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              top: '6px',
              left: '4px',
              borderRadius: '4px',
              backgroundColor: `${alpha('#f4f81c', 0.5)}`,
              position: 'absolute',
              zIndex: -1,
            }}
          ></Box>
        </Box>
      </Grid>
      <Grid item zeroMinWidth>
        <Typography
          variant="h6"
          style={{ fontWeight: 700, padding: '4px 8px', margin: '0px' }}
        >
          Fostering A good Team Culture
        </Typography>
        <Typography
          variant="body2"
          noWrap
          style={{
            padding: '0px 8px',
            width: '100%',
            opacity: 0.6,
            textOverflow: 'ellipsis',
          }}
        >
          how To create a po sitive workspace culture that drives collaboration
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
          soluta.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Card;
