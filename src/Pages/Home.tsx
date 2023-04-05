import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getAccountStats, topExpensesByMonth } from '../api/setApiCalls'
import { Accounts } from '../Components/Accounts'
import { DashboardBody } from '../Components/DashboardBody'
import { DashboardHeader } from '../Components/DashboardHeader'
import { DrawerHeader, Sidebar } from '../Components/Sidebar'
import { AuthContext } from '../utils/auth'

export const Home = (props:any) => {
  const [authContext, setAuthContext] = useContext<any>(AuthContext);
  const [accountStats, setAccountStats] = useState<any>('');
  const [topExpenses, setTopExpenses] = useState<any>('');

  useEffect(() => {
    getAccountStats('',authContext.token).then(response => {
      console.log(response);
      setAccountStats(response.data.stats);
    }).catch(error => {
      console.log(error);
    })
  }, [authContext])

  const handleBarClick = (month:number) => {
    console.log(month);
    topExpensesByMonth(month,authContext.token).then(response => {
      console.log(response);
      setTopExpenses(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <>
    <ThemeProvider theme={props.theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />  
          <Sidebar index={0} username="Daniel Enriquez" brandName="Home"/>
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
              <DashboardHeader incomeSum={accountStats.incomeSum} expensesSum={accountStats.expenseSum} balance={(accountStats.incomeSum - accountStats.expenseSum)}/>
              <DashboardBody data={accountStats} barClick={handleBarClick} topExpenses={topExpenses}/>
          </Box>
      </Box>
    </ThemeProvider>
    </>
  )
}
