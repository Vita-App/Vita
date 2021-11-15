import React from 'react';
import MaterialAppBar from '@mui/material/AppBar';
import ScrollTop from 'components/ScrollToTop';
import ToolBar from './Toolbar';

const Appbar = () => (
  <>
    <MaterialAppBar
      variant="elevation"
      position="absolute"
      color="transparent"
      elevation={0}
      sx={{ p: 4 }}>
      <ToolBar />
    </MaterialAppBar>
    <div id="back-to-top-anchor" />
    <ScrollTop />
  </>
);

export default Appbar;
