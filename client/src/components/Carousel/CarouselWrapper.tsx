import React, { useRef } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import { MentorSchemaType } from 'types';
import left from './left.svg';
import right from './right.svg';
import CarouselCard from './CarouselCard';
import 'swiper/swiper-bundle.min.css';

export type DataObj = {
  id: number;
  name: string;
  company: string;
  post: string;
  nationality: string;
  expertise: string;
};

const Typography: React.CSSProperties = {
  color: 'black',
  fontFamily: "'Circular Std', sans-serif",
  letterSpacing: '0.05rem',
  margin: '0',
};

const heading: React.CSSProperties = {
  ...Typography,
  margin: '1rem 0',
  fontSize: '1.5rem',
};

const arrowButtons: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #636363',
  borderRadius: '50%',
  height: '30px',
  width: '30px',
  fontWeight: 'bold',
  lineHeight: '1rem',
};

const buttonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #636363',
  borderRadius: '0.5rem',
  height: '33px',
  width: '100px',
  transform: 'translateY(-3px)',
  // letterSpacing: '0.025rem',
};

SwiperCore.use([Navigation]);

const CarouselWrapper = ({
  userList,
}: {
  userList: Partial<MentorSchemaType>[];
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ margin: '2rem', backgroundColor: '#A7A7A7' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ ...heading }}>
            Discover the world`&apos;`s top mentors
          </h4>
        </div>
        <div style={{ padding: '0 2rem' }}>
          <button style={{ ...buttonStyle, ...Typography, margin: '1rem' }}>
            Explore all
          </button>
          <button
            ref={prevRef}
            style={{ ...arrowButtons, margin: '1rem 0.5rem' }}>
            {' '}
            <img src={left} alt="" height={15} width={15} />{' '}
          </button>
          <button
            ref={nextRef}
            style={{ ...arrowButtons, margin: '1rem 0.5rem' }}>
            {' '}
            <img src={right} alt="" height={15} width={15} />{' '}
          </button>
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={150}
        slidesPerView={3}
        // define breakpoints  according to the screen size
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        scrollbar={{ draggable: true }}
        // Doesnt work idfk
        speed={500}
        slidesPerGroup={2}
        loop>
        {userList.map((user: any, index) => (
          <CarouselCard
            key={index}
            // @ts-ignore
            user={user}
          />
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselWrapper;
