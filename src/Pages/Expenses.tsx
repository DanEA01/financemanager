import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { Accounts } from '../Components/Accounts'
import { Sidebar } from '../Components/Sidebar'
import { ExpensesStats } from '../Components/ExpensesStats'
import { FMDialog } from '../Components/FMDialog'
import { NewAccount } from '../Components/Forms/NewAccount'

export const Expenses = (props:any) => {
  const [openDialog, setopenDialog] = useState(false);

  const addAccountDialog = () => {
    setopenDialog(true);
  }

  const handleClose = () => {
    setopenDialog(false);
  };

  return (
    <>
    <ThemeProvider theme={props.theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />  
          <Sidebar index={2} username="Daniel Enriquez" brandName="Gastos"/>
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
            <Accounts addAccount={addAccountDialog}/>
            <ExpensesStats />
          </Box>
      </Box>
      <FMDialog open={openDialog} close={handleClose} form={<NewAccount />} fullWidth={true} width="md"/>
    </ThemeProvider>
    </>
  )
}
