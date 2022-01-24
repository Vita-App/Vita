import React, { useRef } from 'react';
import SwiperCore, { Navigation, Mousewheel, Pagination } from 'swiper';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import { Swiper, SwiperSlide } from 'swiper/react';
import { commaString } from 'utils/helper';
import { MentorSchemaType } from 'types';
import { Link } from 'components/common';
import 'swiper/swiper-bundle.min.css';
import { Grid } from '@mui/material';
import right from './right.svg';
import left from './left.svg';
import {
  ArrowSpace,
  ArrowButton,
  Wrapper,
  StyledImage,
  AbsoluteGrid,
} from './Carousel.styles';

SwiperCore.use([Navigation, Mousewheel, Pagination]);

const CarouselWrapper = ({
  userList,
}: {
  userList: Partial<MentorSchemaType>[];
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ margin: '2rem', backgroundColor: 'inherit' }}>
      <Swiper
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
          console.log(swiper);
        }}
        slidesPerView={5}
        // Maybe just maybe
        // navigation={{
        //   prevEl: prevRef.current ? prevRef.current : undefined,
        //   nextEl: nextRef.current ? nextRef.current : undefined,
        // }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          760: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1700: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        slidesPerGroup={1}
        // Maybe implemented later
        // pagination={{ dynamicBullets: true, clickable: true }}
        freeMode
        grabCursor
        // centeredSlides
        mousewheel={{ forceToAxis: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        loop>
        {userList.map((user: Partial<MentorSchemaType>, index) => {
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
            <SwiperSlide key={index}>
              <Link to={`/user/${_id}`}>
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
              </Link>
            </SwiperSlide>
          );
        })}
        <ArrowSpace>
          <div>
            <ArrowButton ref={prevRef}>
              {' '}
              <img src={left} alt="" height={15} width={15} />{' '}
            </ArrowButton>
            <ArrowButton ref={nextRef}>
              {' '}
              <img src={right} alt="" height={15} width={15} />{' '}
            </ArrowButton>
          </div>
        </ArrowSpace>
      </Swiper>
    </div>
  );
};

export default CarouselWrapper;
