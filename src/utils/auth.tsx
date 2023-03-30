import { Backdrop, CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext([{}, () => {}])

let initialState:any = {}

const AuthProvider = (props:any) => {
  const [state, setState] = useState(initialState)
  const [openBackdrop, setopenBackdrop] = useState(true)

  useEffect(() => {
    if(state.token !== null){
      if(state.email !== undefined){
        setopenBackdrop(false);
      }else{  
        setopenBackdrop(true);
      }
    }else{
      setopenBackdrop(false);
    }  }, [state])

  return (
    <AuthContext.Provider value={[state, setState]}>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
      >
        <Stack direction="column" spacing={5} justifyContent="center" alignItems="center">
          <img width="200" src="/assets/img/FM Logo.svg"/>
          <CircularProgress color="inherit" />
        </Stack>
    </Backdrop>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }