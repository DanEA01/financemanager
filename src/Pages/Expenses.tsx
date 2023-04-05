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
import { getAccounts, getExpenses, getExpensesStats } from '../api/setApiCalls'
import { Filter } from '../singleComponents/Filter'

export const Expenses = (props:any) => {
  const [authContext, setAuthContext] = useContext<any>(AuthContext);
  const [openDialog, setopenDialog] = useState(false);
  const [openBackdrop, setopenBackdrop] = useState(false);
  const [choosenForm, setChoosenForm] = useState<any>(null);
  const [IncomeTabsIndex, setIncomeTabsIndex] = useState(0);
  const [accounts, setAccounts] = useState<any>(null);
  const [expenses, setExpenses] = useState('');
  const [expensesStats, setExpensesStats] = useState(null);
  const [selectedCard, setSelectedCard] = useState({
      cardId: '',
      cardNum: 0,
  });
  const [filter, setFilter] = useState('thisMonth');

  const getExpensesAll = (accountId:string) => {
    getExpenses(accountId,filter,authContext.token).then(response => {
      setExpenses(response.data.expenses);
    }).catch(error => {
      console.log(error);
    })

    getExpensesStats(accountId,filter,authContext.token).then(response => {
      setExpensesStats(response.data.expenses);
      setopenBackdrop(false);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    if(authContext.token){
      setopenBackdrop(true);
      getAccounts('Expense',authContext.token).then(response => {
        setAccounts(response.data.accounts)
        if(response.data !== ''){
          setSelectedCard({...selectedCard, cardId: response.data.accounts[0]._id, cardNum:response.data.accounts[0].last4Digits})
          getExpensesAll(response.data.accounts[0]._id);
          setopenBackdrop(false);
        }
      }).catch(error => {
        console.log(error);
      })
    }
  }, [authContext])

  useEffect(() => {
    if(selectedCard.cardId !== ''){
      setopenBackdrop(true);
      
      getExpensesAll(selectedCard.cardId);
    }
  }, [filter])

  const addAccountDialog = () => {
    setChoosenForm(<NewAccount data="" id=""/>);
    setopenDialog(true);
  }

  const handleClose = () => {
    setopenDialog(false);
  };

  const addExpenseDialog = () => {
    setChoosenForm(<NewExpense selectedAcc={selectedCard} data=""/>);
    setopenDialog(true);
  }

  const SetIndexChange = (index:number) => {
    setIncomeTabsIndex(index);
  }

  const handleSelectedAccountID = (id:string,cardNum:number) => {
    setSelectedCard({...selectedCard, cardId: id, cardNum:cardNum})

    setopenBackdrop(true);
    getExpensesAll(id);
  }

  const handleFilterChange = (filter:string) => {
    setFilter(filter);
  }

  const handleEditAccount = (id:string) => {
    const account = accounts.filter((acc:any) => acc._id === id);
    setChoosenForm(<NewAccount data={account[0]} id={account[0]._id}/>);
    setopenDialog(true);
  }

  const handleRowClick = (data:object) => {
    setChoosenForm(<NewExpense selectedAcc={selectedCard} data={data}/>);
    setopenDialog(true);
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
            <Accounts handleAddAccount={addAccountDialog} cards={accounts} selectedAccountID={handleSelectedAccountID} editAccount={handleEditAccount}/>
            <Filter value={filter} filterChange={handleFilterChange}/>
            {IncomeTabsIndex === 0 ?
              <ExpensesStats data={expensesStats} filter={filter}/>
            : 
              <ExpensesTable handleAddExpense={addExpenseDialog} data={expenses} rowClick={handleRowClick}/>
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
