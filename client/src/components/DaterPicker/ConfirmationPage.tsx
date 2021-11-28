import React from 'react';
import {
  Typography,
  Divider,
  styled,
  TextareaAutosize,
  Button,
  InputBase,
} from '@mui/material';
import { ReactSelect } from 'components/common';
import { Link } from 'react-router-dom';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Email from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRecoilValue } from 'recoil';
import { mentorState } from 'store';
// import Select from 'react-select';

export const colourOptions = [
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
  hour: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  date: date_,
  setHour,
  hour,
}) => {
  const { first_name, last_name } = useRecoilValue(mentorState);
  const date = date_ ? date_ : new Date();

  // const [selectedOption, setSelectedOption] = useState<unknown>(null);
  const mentorName = `${first_name} ${last_name}`;
  const dayString = date.toLocaleString('default', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeString = `${hour}:00 - ${hour + 1}:00`;
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
        sx={{ margin: '6px 0px' }}
        name="Topic"
        options={colourOptions}
        isSearchable={true}
        classNamePrefix="select"
      />

      <label style={{ fontWeight: 500 }}>Add your email id</label>
      <TextAreaWrapper>
        <Email sx={{ color: 'darkgrey' }} />
        <InputBase
          className="Search_Input"
          placeholder="Get invite link in you mail"
          inputProps={{
            'aria-label': 'Enter Email address to recieve invite link',
          }}
        />
      </TextAreaWrapper>
      <div style={{ padding: '1rem 0rem' }}>
        <TextArea
          aria-label="minimum height"
          minRows={6}
          maxRows={10}
          placeholder="Tips on getting booking accepted &#13;&#10; · Keep your questions specific &#13;&#10;
          · Include portfolio link &#13;&#10;
          · Share your goal for session "
        />
      </div>
      <StyledButton disabled sx={{ cursor: 'not-allowed' }}>
        Confirm your Booking
      </StyledButton>
      <div style={{ marginTop: '1rem' }}>
        <Button
          onClick={() => setHour(-1)}
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
