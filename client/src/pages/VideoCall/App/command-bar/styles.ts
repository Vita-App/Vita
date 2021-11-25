import { FontSizes, FontWeights, mergeStyles } from '@fluentui/react';
import { NeutralColors } from '@fluentui/theme';
import type { IButtonStyles, ICommandBarStyles } from '@fluentui/react';

export const buttonStyles: IButtonStyles = {
  icon: {
    fontSize: FontSizes.xLarge,
  },
};

export const lightOption = mergeStyles({
  backgroundColor: NeutralColors.gray30,
  '& :hover': {
    backgroundColor: NeutralColors.gray20,
  },
  '& button, & button:hover': {
    color: NeutralColors.black,
  },
});
export const darkOption = mergeStyles({
  backgroundColor: NeutralColors.gray140,
  '& :hover': {
    backgroundColor: NeutralColors.gray150,
  },
  '& button, & button:hover': {
    color: NeutralColors.white,
  },
});

export const containerStyles: ICommandBarStyles = {
  root: {
    padding: '0 .5em',
    height: '40px',
  },
};

export const LeaveButtonStyles = {
  root: {
    margin: 'auto .5em',
    transition: 'all .1s ease',
  },
  rootHovered: {
    backgroundColor: '#CE0B1B',
    color: 'white',
  },
  label: {
    fontSize: FontSizes.mediumPlus,
    fontWeight: FontWeights.regular,
  },
};
