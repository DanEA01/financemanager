import { Backdrop, Box, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Accounts } from '../Components/Accounts'
import { Sidebar } from '../Components/Sidebar'
import { ExpensesStats } from '../Components/ExpensesStats'
import { FMDialog } from '../Components/FMDialog'
//Forms
import { NewAccount } from '../Components/Forms/NewAccount'
import { NewExpense } from '../Components/Forms/NewExpense'
//Menu
import { IncomeTabs } from '../Components/IncomeTabs'
//Table
import { ExpensesTable } from '../Components/ExpensesTable'
//Auth
import { AuthContext } from '../utils/auth'
import { getAccounts, getExpenses } from '../api/setApiCalls'

export const Expenses = (props:any) => {
  const [authContext, setAuthContext] = useContext<any>(AuthContext);
  const [openDialog, setopenDialog] = useState(false);
  const [openBackdrop, setopenBackdrop] = useState(false);
  const [choosenForm, setChoosenForm] = useState<any>(null);
  const [IncomeTabsIndex, setIncomeTabsIndex] = useState(0);
  const [accounts, setAccounts] = useState(null);
  const [expenses, setExpenses] = useState('');
  const [selectedCard, setSelectedCard] = useState({
      cardId: '',
      cardNum: 0,
  });

  useEffect(() => {
    if(authContext.token){
      setopenBackdrop(true);
      getAccounts('Expense',authContext.token).then(response => {
        setAccounts(response.data.accounts)
        if(response.data !== ''){
          setSelectedCard({...selectedCard, cardId: response.data.accounts[0]._id, cardNum:response.data.accounts[0].last4Digits})

          getExpenses(response.data.accounts[0]._id,'thisMonth',authContext.token).then(response => {
            setExpenses(response.data.expenses);
          }).catch(error => {
            console.log(error);
          })
        }
        setopenBackdrop(false);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [authContext])
  

  const addAccountDialog = () => {
    setChoosenForm(<NewAccount />);
    setopenDialog(true);
  }

  const handleClose = () => {
    setopenDialog(false);
  };

  const addExpenseDialog = () => {
    setChoosenForm(<NewExpense selectedAcc={selectedCard}/>);
    setopenDialog(true);
  }

  const SetIndexChange = (index:number) => {
    setIncomeTabsIndex(index);
  }

  const handleSelectedAccountID = (id:string,cardNum:number) => {
    setSelectedCard({...selectedCard, cardId: id, cardNum:cardNum})

    setopenBackdrop(true);
    getExpenses(id,'thisMonth',authContext.token).then(response => {
      setExpenses(response.data.expenses);
      setopenBackdrop(false);
    }).catch(error => {
      console.log(error);
    })
  }

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
            <IncomeTabs tabIndex={IncomeTabsIndex} handleIndexChange={SetIndexChange}/>
            <Accounts handleAddAccount={addAccountDialog} cards={accounts} selectedAccountID={handleSelectedAccountID}/>
            {IncomeTabsIndex === 0 ?
              <ExpensesStats />
            : 
              <ExpensesTable handleAddExpense={addExpenseDialog} data={expenses}/>
            }
          </Box>
      </Box>
      <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
        >
          <CircularProgress color="primary" />
      </Backdrop>
      <FMDialog open={openDialog} close={handleClose} form={choosenForm} fullWidth={true} width="md"/>
    </ThemeProvider>
    </>
  )
}
