import React, { useState } from 'react';
import { Card, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import ExperienceStep from './ExperienceStep';
import ProfileStep from './ProfileStep';
import IntegrationsStep from './IntegrationsStep';

const steps = ['Profile', 'Experience', 'Integrations'];

const SignUpSteps: React.FC<{
  onCancel: () => void;
}> = ({ onCancel }) => {
  const [activeStep, setActiveStep] = useState(1);

  const onContinue = () => setActiveStep((prev) => prev + 1);
  const onBack = () => setActiveStep((prev) => prev - 1);

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileStep onContinue={onContinue} />;
      case 1:
        return <ExperienceStep onBack={onBack} onContinue={onContinue} />;
      case 2:
        return <IntegrationsStep />;
      default:
        return null;
    }
  };

  return (
    <Card
      elevation={10}
      sx={{ p: 5, borderRadius: '8px', position: 'relative' }}>
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
      {renderStep(activeStep)}
    </Card>
  );
};

export default SignUpSteps;
