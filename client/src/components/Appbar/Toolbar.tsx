import React from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from 'components/common/Button';
import MaterialButton from '@mui/material/Button';

const Toolbar = () => (
  <div>
    <MaterialToolbar sx={{ mt: 4 }}>
      <Box sx={{ flexGrow: 1, marginLeft: '10%' }}>
        <Button>VITA APP</Button>
      </Box>
      {/* </Typography> */}
      <Stack direction="row" spacing={3}>
        <MaterialButton variant="contained" disableElevation>
          Hey
        </MaterialButton>
        <Button>Get a match</Button>
        <Button>Find a mentor</Button>
        <Button sx={{ color: 'palevioletred' }}>Login</Button>
      </Stack>
    </MaterialToolbar>
  </div>
);

export default Toolbar;
