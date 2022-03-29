import React, { FC } from 'react';
import { Stack } from '@mui/material';

import LandingCard from './Card';

const LandingCards: FC = () => (
  <Stack
    m={2}
    spacing={2}
    sx={{
      width: '80%',
      mx: 'auto',
    }}>
    <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
      <LandingCard
        title="Vita Community"
        content="There's something for everybody. Follow along, chat on Discord, or read up on what we're doing."
        color="rgb(235, 84, 188)"
        link="https://discord.gg/vita"
        button="Join Discord"
      />
      <LandingCard
        title="Become a Mentor"
        content="Help us grow the community by becoming a mentor. We'll be happy to help you get started or you can become a mentee."
        color="rgb(20, 241, 149)"
        link="/auth"
        button="Become a Mentor"
      />
    </Stack>
    <Stack>
      <LandingCard
        title="Help create Vita"
        content="Help create us Vita by directly contributing to Vita Codebase. We're always looking for new contributors."
        color="rgb(128, 236, 255)"
        link="https://github.com/Rishabh-malhotraa/Vita"
        button="Contribute to Vita"
      />
    </Stack>
  </Stack>
);

export default LandingCards;
