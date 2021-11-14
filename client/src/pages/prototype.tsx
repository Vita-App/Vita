import React from 'react';
import CenteredDiv from 'components/common/CenteredDiv';
import Component from 'components/DaterPicker';
import Box from '@mui/material/Box';
const Prototype = () => {
  const x = 1;

  return (
    <Box height="100vh" sx={{ background: '#f5f5f5' }}>
      <CenteredDiv>
        <Component />
      </CenteredDiv>
    </Box>
  );
};

export default Prototype;
