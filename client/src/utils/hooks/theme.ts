import { createTheme } from '@mui/material/styles';
type ThemeMode = 'light' | 'dark';

const getTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
    },
  });

export default getTheme;

// TODO Memoize this function when using theme state
// const xtheme = useMemo(() => {}, []);
