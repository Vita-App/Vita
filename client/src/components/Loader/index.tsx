import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled('div')`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
`;

const LoadingComponent = () => (
  <LoaderWrapper>
    <Loader type="Grid" color="#f5f5f5" height={80} width={80} />
  </LoaderWrapper>
);

export default LoadingComponent;
