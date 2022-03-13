import React, { useState } from 'react';
import {
  Card,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const steps = ['Profile', 'Experience', 'Integrations'];

const SignUpSteps: React.FC<{
  onCancel: () => void;
}> = ({ onCancel }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Card
      elevation={10}
      sx={{ p: 5, borderRadius: '8px', position: 'relative', width: '100%' }}>
      <IconButton
        onClick={onCancel}
        sx={{ position: 'absolute', top: 2, left: 2 }}>
        <ArrowBack />
      </IconButton>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography variant="h6">{`Active Step ${activeStep}`}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => setActiveStep(activeStep - 1)}
          disabled={activeStep === 0}>
          Back
        </Button>
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={activeStep === steps.length}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
        </Button>
      </Stack>
    </Card>
  );
};

export default SignUpSteps;
