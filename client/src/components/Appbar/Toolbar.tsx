import React from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from 'components/common/Button';
import { Link } from 'components/common/styles';

const Toolbar = () => (
  <div>
    <MaterialToolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Link to="/">
          <Button>VITA APP</Button>
        </Link>
      </Box>
      <Stack direction="row" spacing={3}>
        <Button>Get a match</Button>
        <Link to="/room">
          <Button>Vita Meet</Button>
        </Link>
        <Button sx={{ color: 'palevioletred' }}>Login</Button>
      </Stack>
    </MaterialToolbar>
  </div>
);

export default Toolbar;
