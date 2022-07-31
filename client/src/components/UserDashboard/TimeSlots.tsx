import React from 'react';
import AvailabilityStep from 'components/Auth/Signup/SignUpSteps/AvailabilityStep';
import { SlotType } from 'types';
import { serializeTimeSlots } from 'utils/helper';

interface IProps {
  timeSlots: SlotType[];
}

const TimeSlots: React.FC<IProps> = ({ timeSlots }) => {
  const serializedTimeSlots = serializeTimeSlots(timeSlots);
  return <AvailabilityStep loading={false} hydrate={serializedTimeSlots} />;
};

export default TimeSlots;
