import { IModalStyles, mergeStyles } from '@fluentui/react';

const AR = 4 / 3;

export const container = mergeStyles({
  height: 'calc(100vh - 40px)',
  display: 'flex',
  overflowY: 'auto',
  width: '100%',
});
export const gridContainer = mergeStyles({
  display: 'flex',
  margin: 'auto',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
});

export const mediaContainer = mergeStyles({
  position: 'fixed',
  bottom: 0,
  height: 200 / AR,
  width: 200,
  zIndex: 100,
});

export const userMediaContainer = mergeStyles(mediaContainer, {
  right: 0,
});

export const displayMediaContainer = mergeStyles(mediaContainer, {
  right: 200,
});

export const modalStyles: Partial<IModalStyles> = {
  main: {
    minHeight: 100,
    minWidth: 100,
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
  },
};

export const pinnedContainer = mergeStyles({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});
export const sideList = mergeStyles({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flexShrink: 0,
  width: 'min-content',
  overflowY: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'row',
    width: '100%',
    height: 'min-content',
    overflowX: 'auto',
  },
});
