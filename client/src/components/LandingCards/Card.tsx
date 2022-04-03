import React, { FC } from 'react';
import { Card, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps {
  color?: string;
  title: string;
  content: string;
  link?: string;
  button?: string;
  minHeight: string;
}

const StyledButton = styled(Button)({
  backgroundColor: '#1d1d1d',
  color: '#fff',
  borderRadius: '16px',
  fontWeight: 'bolder',
  textTransform: 'capitalize',
  border: '1px solid ',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#fff',
    color: 'black',
    border: '1px solid #262727',
  },
});

const LandingCard: FC<IProps> = (props) => (
  <Card
    sx={{
      bgcolor: props.color,
      borderRadius: '0.75rem',
      minHeight: props.minHeight,
      p: 3,
      position: 'relative',
    }}
    elevation={10}>
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between">
      <Box>
        <Typography variant="h3" color="black" fontWeight="bold">
          {props.title}
        </Typography>
        <Typography variant="h6" color="black">
          {props.content}
        </Typography>
      </Box>
      {props.button && (
        <Box component="a" href={props.link} sx={{ textDecoration: 'none' }}>
          <StyledButton sx={{ mt: 2 }}>{props.button}</StyledButton>
        </Box>
      )}
    </Box>
  </Card>
);

export default LandingCard;
