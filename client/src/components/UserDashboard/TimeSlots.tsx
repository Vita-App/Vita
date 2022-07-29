import React from 'react';
import AvailabilityStep from 'components/Auth/Signup/SignUpSteps/AvailabilityStep';
import { SlotType } from 'types';

interface IProps {
  timeSlots?: SlotType[];
}

const TimeSlots: React.FC<IProps> = ({ timeSlots }) => {
  console.log(timeSlots);
  return <AvailabilityStep loading={false} hydrate={timeSlots || {}} />;
};

export default TimeSlots;
