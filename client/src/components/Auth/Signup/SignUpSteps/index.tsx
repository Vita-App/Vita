import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FieldValues } from 'react-hook-form';
import { Card, Stepper, Step, StepLabel, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ExperienceStep from './ExperienceStep';
import ProfileStep from './ProfileStep';
import AvailabilityStep from './AvailabilityStep';
import { authState } from 'store';

const steps = ['Profile', 'Experience', 'Availability'];

const SignUpSteps: React.FC<{
  onCancel: () => void;
  mentor: boolean;
}> = ({ onCancel, mentor }) => {
  const auth = useRecoilValue(authState);
  const [formData, setFormData] = useState<{
    [key: number]: FieldValues;
  }>({
    0: {
      first_name: auth.user?.first_name,
      last_name: auth.user?.last_name,
      email: auth.user?.email,
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);

  const onContinue = (step: number, data: FieldValues) => {
    if (!mentor && step === 0) {
      // If the user is not a mentor, we don't need to move to further steps.
      // So send req to server with profile data and complete mentee registration here.
      console.log(data);
    } else if (step === steps.length - 1) {
      // If it's the last step and the user is a mentor, we need to send all data to server.
      // So send req to server with data and complete mentor registration here
      formData[step] = data;
      console.log(formData);
    } else {
      // Else we move to next steps and save the data in the formData object.
      setFormData({
        ...formData,
        [step]: { ...data },
      });
      setActiveStep((prev) => prev + 1);
    }
  };

  const onBack = (step: number, data: FieldValues) => {
    // For preserving the data.
    setFormData({
      ...formData,
      [step]: { ...data },
    });
    setActiveStep((prev) => prev - 1);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ProfileStep
            onContinue={onContinue}
            hydrate={formData[step]}
            interests={interests}
            setInterests={setInterests}
          />
        );
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
          <AvailabilityStep
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
      sx={{
        px: 5,
        py: 5,
        borderRadius: '8px',
        position: 'relative',
        width: {
          sm: '100%',
          md: '60%',
        },
      }}>
      <Button
        onClick={onCancel}
        color="inherit"
        startIcon={<ArrowBack />}
        sx={{ position: 'absolute', top: 3, left: 3 }}>
        Change your role
      </Button>
      {mentor && (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {renderStep(activeStep)}
      </LocalizationProvider>
    </Card>
  );
};

export default SignUpSteps;
