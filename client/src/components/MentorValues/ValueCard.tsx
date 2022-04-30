import React from 'react';
import {
  ValueCardInfoContainer,
  ValueCardTitle,
  ValueCardDescription,
  ValueCardImageContainer,
} from './ValueCard.style';

type ValueCardProps = {
  cardInfo: {
    headline: string;
    description: string;
    image: string;
    backgroundColor: string;
  };
};

export const ValueCard = (props: ValueCardProps) => (
  <ValueCardInfoContainer>
    <ValueCardTitle variant="h3">{props.cardInfo.headline}</ValueCardTitle>
    <ValueCardDescription>{props.cardInfo.description}</ValueCardDescription>
    <ValueCardImageContainer
      sx={{ backgroundColor: props.cardInfo.backgroundColor }}>
      <img
        src={props.cardInfo.image}
        alt="value-illustration"
        style={{
          height: '80%',
        }}
      />
    </ValueCardImageContainer>
  </ValueCardInfoContainer>
);
