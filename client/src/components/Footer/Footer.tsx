import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Footering = () => (
  <Box component="footer" bgcolor="white">
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Stack>
        <Stack
          direction={{ md: 'row' }}
          justifyContent="space-between"
          alignItems="center">
          <Box>Vita Logo and Text</Box>
          <Box>Social Media Icons</Box>
        </Stack>
        <Stack
          direction={{ md: 'row' }}
          justifyContent="space-between"
          alignItems="center">
          <Stack direction="column">
            <Box>Links</Box>
            <p>Copyright</p>
          </Stack>
          <Stack direction="column">
            <Box>Additional Links like join vita, faqs</Box>
            <Box>Contact Us, Privacy Policy, etc...</Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default Footering;
