import React from 'react';
import logo from './logo.svg';
import { createTheme, useTheme } from '@mui/material';
//routes
import { Route, Routes } from 'react-router-dom';
//Components
import { Home } from './Pages/Home';
import { Expenses } from './Pages/Expenses';
import { Income } from './Pages/Income';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7986cb',
      dark: '#1e1e2d'
    },
    secondary: {
      main: '#ff8a65',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    divider: 'rgba(129,129,129,0.4)',
  },
  typography: {
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300,
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300,
    },
    fontFamily: 'Poppins, sans-serif',
  },
})

function App() {
  const theme = useTheme();
  return (
    <Routes>
      <Route path='/Financemanager'>
        <Route index element={<Home index="0" theme={theme}/>}/>
        <Route path='Ingresos' element={<Income theme={theme}/>}/>
        <Route path='Gastos' element={<Expenses theme={theme}/>}/>
      </Route>
    </Routes>
  );
}

export default App;
