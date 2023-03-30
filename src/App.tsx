import React, { useCallback, useContext, useEffect } from 'react';
import logo from './logo.svg';
import { createTheme, useTheme } from '@mui/material';
//routes
import { Route, Routes } from 'react-router-dom';
//Components
import { Home } from './Pages/Home';
import { Expenses } from './Pages/Expenses';
import { Income } from './Pages/Income';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
//API calls
import { setVerify } from './api/setApiCalls';
//Auth
import { AuthContext } from './utils/auth';
import { RequireAuth } from './utils/RequireAuth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#02897b',
      dark: '#025950',
      light: '#b7deda',
      contrastText: '#ffff',
    },
    secondary: {
      main: '#757575',
      dark: '#525151',
      light: '#adabab',
      contrastText: '#ffff',
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
  const [authContext, setAuthContext] = useContext<any>(AuthContext);

  const verifyUser = useCallback(() => {
    setVerify().then(response => {
      setAuthContext((oldValues: any) => {
        return { ...oldValues, token: response.data.token, username: response.data.name, email: response.data.email}
      })
    }).catch(error => {
      console.log(error);
      setAuthContext((oldValues: any) => {
        return { ...oldValues, token: null }
      })
    })
    setTimeout(verifyUser, 30 * 60 * 1000)
    // call refreshToken every 30 minutes to renew the authentication token.
  }, [setAuthContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])
  
  return (
    <Routes>
      <Route path='/Login' element={<Login />}/>
      <Route path='/Registro' element={<Register />}/>
      <Route path='/Financemanager'>
        <Route index element={<RequireAuth><Home index="0" theme={theme}/></RequireAuth>}/>
        <Route path='Ingresos' element={<RequireAuth><Income theme={theme}/></RequireAuth>}/>
        <Route path='Gastos' element={<RequireAuth><Expenses theme={theme}/></RequireAuth>}/>
      </Route>
    </Routes>
  );
}

export default App;
