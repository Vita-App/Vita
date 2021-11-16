import React from 'react';
import MaterialAppBar from '@mui/material/AppBar';
import ScrollTop from 'components/ScrollToTop';
import ToolBar from './Toolbar';

const Appbar = () => (
  <>
    <MaterialAppBar
      variant="elevation"
      position="relative"
      color="transparent"
      elevation={0}
      sx={{ padding: '2rem 2rem 0rem 2rem' }}>
      <ToolBar />
    </MaterialAppBar>
    <div id="back-to-top-anchor" />
    <ScrollTop />
  </>
);

export default Appbar;
