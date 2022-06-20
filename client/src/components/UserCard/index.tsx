import { Paper, styled, Grid } from '@mui/material';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import React from 'react';
import { commaString } from 'utils/helper';
import { MentorSchemaType } from 'types';
import { Link } from 'components/common';

const Wrapper = styled(Paper)`
  height: 400px;
  width: 300px;
  position: relative;
  border-radius: 16px;
  margin: 1rem;
  cursor: pointer;
`;

const StyledImage = styled('img')`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  background-color: #131313;
  border-radius: 16px;
`;

const AbsoluteGrid = styled(Grid)`
  padding: 5px;
  background: rgb(0, 0, 0, 0.4);
  border-radius: 16px;
  position: absolute;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;

  .MuiSvgIcon-root {
    padding-right: 4px;
  }

  .MuiGrid-item {
    padding: 4px;
    display: flex;
    align-content: center;
  }

  .UserCard_text {
    font-size: 24px;
    font-weight: 700;
    padding: 8px px;
  }
  .UserCard_topics {
    text-overflow: ellipsis;
  }
`;

const UserCard = ({ user }: { user: Partial<MentorSchemaType> }) => {
  const { first_name, last_name, experiences, expertise, avatar, _id } = user;
  const name = `${first_name} ${last_name}`;

  return (
    <Link to={`/user/${_id}`}>
      <Wrapper elevation={4}>
        <StyledImage src={avatar?.url} />
        <AbsoluteGrid container>
          <Grid item>
            <BookmarksRoundedIcon />
            <span className="UserCard_topics">{commaString(expertise)}</span>
          </Grid>
          <Grid item>
            <WorkRoundedIcon />
            <span>{experiences && experiences[0].role}</span>
          </Grid>
          <Grid item>{experiences && experiences[0].company}</Grid>
          <Grid item className="UserCard_text">
            {name}
          </Grid>
        </AbsoluteGrid>
      </Wrapper>
    </Link>
  );
};

export default UserCard;
