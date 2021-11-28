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
        <Link to="/search">
          <Button>Get a match</Button>
        </Link>
        <Link to="/room">
          <Button>Vita Meet</Button>
        </Link>
        {/* <Button sx={{ color: '' }}>Login</Button> */}
      </Stack>
    </MaterialToolbar>
  </div>
);

export default Toolbar;
