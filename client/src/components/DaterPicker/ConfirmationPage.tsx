import React, { useState } from 'react';
import {
  Typography,
  Divider,
  styled,
  TextareaAutosize,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Select from 'react-select';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
  // { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  // { value: 'green', label: 'Green', color: '#36B37E' },
  // { value: 'forest', label: 'Forest', color: '#00875A' },
  // { value: 'slate', label: 'Slate', color: '#253858' },
  // { value: 'silver', label: 'Silver', color: '#666666' },
];

const StyledSelect = styled(Select)`
  margin: 1rem 0rem;
  .select__single-value {
    color: #f5f5f5;
  }
  .select__control {
    cursor: pointer;
    background-color: #303030;
  }
  .select__menu {
    /* cursor: pointer; */
    background-color: #272626;
  }
  .select__option--is-focused {
    /* cursor: pointer; */
    background-color: #424040;
  }
  .select__option--is-focused:hover {
    /* cursor: pointer; */
    background-color: #424040;
  }
`;

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
    border: 1px dotted #2684ff;
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
  time: Date | null;
  setTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Confirmation: React.FC<ConfirmationProps> = ({ setTime }) => {
  const [selectedOption, setSelectedOption] = useState<unknown>(null);
  const mentorName = 'Rishabh Malhotra';
  const dayString = 'Sat, Dec 04';
  const timeString = '12:00am - 1:30pm';
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
      <StyledSelect
        name="Topic"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={colourOptions}
        isSearchable={true}
        classNamePrefix="select"
      />
      <label style={{ fontWeight: 500, margin: '1rem 0rem' }}>
        Add your question to this booking
      </label>
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
      <StyledButton>Confirm your Booking</StyledButton>
      <div style={{ marginTop: '1rem' }}>
        <Button
          onClick={() => setTime(null)}
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
