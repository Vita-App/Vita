import React from 'react';
import { ValueCard } from './ValueCard';
import { mentorValuesData } from './mentorValuesData';
import { MentorValuesTitle, CardContainer } from './MentorValues.styles';

export const MentorValues = () => (
  <div style={{ color: 'white', marginTop: '30px' }}>
    <MentorValuesTitle variant="h4">
      <div>
        Unique stories. Real Experiences. <br />
        Whatever your goals are, there’s a mentor for you.
      </div>
    </MentorValuesTitle>

    <CardContainer>
      {mentorValuesData.map((mentorValue, index) => (
        <ValueCard key={index} cardInfo={mentorValue} />
      ))}
    </CardContainer>
  </div>
);
