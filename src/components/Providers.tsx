'use client';
import React, { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Manrope, Archivo_Black } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });
const archivo = Archivo_Black({ subsets: ['latin'], weight: ['400'] });

interface Props {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#13938C',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: manrope.style.fontFamily,
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const Providers = ({ children }: Props) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
