import React, { useState } from 'react';
import AvailabilityStep from 'components/Auth/Signup/SignUpSteps/AvailabilityStep';
import { SlotType } from 'types';
import { serializeTimeSlots, transformSlots } from 'utils/helper';
import { SERVER_URL } from 'config.keys';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { FieldValues } from 'react-hook-form';

interface IProps {
  timeSlots: SlotType[];
}

const updateTimeSlots = async (timeSlots: any) => {
  const { data } = await axios.put(
    `${SERVER_URL}/api/update-mentor-slots`,
    timeSlots,
    {
      withCredentials: true,
    },
  );

  return data;
};

const TimeSlots: React.FC<IProps> = ({ timeSlots }) => {
  const [loading, setLoading] = useState(false);
  const serializedTimeSlots = serializeTimeSlots(timeSlots);
  const queryClient = useQueryClient();

  const onUpdate = async (formData: FieldValues) => {
    setLoading(true);
    try {
      await updateTimeSlots(transformSlots(formData.slots));
      queryClient.invalidateQueries('getMentorInfo');
      toast.success('Availability updated successfully');
    } catch (err) {
      toast.error('Could not update time slots');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AvailabilityStep
      loading={loading}
      hydrate={serializedTimeSlots}
      onSubmit={onUpdate}
    />
  );
};

export default TimeSlots;
