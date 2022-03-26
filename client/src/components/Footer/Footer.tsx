import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MUILink from '@mui/material/Link';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import { Link } from 'components/common';

const Footer = () => (
  <Box component="footer" bgcolor="#131516" color="#d8d4cf">
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <img src="/logo192.png" alt="logo" width="30" height="30" />
            <Typography variant="caption" color="#777676">
              To inspire powerful conversations and collaborations among members
              worldwide so together we can change the world with creativity.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Link to="#">
              <GitHub />
            </Link>
            <Link to="#">
              <LinkedIn />
            </Link>
            <Link to="#">
              <Email />
            </Link>
          </Stack>
        </Stack>
        <Stack
          direction={{ sm: 'row', xs: 'column-reverse' }}
          justifyContent="space-between"
          spacing={2}
          alignItems="center">
          <Stack direction="column" alignItems={{ xs: 'center', sm: 'start' }}>
            <Stack direction="row" spacing={2}>
              <Link to="#">
                <Typography variant="body2">Find mentors</Typography>
              </Link>
              <Link to="#">
                <Typography variant="body2">Become a mentor</Typography>
              </Link>
              <Link to="#">
                <Typography variant="body2">Community</Typography>
              </Link>
              <Link to="#">
                <Typography variant="body2">Blog</Typography>
              </Link>
            </Stack>
            <Typography variant="caption" color="#777676">
              &copy; Copyright 2022 - VITA
            </Typography>
          </Stack>
          <Stack direction="column">
            <Stack direction="row" spacing={2} justifyContent="end">
              <Link to="#">
                <Typography variant="body2">Join VITA</Typography>
              </Link>
              <Link to="#">
                <Typography variant="body2">FAQs</Typography>
              </Link>
              <Link to="#">
                <Typography variant="body2">Help Center</Typography>
              </Link>
              <Link to="#">
                <Typography variant="body2">Parternships</Typography>
              </Link>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Link to="#">
                <MUILink variant="caption" color="#777676" component="p">
                  Contact Us
                </MUILink>
              </Link>
              <Link to="#">
                <MUILink variant="caption" color="#777676" component="p">
                  Privacy Policy
                </MUILink>
              </Link>
              <Link to="#">
                <MUILink variant="caption" color="#777676" component="p">
                  Terms of use
                </MUILink>
              </Link>
              <Link to="#">
                <MUILink variant="caption" color="#777676" component="p">
                  Sitemap
                </MUILink>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
