import React from 'react';
import axios from 'axios';
import VerifyEmail from './VerifyEmail';
import ValidateToken from './ValidateToken';
import { useSearchParams } from 'react-router-dom';
import { SERVER_URL } from 'config.keys';
import { useQuery } from 'react-query';
import { VerificationResponseType } from 'types';

const getVerificationResponse = async (token: string) => {
  if (!token) {
    return;
  }

  const { data: response } = await axios.get<VerificationResponseType>(
    `${SERVER_URL}/api/auth/verify-email`,
    {
      params: { token },
    },
  );
  return response;
};

const EmailVerification = () => {
  const [params] = useSearchParams();

  const { data, isLoading } = useQuery(['email-verification'], () =>
    getVerificationResponse(params.get('token') || ''),
  );

  if (params.get('token') && !isLoading) {
    return <ValidateToken data={data} />;
  }

  return <VerifyEmail params={params} />;
};

export default EmailVerification;
