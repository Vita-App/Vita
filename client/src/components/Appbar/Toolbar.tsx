import React from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from 'components/common/Button';

const Toolbar = () => (
  <div>
    <MaterialToolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Button>VITA APP</Button>
      </Box>
      <Stack direction="row" spacing={3}>
        <Button>Get a match</Button>
        <Button>Find a mentor</Button>
        <Button sx={{ color: 'palevioletred' }}>Login</Button>
      </Stack>
    </MaterialToolbar>
  </div>
);

export default Toolbar;
