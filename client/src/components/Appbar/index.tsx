import React from 'react';
import MaterialAppBar from '@mui/material/AppBar';
import ScrollTop from 'components/ScrollToTop';
import ToolBar from './Toolbar';

const Appbar = () => (
  <>
    <MaterialAppBar
      variant="outlined"
      position="relative"
      elevation={0}
      sx={{ padding: '8px', backgroundColor: '#242424' }}>
      <ToolBar />
    </MaterialAppBar>
    <div id="back-to-top-anchor" />
    <ScrollTop />
  </>
);

export default Appbar;
