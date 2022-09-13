import React from 'react';
import { Paper, styled, Grid } from '@mui/material';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import SchoolIcon from '@mui/icons-material/School';
// import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
// import { commaString } from 'utils/helper';
import { MentorSchemaType } from 'types';
import { Link } from 'components/common';
import { countryCodetoName } from 'data';
import { StyledTooltip } from 'components/common';

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
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    padding: 8px 0px;
  }
  .UserCard_text > img {
    height: 24px;
    width: 24px;
    margin-left: 5px;
    margin-top: 7px;
  }
  .UserCard_topics {
    text-overflow: ellipsis;
  }
  .UserCard_batch {
    display: flex;
    flex-grow: 1;
  }
`;

const UserCard = ({ user }: { user: Partial<MentorSchemaType> }) => {
  const {
    first_name,
    graduation_year,
    last_name,
    experiences,
    avatar,
    _id,
    countryCode,
  } = user;

  const name = `${first_name} ${last_name}`;
  // change this
  const _graduation_year = graduation_year || 2022;
  const default_image =
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
  return (
    <Link to={`/user/${_id}`}>
      <Wrapper elevation={4}>
        <StyledImage src={avatar?.url || default_image} />
        <AbsoluteGrid container>
          {/* <Grid item>
            <BookmarksRoundedIcon />
            <span className="UserCard_topics">{commaString(expertise)}</span>
          </Grid> */}
          <Grid item alignItems="center">
            <SchoolIcon />
            <span>{`Batch ${_graduation_year}`}</span>
          </Grid>
          <Grid item alignItems="center">
            <WorkRoundedIcon />
            <span>{experiences && experiences[0].role}</span>
          </Grid>
          <Grid item>{experiences && experiences[0].company}</Grid>
          <Grid item className="UserCard_text">
            {name}
            {countryCode ? (
              <StyledTooltip
                title={countryCodetoName[countryCode.toUpperCase()]}>
                <img
                  src={`https://flagcdn.com/96x72/${countryCode.toLowerCase()}.webp`}
                  srcSet={`https://flagcdn.com/192x144/${countryCode.toLowerCase()}.webp 2x,                `}
                  style={{ width: '32px', height: '24px' }}
                />
              </StyledTooltip>
            ) : (
              <></>
            )}
          </Grid>
        </AbsoluteGrid>
      </Wrapper>
    </Link>
  );
};

export default UserCard;
