import React, { useState } from 'react';
import {
  Typography,
  Divider,
  styled,
  TextareaAutosize,
  Button,
  InputBase,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { ReactSelect } from 'components/common';
import { Link } from 'react-router-dom';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Email from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRecoilValue } from 'recoil';
import { mentorState } from 'store';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DurationType } from 'types';
import { getDurationLabel } from 'utils/helper';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';

export const optionsData = [
  {
    value: 'General Mentorship',
    label: 'General Mentorship',
  },
  {
    value: 'Acing the Technical Interview',
    label: 'Acing the Technical Interview',
  },
  {
    value: 'Mock Coding Interview',
    label: 'Mock Coding Interview',
  },
  {
    value: 'Make the Most out of your Internship',
    label: 'Make the Most out of your Internship',
  },
  {
    value: 'Dealing with Imposter Syndrome',
    label: 'Dealing with Imposter Syndrome',
  },
  {
    value: 'Managing Burnout',
    label: 'Managing Burnout',
  },
];

const TextAreaWrapper = styled('div')({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid white',
  borderRadius: '4px',
  marginTop: '6px',

  '&:focus-within': {
    border: '1px solid #2684ff',
  },

  '.Search_Input': {
    padding: '0px 6px',
    width: '100%',
  },
});

const TextArea = styled(TextareaAutosize)`
  width: 320px;
  outline: none;
  background-color: #303030;
  color: #f5f5f5;
  font-size: 16px;
  border-color: hsl(0, 0%, 80%);
  resize: none;
  border-radius: 4px;
  :focus {
    border: 1px solid #2684ff;
  }
`;

const StyledButton = styled(Button)`
  background-size: 200%;
  width: 100%;
  font-weight: 700;
  color: #f5f5f5;
  font-size: 1rem;
  background-image: linear-gradient(90deg, #3512b2, #d18873);
  box-shadow: 0 2px 1px transparent, 0 4px 2px transparent,
    0 8px 4px transparent, 0 16px 8px transparent, 0 32px 16px transparent;
  transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68);
`;
interface ConfirmationProps {
  date: Date | null;
  selectedSlot: DurationType;
  setSelectedSlot: React.Dispatch<
    React.SetStateAction<DurationType | undefined>
  >;
}

interface BookSlotPostData {
  mentor_id: string;
  start_date: string;
  email?: string;
  topic?: string;
  description?: string;
}

const bookSlot = async (formData: BookSlotPostData) => {
  const { data } = await axios.post(`${SERVER_URL}/api/bookSlot`, formData, {
    withCredentials: true,
  });

  return data;
};

const Confirmation: React.FC<ConfirmationProps> = ({
  date: date_,
  setSelectedSlot,
  selectedSlot,
}) => {
  const [topic, setTopic] = useState<{ label: string; value: string } | null>(
    null,
  );
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { first_name, last_name, _id } = useRecoilValue(mentorState);
  const { start } = selectedSlot;
  const mutation = useMutation(
    'bookSlot',
    (data: BookSlotPostData) => bookSlot(data),
    {
      onSuccess: () => {
        toast.success(
          'We have let the mentor know about your interest. Keeping checking your email for further updates!',
        );
        setSelectedSlot(undefined);
        queryClient.invalidateQueries('getBusySlots');
      },
      onError: (err: any) => {
        toast.error(err.response.data.error);
      },
    },
  );
  const date = date_ ? date_ : new Date();
  start.set('month', date.getMonth());
  start.set('date', date.getDate());
  start.set('year', date.getFullYear());
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  // const [selectedOption, setSelectedOption] = useState<unknown>(null);
  const mentorName = `${first_name} ${last_name}`;
  const dayString = date.toLocaleString('default', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timeString = getDurationLabel(selectedSlot);
  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 800, p: '8px 0px' }}>
        Confirm your Booking
      </Typography>
      <Typography variant="body1" style={{ opacity: 0.8, fontWeight: 700 }}>
        Mentorship session with{' '}
        <Link to="/" style={{ color: 'grey' }}>
          {mentorName}
        </Link>
      </Typography>
      <div style={{ display: 'flex', fontWeight: 600, padding: '1rem 0rem' }}>
        <EventAvailableTwoToneIcon color="action" />
        <span style={{ padding: '0px 1rem' }}>{dayString}</span>
        <ScheduleRoundedIcon color="action" />
        <span style={{ padding: '0px 1rem' }}>{timeString}</span>
      </div>
      <Divider style={{ margin: '1rem 0rem' }} />
      <label style={{ fontWeight: 500 }}>Select Main Topic</label>
      <ReactSelect
        value={topic}
        onChange={(e: any) => setTopic(e)}
        menuPlacement="auto"
        sx={{
          margin: '6px 0px',
          '.select__control': {
            border: '1px solid white',
            background: 'transparent !important',
          },
          '.select__control:hover': {
            border: '1px solid white !important',
          },
        }}
        name="Topic"
        options={optionsData}
        isSearchable={matches}
        classNamePrefix="select"
      />

      <label style={{ fontWeight: 500 }}>Add your email id</label>
      <TextAreaWrapper>
        <Email sx={{ color: 'darkgrey' }} />
        <InputBase
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="Search_Input"
          placeholder="Get invite link in your mail"
          inputProps={{
            'aria-label': 'Enter Email address to recieve invite link',
          }}
        />
      </TextAreaWrapper>
      <div style={{ padding: '1rem 0rem' }}>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="minimum height"
          minRows={6}
          maxRows={10}
          placeholder="Tips on getting booking accepted &#13;&#10; · Keep your questions specific &#13;&#10;
          · Include portfolio link &#13;&#10;
          · Share your goal for session "
        />
      </div>
      <StyledButton
        sx={{ cursor: 'pointer' }}
        disabled={mutation.isLoading}
        onClick={() =>
          mutation.mutate({
            mentor_id: _id,
            start_date: start.format(),
            email: email.trim(),
            description: description.trim(),
            topic: topic?.value,
          })
        }>
        {mutation.isLoading ? 'Booking...' : 'Confirm your Booking'}
      </StyledButton>
      <div style={{ marginTop: '1rem' }}>
        <Button
          onClick={() => setSelectedSlot(undefined)}
          startIcon={<KeyboardBackspaceIcon />}
          sx={{
            margin: 'auto',
            width: '100%',
            color: '#f5f5f5',
            fontWeight: 700,
          }}>
          Change Date or Time
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
