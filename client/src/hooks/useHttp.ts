import { useReducer, useCallback } from 'react';

interface HttpState {
  loading: boolean;
  error: any;
  data: any;
}

interface Action {
  type: string;
  responseData?: any;
  errorData?: any;
}

const httpReducer = (httpState: HttpState, action: Action): HttpState => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null };
    case 'RESPONSE':
      return { ...httpState, loading: false, data: action.responseData };
    case 'ERROR':
      return { ...httpState, loading: false, error: action.errorData };
    default:
      return httpState;
  }
};

const useHttp = (initialLoading = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    loading: initialLoading,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(
    async (fn, cb?, ...args) => {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await fn(...args);
        dispatch({ type: 'RESPONSE', responseData });
        if (cb) cb(responseData);
        return responseData;
      } catch (err: any) {
        dispatch({
          type: 'ERROR',
          errorData:
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message,
        });
      }
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    dispatch({ type: 'ERROR', errorData: null });
  }, []);

  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    clearError,
  };
};

export default useHttp;
