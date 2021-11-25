import React from 'react';
import { Box, Stack, Typography, Grid, alpha, styled } from '@mui/material';
import Badge from '@mui/material/Badge';

const EmojiIcon = styled('div')`
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
  overflow: visible;
  user-select: none;
  color: rgb(255, 255, 255);
  background-color: palevioletred;
`;

const IconBadge = styled('div')`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(0%, -67%);
  font-size: 32px;
`;

const GridWrapper = styled(Grid)({
  flexDirection: 'row',
  width: '320px',
  padding: '1rem',
  position: 'sticky',
});

const TopGrid = styled(Grid)({
  justifyContent: 'center',
  alignItems: 'center',
  height: '180px',
  borderRadius: '16px',
  backgroundColor: '#388e3c',
  padding: '1rem 1rem',
  color: 'black',
  zIndex: 1,

  '.topics__container': {
    display: 'flex',
    // Height: '100%',
    width: '100%',
    borderRadius: '12px',
    // BackgroundColor: 'darkseagreen',
    position: 'relative',
    border: '2px solid black',
  },

  '.topics__overlay': {
    height: '100%',
    width: '100%',
    top: '6px',
    left: '6px',
    borderRadius: '12px',
    // BackgroundColor: `${alpha('#47471e', 0.5)}`,
    // backgroundColor: 'pink',
    position: 'absolute',
    zIndex: -1,
    border: '2px solid black',
  },
});

const BottomGrid = styled(Grid)({
  '.topics__heading': {
    fontWeight: 700,
    padding: '4px 8px',
    margin: '0px',
  },
  '.topics__description': {
    padding: '0px 8px',
    width: '100%',
    opacity: 0.6,
  },
});

const TopicCard = () => {
  const emojiIcon = '🔥';
  const emojiBadge = '🎂';
  const heading = 'Fostering A good Team Culture';
  const description =
    'How to create a positive workplace culture that drives collaboration and productivity?';

  const palatte = {
    outerBackground: '#f4cd5a',
    innerBackground: '#f4f4f4',
    iconBackground: 'palevioletred',
    overlay: '#c69938',
  };

  const { outerBackground, innerBackground, iconBackground, overlay } = palatte;

  // Const bg1 = '#eee'; // Outer background
  // const bg2 = '#dcdcdc'; // Inner background
  // const bg3 = 'palevioletred'; // Iconbackground
  // const bg4 = 'pink'; // Inner-overlay
  return (
    <GridWrapper container>
      <TopGrid container item sx={{ backgroundColor: outerBackground }}>
        <Box
          className="topics__container"
          sx={{ backgroundColor: innerBackground }}>
          <IconBadge>{emojiBadge}</IconBadge>
          <Grid container wrap="nowrap" alignItems="center">
            <Grid item sx={{ padding: '16px ' }}>
              <EmojiIcon style={{ backgroundColor: iconBackground }}>
                {emojiIcon}
              </EmojiIcon>
            </Grid>
            <Grid item>
              <Typography fontWeight={700}>{heading}</Typography>
            </Grid>
          </Grid>
          <Box
            className="topics__overlay"
            sx={{ backgroundColor: overlay }}></Box>
        </Box>
      </TopGrid>
      <BottomGrid item zeroMinWidth>
        <Typography variant="h6" className="topics__heading">
          {heading}
        </Typography>
        <Typography variant="body2" className="topics__description">
          {description}
        </Typography>
      </BottomGrid>
    </GridWrapper>
  );
};

export default TopicCard;
