import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MUILink from '@mui/material/Link';
import {
  GitHub,
  LinkedIn,
  Email,
  Twitter,
  Instagram,
  Facebook,
} from '@mui/icons-material';
import { Link } from 'components/common';
import { APP_NAME, ASSET_FOLDER } from 'config.keys';

const Footer = () => (
  <Box component="footer" bgcolor="#131516" color="#d8d4cf">
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center">
          <Stack direction="column" spacing={1}>
            <img
              src={`/${ASSET_FOLDER}/logo192.png`}
              alt="logo"
              width="40"
              height="40"
            />
            <Stack direction="row" spacing={1}>
              <Typography variant="caption" color="#777676">
                To inspire powerful conversations and collaborations among
                members worldwide so together we can change the world with
                creativity.
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={1}>
            <Typography variant="h5" color="#fff">
              Reach Us
            </Typography>
            <Stack>
              <Typography variant="caption" color="#777676">
                Email: contact@vita-app.tech
              </Typography>
              <Link to="#">
                <MUILink variant="caption" color="#777676" component="p">
                  Privacy Policy
                </MUILink>
              </Link>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ sm: 'row', xs: 'column-reverse' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="caption" color="#777676">
              &copy; Copyright 2022 - {APP_NAME}
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
            <Link to="#">
              <Twitter />
            </Link>
            <Link to="#">
              <Instagram />
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
