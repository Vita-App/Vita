import React from 'react';
import { useRecoilState } from 'recoil';
import { FieldValues } from 'react-hook-form';
import { Card, Stepper, Step, StepLabel, LinearProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ExperienceStep from './ExperienceStep';
import ProfileStep from './ProfileStep';
import AvailabilityStep from './AvailabilityStep';
import { authState } from 'store';
import { convertToFormData } from 'utils/api-helper';
import axios from 'axios';
import { APP_NAME, SERVER_URL } from 'config.keys';
import useHttp from 'hooks/useHttp';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { transformSlots } from 'utils/helper';
import moment from 'moment';
import useLocalState from 'hooks/useLocalState';
import { UserType } from 'types';

const steps = ['Profile', 'Experience', 'Availability'];

const SignUpSteps: React.FC = () => {
  const { loading, sendRequest } = useHttp();
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const userId = auth.user?._id;
  const [formData, setFormData] = useLocalState<{
    [key: number]: FieldValues;
  }>(`${userId}-register-form`, {
    0: {
      first_name: auth.user?.first_name,
      last_name: auth.user?.last_name,
      email: auth.user?.email,
    },
  });
  const [activeStep, setActiveStep] = useLocalState(`${userId}-active-step`, 0);
  const [interests, setInterests] = useLocalState<string[]>(
    `${userId}-interests`,
    [],
  );

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
    if (!auth.user!.is_mentor && step === 0) {
      const apiData = convertToFormData({
        ...data,
        interests,
        timezone: moment.tz.guess(),
      });

      sendRequest(
        async () => {
          const response = await axios.post<UserType>(
            `${SERVER_URL}/api/register`,
            apiData,
            {
              withCredentials: true,
            },
          );

          return response.data;
        },
        (data: UserType) => {
          localStorage.removeItem(`${userId}-register-form`);
          localStorage.removeItem(`${userId}-active-step`);
          localStorage.removeItem(`${userId}-interests`);
          setAuth((prev) => ({ ...prev, user: data }));
          toast.success(
            `You're all set now! You can now explore the ${APP_NAME} community.`,
          );
          navigate('/dashboard');
        },
      );
    } else if (step === steps.length - 1) {
      formData[step] = data;
      const apiData = convertToFormData({
        ...formData[0],
        ...formData[1],
        timeSlots: transformSlots(formData[2].slots),
        interests,
        topics: getTopicsArray(formData[1].topics),
        timezone: moment.tz.guess(),
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
        (data: UserType) => {
          localStorage.removeItem(`${userId}-register-form`);
          localStorage.removeItem(`${userId}-active-step`);
          localStorage.removeItem(`${userId}-interests`);
          setAuth((prev) => ({ ...prev, user: data }));
          navigate('/dashboard', { state: { newlyCreated: true } });
        },
      );
    } else {
      setFormData({
        ...formData,
        [step]: { ...data },
      });
      setActiveStep(activeStep + 1);
    }
  };

  const onBack = (step: number, data: FieldValues) => {
    // For preserving the data.
    setFormData({
      ...formData,
      [step]: { ...data },
    });
    setActiveStep(activeStep - 1);
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
            isMentor={auth.user?.is_mentor || false}
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
      {auth.user!.is_mentor && (
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
