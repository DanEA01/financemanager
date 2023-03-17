import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { Accounts } from '../Components/Accounts'
import { IncomeStats } from '../Components/IncomeStats'
import { Sidebar } from '../Components/Sidebar'

export const Income = (props:any) => {
    return (
        <>
        <ThemeProvider theme={props.theme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />  
              <Sidebar index={1} username="Daniel Enriquez" brandName="Ingresos"/>
              <Box component="main" sx={{ 
                backgroundColor: 'rgb(238, 242, 246)',
                width: 'calc(100% - 260px)',
                minHeight: 'calc(100vh - 88px)',
                flexGrow: 1,
                padding: '20px',
                marginTop: '65px',
                marginRight: '20px',
                borderRadius:' 12px 12px 0px 0px',
                transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                marginLeft: '0px',
                overflowX: 'hidden'}}>
                <Accounts />
                <IncomeStats />
              </Box>
          </Box>
        </ThemeProvider>
        </>
    )
}