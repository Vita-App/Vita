import React from 'react';
import { Box, Typography, Grid, styled, Paper } from '@mui/material';
import { colorPalatte } from 'data';
import { Topic } from 'types';

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
  background-color: #c3c3c385;
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
  cursor: 'pointer',
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
    color: 'inherit',
    display: 'flex',
    width: '100%',
    borderRadius: '12px',
    backgroundColor: '#f4f4f4',
    position: 'relative',
    border: '2px solid black',
  },

  '.topics__overlay': {
    height: '100%',
    width: '100%',
    top: '6px',
    left: '6px',
    borderRadius: '12px',
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

const TopicCard = ({ topic }: { topic: Topic }) => {
  const { description, emojiBadge, emojiIcon, topicName, motivation } = topic;

  const { background, overlay } = colorPalatte[motivation];

  return (
    <GridWrapper container>
      <TopGrid container item sx={{ backgroundColor: background }}>
        <Paper elevation={4} className="topics__container">
          <IconBadge>{emojiBadge}</IconBadge>
          <Grid container wrap="nowrap" alignItems="center">
            <Grid item sx={{ padding: '16px ' }}>
              <EmojiIcon>{emojiIcon}</EmojiIcon>
            </Grid>
            <Grid item>
              <Typography fontWeight={700} sx={{ paddingRight: '4px' }}>
                {topicName}
              </Typography>
            </Grid>
          </Grid>
          <Box
            className="topics__overlay"
            sx={{ backgroundColor: overlay }}></Box>
        </Paper>
      </TopGrid>
      <BottomGrid item zeroMinWidth>
        <Typography variant="h6" className="topics__heading">
          {topicName}
        </Typography>
        <Typography variant="body2" className="topics__description">
          {description}
        </Typography>
      </BottomGrid>
    </GridWrapper>
  );
};

export default TopicCard;
