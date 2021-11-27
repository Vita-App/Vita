import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { IconButton, styled, Typography } from '@mui/material';
import ChevronLeftOutlined from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import Button from 'components/common/Button';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: 'rgb(59,57,57,0.4)',
  textTransform: 'none',
  color: '#f5f5f5',
  border: `1px solid ${theme.palette.grey[800]}`,
  fontWeight: 700,
  // Margin: '1rem',
  '&:hover': {
    opacity: 1,
    backgroundColor: '#424040',
  },
}));

const Pagination = () => {
  const [page, setPage] = useState(0);
  return (
    <div style={{ backgroundColor: '#242424', padding: '4px 4px' }}>
      <Stack direction="row" alignItems="center">
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, flexGrow: 1, color: '#f5f5f5' }}>
          Explore impactful topics
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button sx={{ p: 1 }}>Explore all</Button>
          <StyledIconButton aria-label="previous page" size="medium">
            <ChevronLeftOutlined fontSize="inherit" />
          </StyledIconButton>
          <StyledIconButton aria-label="next page" size="medium">
            <ChevronRightOutlined fontSize="inherit" />
          </StyledIconButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default Pagination;
