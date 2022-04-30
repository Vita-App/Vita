import { Box, styled } from '@mui/material';

export const MentorValuesTitle = styled(Box)({
  padding: '30px',
  '.MuiTypography-root': {
    textAlign: 'center',
    fontFamily: 'raleway',
    fontWeight: 800,
  },
});

export const CardContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, 30%);
  grid-auto-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  justify-content: center;

  @media screen and (max-width: 798px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr;
    padding: 10px;

    div {
      grid-column-end: span 2;
    }

    div:last-child {
      grid-column-start: 2;
    }
  }

  @media screen and (max-width: 488px) {
    display: flex;
    flex-direction: column;
    padding: 30px;
  }
`;
