import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Card, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import ExperienceStep from './ExperienceStep';
import ProfileStep from './ProfileStep';
import IntegrationsStep from './IntegrationsStep';

const steps = ['Profile', 'Experience', 'Integrations'];

const SignUpSteps: React.FC<{
  onCancel: () => void;
  mentor: boolean;
}> = ({ onCancel, mentor }) => {
  const [formData, setFormData] = useState<{
    [key: number]: FieldValues;
  }>({});
  const [activeStep, setActiveStep] = useState(0);

  const onContinue = (step: number, data: FieldValues) => {
    if (!mentor && step === 0) {
      // If the user is not a mentor, we don't need to move to further steps.
      // So send req to server with profile data and complete mentee registration here.
      console.log(data);
    } else if (step === steps.length - 1) {
      // If it's the last step and the user is a mentor, we need to send all data to server.
      // So send req to server with data and complete mentor registration here
      const finalData = formData;
      console.log(finalData);
    } else {
      // Else we move to next steps.
      setFormData({
        ...formData,
        [step]: { ...data },
      });
      setActiveStep((prev) => prev + 1);
    }
  };

  const onBack = (step: number, data: FieldValues) => {
    setFormData({
      ...formData,
      [step]: { ...data },
    });
    setActiveStep((prev) => prev - 1);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileStep onContinue={onContinue} hydrate={formData[step]} />;
      case 1:
        return (
          <ExperienceStep
            onBack={onBack}
            onContinue={onContinue}
            hydrate={formData[step]}
          />
        );
      case 2:
        return (
          <IntegrationsStep
            onBack={onBack}
            onContinue={onContinue}
            hydrate={formData[step]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card
      elevation={10}
      sx={{ px: 3, py: 5, borderRadius: '8px', position: 'relative' }}>
      <IconButton
        onClick={onCancel}
        sx={{ position: 'absolute', top: 2, left: 2 }}>
        <ArrowBack />
      </IconButton>
      {mentor && (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      {renderStep(activeStep)}
    </Card>
  );
};

export default SignUpSteps;
