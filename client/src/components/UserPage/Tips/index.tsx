import React, { useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Card, Divider, IconButton, Stack, Typography } from '@mui/material';

const tips = [
  {
    title: 'How to prepare for your first mentorship session',
    content:
      "Plan an agenda! Plan out the questions and topics you'd like to discuss. If you'd like to work together on long-term goals, set some time to discuss expectations for each other.",
  },
  {
    title: 'What should we talk about during our meeting?',
    content:
      "Learn about each other's backgrounds to see if there's a fit. You can discuss your goals, challenges, recent successes, or a specific topic you need help with - it's up to you.",
  },
  {
    title: 'Be on time!',
    content:
      "You'll receive multiple reminders for your session, don't be late! Get off to a good start by showing up on time.",
  },
];

const Tips = () => {
  const [tip, setTip] = useState(0);
  return (
    <Card sx={{ mt: 1 }}>
      <Stack spacing={2} p={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">#{tip + 1} Tip for success</Typography>
          <Stack direction="row">
            <IconButton
              aria-label="prev tip"
              onClick={() => setTip(tip - 1)}
              disabled={tip <= 0}>
              <ArrowBack />
            </IconButton>
            <IconButton
              aria-label="next tip"
              onClick={() => setTip(tip + 1)}
              disabled={tip >= 2}>
              <ArrowForward />
            </IconButton>
          </Stack>
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <Typography variant="h6">{tips[tip].title}</Typography>
          <Typography variant="body1">{tips[tip].content}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Tips;
