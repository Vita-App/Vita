import React, { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import {
  Stack,
  TextField,
  PrimaryButton,
  useTheme,
  Label,
} from '@fluentui/react';
import type { FormEvent, FunctionComponent } from 'react';
import { mb2, submit } from './styles';
import { preferencesState } from 'store';
import { socket } from 'service/socket';
interface JoinProps {
  defaultId?: string;
}

const JoinMeeting: FunctionComponent<JoinProps> = ({ defaultId }) => {
  const theme = useTheme();
  const [preferences, setPreferences] = useRecoilState(preferencesState);
  const [link, setLink] = useState(defaultId);
  const [name, setName] = useState(preferences.name);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // No need for useCallback as set-state functions dont change
  const onError = (err: string) => {
    setDisabled(false);
    setError(err);
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (disabled) return;
      setError(null);
      setDisabled(true);
      socket.emit(
        'join_room',
        { name, link },
        ({ error: err }: { error?: string }) => {
          // On  should redirect to main app via 'joined_room' event listened in src/index
          if (err) {
            onError(err);
          }

          setPreferences({ name });
        },
      );
    },
    [disabled, setDisabled, socket, link, name, setError, setPreferences],
  );

  return (
    <Stack>
      <form onSubmit={handleSubmit}>
        <Stack.Item>
          <TextField
            className={mb2}
            value={link}
            onChange={(_, val) => setLink(val || '')}
            label="Meeting link or id"
            required
          />
        </Stack.Item>
        <Stack.Item>
          <TextField
            value={name}
            onChange={(_, val) => setName(val || '')}
            placeholder="Your name"
            required
          />
        </Stack.Item>
        <Label style={{ color: theme.palette.red }}>{error}</Label>
        <Stack.Item>
          <PrimaryButton
            type="submit"
            disabled={disabled}
            className={submit}
            text="Join"
          />
        </Stack.Item>
      </form>
    </Stack>
  );
};

export default JoinMeeting;
