import React, { useEffect, useState, createContext, useContext } from 'react';
import type { FunctionComponent } from 'react';
import { ThemeProvider } from '@fluentui/react';
import { darkPalette, defaultTheme } from './themes';

type ThemeType = 'light' | 'dark';
type SetThemeType = ((arg0: ThemeType) => void) | undefined;

const SetThemeContext = createContext<SetThemeType>(undefined);
const ThemeContext = createContext<ThemeType>('light'); // default shouldn't matter here

const Provider: FunctionComponent = (props) => {
  // default preference - changed to dark
  const prefersDark = true;
  // window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useState<ThemeType>(prefersDark ? 'dark' : 'light');

  // set listener fot theme change
  useEffect(() => {
    const listener = (ev: MediaQueryListEvent) => {
      const newTheme = ev.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', listener);
    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listener);
  }, []);

  const palette = theme === 'dark' ? darkPalette : {};
  return (
    <SetThemeContext.Provider value={setTheme}>
      <ThemeContext.Provider value={theme}>
        <ThemeProvider
          applyTo="body"
          theme={{
            ...defaultTheme,
            ...palette,
          }}
          {...props}
        />
      </ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};

export default Provider;

export const useSetTheme = (): SetThemeType => useContext(SetThemeContext);
export const useTheme = (): ThemeType => useContext(ThemeContext);
