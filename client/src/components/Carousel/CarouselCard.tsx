import { Paper, styled, Grid } from '@mui/material';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
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

  .CarouselCard_text {
    font-size: 24px;
    font-weight: 700;
    padding: 8px px;
  }
  .CarouselCard_topics {
    text-overflow: ellipsis;
  }
`;

const CarouselCard = ({ user }: { user: Partial<MentorSchemaType> }) => {
  const {
    first_name,
    last_name,
    company,
    job_title,
    expertise,
    image_link,
    _id,
  } = user;
  const name = `${first_name} ${last_name}`;
  return (
    <Link to={`/user/${_id}`}>
      <SwiperSlide>
        <Wrapper elevation={4}>
          <StyledImage src={image_link} />
          <AbsoluteGrid container>
            <Grid item>
              <BookmarksRoundedIcon />
              <span className="CarouselCard_topics">
                {commaString(expertise)}
              </span>
            </Grid>
            <Grid item>
              <WorkRoundedIcon />
              <span>{job_title}</span>
            </Grid>
            <Grid item>{company}</Grid>
            <Grid item className="CarouselCard_text">
              {name}
            </Grid>
          </AbsoluteGrid>
        </Wrapper>
      </SwiperSlide>
    </Link>
  );
};

export default CarouselCard;
