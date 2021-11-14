import { Paper, styled } from '@mui/material';
import React from 'react';

const StyledPaper = styled(Paper)`
  height: 300px;
  width: 200px;
  background: url('https://social.hays.com/wp-content/uploads/2018/05/ThinkstockPhotos-600055362.jpg')
    no-repeat;
  background-size: contain;
  object-fit: cover;
  object-position: center center;
`;

const UserCard = () => {
  const x = 1;
  return (
    <StyledPaper sx={{}}>
      <div className="">heyere</div>
    </StyledPaper>
  );
};

export default UserCard;
