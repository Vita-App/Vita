import { keyframes, mergeStyles } from '@fluentui/react';

export const mb2 = mergeStyles({
  marginBottom: '.5em',
});
export const mr4 = mergeStyles({
  marginRight: '1em',
});

export const container = mergeStyles({
  height: '100vh',
  overflowY: 'auto',
});
export const containerInner = mergeStyles({
  margin: 'auto',
});

export const heading = mergeStyles({
  padding: '.25em',
  textAlign: 'center',
  display: 'block',
});

export const submit = mergeStyles({
  padding: '1.5em 2em',
  margin: '.25em auto',
});

export const preview = mergeStyles({
  padding: '1em',
  width: '300px',
});

export const options = mergeStyles({
  maxWidth: '300px',
  margin: '0 auto',
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const placeholder = mergeStyles({
  minHeight: '150px',
  animation: `${fadeIn} .75s ease`,
});
