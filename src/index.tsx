import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, colors } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'Noto Sans SC', 'Noto Sans JP', 'sans-serif'].join(','),
  },
  spacing: 4,
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
  },
  palette: {
    success: {
      main: colors.green[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
