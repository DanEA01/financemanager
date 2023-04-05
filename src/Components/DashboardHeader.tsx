import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
//Icons
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
//css
import '../assets/css/Main.css'
import { Stack } from '@mui/system';


export const DashboardHeader = (props:any) => {

    const numberToCurrency = (num:any) => {
        const formatter = new Intl.NumberFormat('es-MX');
        return '$ '+formatter.format(num);
    }

  return (
    <Grid container spacing={3}>
        <Grid item direction="row" xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Card className='card1'>
                        <div className='card1-circle1'></div>
                        <div className='card1-circle2'></div>
                        <Box padding="18px">
                            <CardContent>
                                <Avatar variant="rounded" sx={{backgroundColor:'#00796B'}}>
                                    <LocalAtmIcon />
                                </Avatar>
                                <Stack direction="row" spacing={1} alignItems="center" alignContent="center">
                                    <Typography color="white" className='card-amount'>{numberToCurrency(props.incomeSum)}</Typography>
                                    <Avatar sx={{backgroundColor:'#abd2ce', width: 24, height: 24 }}>
                                        <TrendingUpIcon sx={{fontSize: '1.1rem', color:'#009688'}}/>
                                    </Avatar>
                                </Stack>
                                <Typography color="white" className='card1-subText'>Ingresos</Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Card className='card2'>
                        <div className='card2-circle1'></div>
                        <div className='card2-circle2'></div>
                        <Box padding="18px">
                            <CardContent>
                                <Avatar variant="rounded" sx={{backgroundColor:'#C62828'}}>
                                    <ShoppingBagOutlinedIcon />
                                </Avatar>
                                <Stack direction="row" spacing={1} alignItems="center" alignContent="center">
                                    <Typography color="white" className='card-amount'>{numberToCurrency(props.expensesSum)}</Typography>
                                    <Avatar sx={{backgroundColor:'#f7b6b5', width: 24, height: 24 }}>
                                        <TrendingDownIcon sx={{fontSize: '1.1rem', color:'#E53935'}}/>
                                    </Avatar>
                                </Stack>
                                <Typography color="white" className='card2-subText'>Gastos</Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Card className='card3'>
                        <div className='card3-circle1'></div>
                        <div className='card3-circle2'></div>
                        <Box padding="18px">
                            <CardContent>
                                <Avatar variant="rounded" sx={{backgroundColor:'#283593'}}>
                                    <SavingsOutlinedIcon />
                                </Avatar>
                                <Stack direction="row" spacing={1} alignItems="center" alignContent="center">
                                    <Typography color="white" className='card-amount'>{numberToCurrency(props.balance)}</Typography>
                                    <Avatar sx={{backgroundColor:'#a9b1e2', width: 24, height: 24 }}>
                                        <TrendingDownIcon sx={{fontSize: '1.1rem', color:'#3F51B5'}}/>
                                    </Avatar>
                                </Stack>
                                <Typography color="white" className='card3-subText'>Balance</Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}
