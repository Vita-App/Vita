import React from 'react';
import { Link as router_Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Reactselect from 'react-select';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export * from './ChipSelect';
export * from './SingleSelect';

export const Link = styled(router_Link)({
  color: 'inherit',
  textDecoration: 'none',
});

// this is like react mui
export const ReactSelect = styled(Reactselect)(() => ({
  // width: '100%',
  boxShadow: 'white',
  '.select__single-value': {
    color: '#f5f5f5',
  },
  '.select__control': {
    borderColor: 'transparent',
    cursor: 'pointer',
    backgroundColor: '#0D0D0D',
  },
  '.select__input-container': {
    color: 'white',
  },
  '.select__control:hover': {
    borderColor: 'white',
  },
  '.select__menu': {
    backgroundColor: '#272626',
  },
  '.select__option--is-focused': {
    backgroundColor: '#424040',
  },
  '.select__option--is-focused:hover': {
    backgroundColor: '#424040',
  },
}));

export const StyledReactSelect = styled(ReactSelect)({
  '.select__control': {
    borderColor: '#767676',
    backgroundColor: 'transparent',
    padding: '6px',
  },
  '.select__input-container': {
    borderColor: '#767676',
    backgroundColor: 'transparent',
  },

  '.select__multi-value': {
    backgroundColor: '#444444',
    borderRadius: '10px',
    color: '#fff',
  },
  '.select__multi-value__label': {
    color: '#fff',
  },
  '.select__multi-value__remove': {
    backgroundColor: 'transparent',
  },
  '.select__multi-value__remove:hover': {
    backgroundColor: 'transparent',
  },
  '.select__menu': {
    overflow: 'auto',
  },
});

export const StyledButton = styled(Button)(({ theme }) => ({
  background: 'rgb(59,57,57,0.9)',
  textTransform: 'none',
  color: '#f5f5f5',
  fontWeight: 700,
  // Margin: '1rem',

  [theme.breakpoints.up('xs')]: {
    padding: '6px 16px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '12px 16px',
  },

  '&:hover': {
    opacity: 1,
    backgroundColor: '#424040',
  },
}));

export const MuiStyledButton = styled(Button)({
  fontWeight: 'bolder',
  borderRadius: '10px',
  textTransform: 'capitalize',
});

export const StyledTextField = styled(TextField)({
  marginTop: '0.5rem',
  '& .MuiInputBase-root': {
    // borderRadius: '16px',
    fontSize: '0.85rem',
  },
  '& :-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px #222222 inset !important',
    WebkitTextFillColor: '#fff',
    caretColor: '#fff',
    borderRadius: 'inherit',
  },
});

export const CenteredDiv = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
