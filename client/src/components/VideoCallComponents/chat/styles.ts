import {
  FontSizes,
  FontWeights,
  makeStyles,
  mergeStyles,
  mergeStyleSets,
  SharedColors,
} from '@fluentui/react';
import { CSSProperties } from 'react';

export const fluid = mergeStyles({
  width: '100%',
});
export const messages = mergeStyleSets({
  container: {
    padding: '.25em',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
  children: {
    overflowY: 'auto',
    width: '100%',
    height: '100%',
  },
  type: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: '.5em 0',
  },
  info: {
    fontWeight: FontWeights.semilight,
    textAlign: 'center',
  },
});

export const useMessageStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    margin: '.25em 0',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  message: {
    backgroundColor: theme.palette.neutralQuaternary,
    display: 'flex',
    flexDirection: 'column',
    padding: '.5em 1em',
    borderRadius: '1px',
  },
  title: {
    fontWeight: FontWeights.light,
    fontSize: FontSizes.small,
    fontFamily: 'monospace',
    width: '200px',
    textOverflow: 'ellipsis',
  },
  text: {
    maxWidth: '100%',
    wordBreak: 'break-word',
  },
}));

export const myMessageStyle: CSSProperties = {
  backgroundColor: SharedColors.cyanBlue10,
  marginLeft: 'auto',
  color: 'white',
};
