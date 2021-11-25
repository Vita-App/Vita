import {
  FontSizes,
  FontWeights,
  IModalStyles,
  IPanelStyles,
  IPivotStyles,
  makeStyles,
  mergeStyles,
} from '@fluentui/react';

export const vFluid = mergeStyles({
  height: '100%',
});

export const vScroll = mergeStyles({
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
});
export const heading = mergeStyles({
  margin: '.15em .5em',
  fontWeight: FontWeights.semilight,
});
export const fluid = mergeStyles({
  width: '100%',
});
export const pivotContainer = mergeStyles({
  display: 'flex',
  flexDirection: 'column-reverse',
  height: '100%',
});
export const pivotStyles: Partial<IPivotStyles> = {
  root: {
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    margin: '.25em',
  },
  itemContainer: {
    height: 'calc(100% - 44px) ',
    '& > div': {
      height: '100%',
    },
  },
};
export const panelStyles: Partial<IPanelStyles> = {
  scrollableContent: {
    display: 'flex',
    flexDirection: 'column',
    // Will use pivot body scroll
    height: '100%',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '.25em',
  },
};

export const message = mergeStyles({
  height: '100%',
  fontSize: FontSizes.xLarge,
  fontWeight: FontWeights.semilight,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '.25em',
  textAlign: 'center',
});

export const useModalClassnames = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    maxWidth: '700px',
    maxHeight: '500px',
  },
  header: [
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      padding: '.25em .75em',
      cursor: 'move',
      fontWeight: FontWeights.semilight,
      fontSize: FontSizes.xxLarge,
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 1em',
    overflowY: 'auto',
    height: '100%',
    width: '500px',
  },
}));
export const modalStyles: Partial<IModalStyles> = {
  scrollableContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};
export const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
}));

export const searchbox = mergeStyles({
  margin: '.5em auto',
  width: '100%',
});
