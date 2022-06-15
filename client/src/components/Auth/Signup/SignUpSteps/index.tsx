import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FieldValues } from 'react-hook-form';
import {
  Card,
  Stepper,
  Step,
  StepLabel,
  Button,
  LinearProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ExperienceStep from './ExperienceStep';
import ProfileStep from './ProfileStep';
import AvailabilityStep from './AvailabilityStep';
import { authState } from 'store';
import { convertToFormData } from 'utils/api-helper';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import useHttp from 'hooks/useHttp';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const steps = ['Profile', 'Experience', 'Availability'];

const SignUpSteps: React.FC<{
  onCancel: () => void;
  mentor: boolean;
}> = ({ onCancel, mentor }) => {
  const { loading, sendRequest } = useHttp();
  const navigate = useNavigate();
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

  const getTopicsArray = (topics: any) => {
    const topicsArray: any[] = [];

    for (const key of Object.keys(topics)) {
      for (const topic of topics[key]) {
        topicsArray.push(topic);
      }
    }

    return topicsArray;
  };

  const onContinue = (step: number, data: FieldValues) => {
    if (!mentor && step === 0) {
      const apiData = convertToFormData({
        ...formData[0],
        ...formData[1],
        available: { ...formData[2] },
        is_mentor: mentor,
        interests,
        topics: getTopicsArray(formData[1].topics),
      });

      sendRequest(
        async () => {
          const response = await axios.post(
            `${SERVER_URL}/api/mentee/register`,
            apiData,
            {
              withCredentials: true,
            },
          );

          return response.data;
        },
        () => {
          toast.success(
            "You're all set now! You can now explore the Vita community.",
          );
          navigate('/dashboard');
        },
      );
    } else if (step === steps.length - 1) {
      formData[step] = data;
      const apiData = convertToFormData({
        ...formData[0],
        ...formData[1],
        available: { ...formData[2] },
        is_mentor: mentor,
        interests,
        topics: getTopicsArray(formData[1].topics),
      });

      sendRequest(
        async () => {
          const response = await axios.post(
            `${SERVER_URL}/api/register`,
            apiData,
            {
              withCredentials: true,
            },
          );

          return response.data;
        },
        () => {
          toast.success(
            "You're all set now! Your application for mentor has been submitted. You will be notified once your application is approved.",
          );
          navigate('/dashboard');
        },
      );
    } else {
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
            loading={loading}
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
      {loading && (
        <LinearProgress
          variant="indeterminate"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
        />
      )}
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
