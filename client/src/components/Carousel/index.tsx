import React, { useRef } from 'react';
import SwiperCore, { Navigation, Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MentorSchemaType } from 'types';
import 'swiper/swiper-bundle.min.css';
import UserCard from 'components/UserCard';
import Toolbar from './CarouselToolbar';
import { CarouselDiv } from './Carousel.styles';

SwiperCore.use([Navigation, Mousewheel, Pagination]);

const Carousel = ({ userList }: { userList: Partial<MentorSchemaType>[] }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  console.log(prevRef, nextRef);
  return (
    <CarouselDiv style={{ margin: '2rem', backgroundColor: 'inherit' }}>
      <Toolbar prevRef={prevRef} nextRef={nextRef} />
      <Swiper
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.update();
        }}
        slidesPerView={5}
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
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        loop={true}>
        {userList.map((user: Partial<MentorSchemaType>, index) => (
          <SwiperSlide key={index}>
            <UserCard user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselDiv>
  );
};

export default Carousel;
