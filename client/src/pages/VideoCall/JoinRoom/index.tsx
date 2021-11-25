import React, { useEffect } from 'react';
import { Stack, Text, Pivot, PivotItem, IPivotStyles } from '@fluentui/react';
import fscreen from 'fscreen';
import VideoPreview from './preview';
import CreateMeeting from './create';
import JoinMeeting from './join';
import { container, containerInner, heading, mr4, options } from './styles';

const pivotStyles: Partial<IPivotStyles> = {
  root: {
    // Display: 'flex',
    // justifyContent: 'center'
  },
  itemContainer: {
    padding: '.5em',
    width: '300px',
    height: '225px',
  },
};

const Landing: React.FC = () => {
  let defaultKey = 'create';
  let defaultId: string | undefined;
  const path = window.location.pathname;
  const REGEX = /^\/room\/(?<id>[0-9a-zA-Z-_]+)/;
  const match = path.match(REGEX);
  if (match) {
    defaultKey = 'join';
    defaultId = match.groups?.id;
  }

  useEffect(() => {
    if (fscreen.fullscreenElement) fscreen.exitFullscreen();
  }, []);
  return (
    <Stack className={container} horizontalAlign="center">
      <Stack.Item className={containerInner}>
        <Text className={heading} variant="superLarge">
          Welcome to mooz
        </Text>
        <Stack horizontalAlign="center" horizontal wrap>
          <Stack.Item className={mr4} grow>
            <Pivot
              defaultSelectedKey={defaultKey}
              className={options}
              styles={pivotStyles}
              aria-label="Create or join a meeting">
              <PivotItem itemKey="create" headerText="Create new meeting">
                <CreateMeeting />
              </PivotItem>
              <PivotItem itemKey="join" headerText="Join a meeting">
                <JoinMeeting defaultId={defaultId} />
              </PivotItem>
            </Pivot>
          </Stack.Item>
          <Stack.Item>
            <VideoPreview />
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export default Landing;
