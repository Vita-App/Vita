import React from 'react';
import CenteredDiv from 'components/common/CenteredDiv';
import Component from 'components/DaterPicker';
import Box from '@mui/material/Box';
const Prototype = () => {
  const x = 1;

  return (
    <Box height="100vh" sx={{ background: '#242424' }}>
      <CenteredDiv>
        <Component />
      </CenteredDiv>
    </Box>
  );
};

export default Prototype;
