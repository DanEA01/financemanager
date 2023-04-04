import { Backdrop, Box, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Accounts } from '../Components/Accounts'
import { FMDialog } from '../Components/FMDialog'
//Forms
import { NewAccount } from '../Components/Forms/NewAccount'
import { NewIncome } from '../Components/Forms/NewIncome'
//Graphs
import { IncomeStats } from '../Components/IncomeStats'
//Table
import { IncomeTable } from '../Components/IncomeTable'
//Tabs & Bar
import { IncomeTabs } from '../Components/IncomeTabs'
import { Sidebar } from '../Components/Sidebar'
//Auth
import { AuthContext } from '../utils/auth'
import { getAccounts, getIncomes, getIncomesStats } from '../api/setApiCalls'
import { Filter } from '../singleComponents/Filter'

export const Income = (props:any) => {
  const [authContext, setAuthContext] = useContext<any>(AuthContext);
  const [openDialog, setopenDialog] = useState(false);
  const [openBackdrop, setopenBackdrop] = useState(false);
  const [choosenForm, setChoosenForm] = useState<any>(null);
  const [IncomeTabsIndex, setIncomeTabsIndex] = useState(0);
  const [accounts, setAccounts] = useState(null);
  const [incomes, setIncomes] = useState('');
  const [incomesStats, setIncomesStats] = useState(null);
  const [filter, setFilter] = useState('thisMonth');
  const [selectedCard, setSelectedCard] = useState({
    cardId: '',
    cardNum: 0,
  });

  const getIncomesAll = (accountId:string) => {
    getIncomes(accountId,filter,authContext.token).then(response => {
      setIncomes(response.data.incomes);
    }).catch(error => {
      console.log(error);
    })

    setopenBackdrop(false);
    getIncomesStats(accountId,filter,authContext.token).then(response => {
      console.log(response.data.incomes);
      
      setIncomesStats(response.data.incomes);
      setopenBackdrop(false);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getAccounts('Income',authContext.token).then(response => {
      setAccounts(response.data.accounts)
      if(response.data !== ''){
        setSelectedCard({...selectedCard, cardId: response.data.accounts[0]._id, cardNum:response.data.accounts[0].last4Digits});
        getIncomesAll(response.data.accounts[0]._id);
        setopenBackdrop(false);
      }
    }).catch(error => {
      console.log(error);
    })
  }, [authContext])

  useEffect(() => {
    if(selectedCard.cardId !== ''){
      setopenBackdrop(true);
      
      getIncomesAll(selectedCard.cardId);
    }
  }, [filter])

  const addAccountDialog = () => {
    setChoosenForm(<NewAccount />);
    setopenDialog(true);
  }

  const handleClose = () => {
    setopenDialog(false);
  };

  const addIncomeDialog = () => {
    setChoosenForm(<NewIncome selectedAcc={selectedCard}/>);
    setopenDialog(true);
  }

  const SetIndexChange = (index:number) => {
    setIncomeTabsIndex(index);
  }

  const handleSelectedAccountID = (id:string,cardNum:number) => {
    setSelectedCard({...selectedCard, cardId: id, cardNum:cardNum})
    setopenBackdrop(true);
    getIncomesAll(id);
  }

  const handleFilterChange = (filter:string) => {
    setFilter(filter);
  }

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
                <IncomeTabs tabIndex={IncomeTabsIndex} handleIndexChange={SetIndexChange}/>
                <Accounts handleAddAccount={addAccountDialog} cards={accounts} selectedAccountID={handleSelectedAccountID}/>
                <Filter value={filter} filterChange={handleFilterChange}/>
                {IncomeTabsIndex === 0 ?
                  <IncomeStats data={incomesStats} filter={filter} />
                : 
                  <IncomeTable handleAddIncome={addIncomeDialog} data={incomes}/>
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
