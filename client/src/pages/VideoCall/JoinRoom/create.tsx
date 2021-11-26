import { useRecoilState } from 'recoil';
import { useCallback, useState } from 'react';
import React, { FormEvent } from 'react';
import {
  Stack,
  TextField,
  PrimaryButton,
  SpinButton,
  Label,
  useTheme,
} from '@fluentui/react';
import { submit, mb2 } from './styles';
import { Room, preferencesState } from 'atoms';
import { socket } from 'service/socket';

const CreateMeeting: React.FC = () => {
  const [preferences, setPreferences] = useRecoilState(preferencesState);
  const theme = useTheme();
  const [max, setMax] = useState('5');
  const [meetingName, setMeetingName] = useState('');
  const [personName, setPersonName] = useState(preferences.name);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // No need for useCallback as set-state functions dont change
  const onError = () => {
    setDisabled(false);
    setError('Something went wrong, try again later (ˉ﹃ˉ)');
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (disabled) return;
      setError(null);
      setDisabled(true);
      const room: Room = {
        name: meetingName,
        created_by: personName,
        opts: {
          maxPeople: max,
        },
      };
      socket.emit('create_room', room, ({ isError }: { isError: boolean }) => {
        // On success it should redirect to main app via 'joined_room' event listened in src/index
        if (isError) {
          onError();
        }

        setPreferences({ name: personName });
      });
    },
    [
      disabled,
      setDisabled,
      socket,
      max,
      meetingName,
      personName,
      setError,
      setPreferences,
    ],
  );

  return (
    <Stack>
      <form onSubmit={handleSubmit}>
        <SpinButton
          className={mb2}
          value={max}
          onChange={(_, val) => setMax(val || '1')}
          label="Maximum number of participants"
          min={1}
          max={1000}
          step={1}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
        />
        <TextField
          className={mb2}
          value={personName}
          onChange={(_, val) => setPersonName(val || '')}
          placeholder="Your name"
          required
        />
        <TextField
          value={meetingName}
          onChange={(_, val) => setMeetingName(val || '')}
          placeholder="Meeting name"
        />
        <Label style={{ color: theme.palette.red }}>{error}</Label>
        <Stack.Item>
          <PrimaryButton
            disabled={disabled}
            type="submit"
            className={submit}
            text="Create"
          />
        </Stack.Item>
      </form>
    </Stack>
  );
};

export default CreateMeeting;
