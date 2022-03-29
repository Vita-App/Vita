import { createTheme } from '@mui/material/styles';
type ThemeMode = 'light' | 'dark';

// https://mui.com/customization/theme-components/#adding-new-component-variants
// https://mui.com/customization/theming/#createtheme-options-args-theme

const getTheme = (mode: ThemeMode) => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1876d1',
      },
      common: {
        black: '#242424',
      },
    },
  });

  theme = createTheme(theme, {});

  return theme;
};

export default getTheme;

// TODO Memoize this function when using theme state
// const xtheme = useMemo(() => {}, []);
