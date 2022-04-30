import { styled, Typography } from '@mui/material';

export const ValueCardInfoContainer = styled('div')`
  background-color: #353535;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 1rem;
  border: 2px solid rgba(1, 1, 1, 0.3);
`;

export const ValueCardTitle = styled(Typography)({
  fontFamily: 'Raleway',
  fontSize: '24px',
  lineHeight: '30px',
  padding: '30px 30px 3px 30px',
  fontWeight: 800,
  height: '30px',
  display: 'flex',
  alignItems: 'center',
});

export const ValueCardDescription = styled('div')`
  line-height: 1.5rem;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 30px 60px 30px;
  flex-grow: 1;
`;

export const ValueCardImageContainer = styled('div')`
  background-color: orange;
  padding: 20px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
