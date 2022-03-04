import React from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link, StyledButton as Button } from 'components/common';
import DarkMode from '../Darkmode/DarkMode'

const Toolbar = () => (
  <div>
    <MaterialToolbar>
      <Stack direction="row" spacing={3} style={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Button>VITA APP</Button>
          </Link>
        </Box>
        <Link to="/search">
          <Button>Get a match</Button>
        </Link>
        <Link to="/room">
          <Button>Vita Meet</Button>
        </Link>

        <DarkMode/>
        {/* <Button sx={{ color: '' }}>Login</Button> */}
      </Stack>
    </MaterialToolbar>
  </div>
);

export default Toolbar;
