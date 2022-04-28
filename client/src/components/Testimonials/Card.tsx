import React from 'react';
import { Card, CardContent, Avatar, Stack, Box } from '@mui/material';

interface Props {
  testimonial: any;
}

const Testimonial: React.FC<Props> = ({ testimonial }) => (
  <Card>
    <CardContent>
      <Stack spacing={2}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={testimonial.avatar}
            alt={testimonial.name}
            sx={{
              width: '5rem',
              height: '5rem',
              marginRight: '1rem',
            }}
          />
          <Box>
            <h3>{testimonial.name}</h3>
            <p>{testimonial.designation}</p>
          </Box>
        </Box>
        <p>{testimonial.message}</p>
      </Stack>
    </CardContent>
  </Card>
);

export default Testimonial;
