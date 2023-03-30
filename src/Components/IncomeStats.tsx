import { Avatar, Box, Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
//Charts
import Chart from "react-apexcharts";
//Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';


export const IncomeStats = () => {

    const [graphs, setgraphs] = useState<any>(
        {
            yearIncome: {
                options: {
                    chart: {
                      type: 'area'
                    },
                    dataLabels: {
                      enabled: false
                    },
                    stroke: {
                      curve: 'smooth'
                    },
                    grid: {
                      show: false,
                    },
                    colors: ['#90CAF9', '#E1BEE7'],
                    xaxis: {
                        show: false,
                        categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
                        labels: {
                          show: false
                        },
                        axisBorder: {
                          show: false
                        },
                        axisTicks: {
                          show: false
                        },
                    },
                    yaxis: {
                        show: false,
                        labels: {
                          show: false
                        },
                        axisBorder: {
                          show: false
                        },
                        axisTicks: {
                          show: false
                        }
                    },
                },
                series: [
                    {
                        name: "Ingresos Fijos",
                        data: [15000, 17000, 20000, 14000, 13500, 9800, 16540]
                    },
                    {
                        name: "Ingresos Variables",
                        data: [14000, 14000, 14000, 14000, 14000, 14000, 14000]
                    }
                ],
            },
        }
    )

    const generateRandomColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16)
    }

  return (
    <Grid container spacing={3} sx={{marginY: '20px'}}>
        <Grid item direction="row" xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card className='card5'>
                                <div className='card5-circle1'></div>
                                <div className='card5-circle2'></div>
                                <Box padding="18px">
                                    <CardContent>
                                        <Grid container spacing={3} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs={6}>
                                                        <Typography className='card-title-white'>Total Ingresos</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack direction="row" spacing={1} alignItems="center" alignContent="center">
                                                    <Typography color="white" className='card-amount'>$25,000</Typography>
                                                    <Avatar sx={{backgroundColor:'#E8EAF6', width: 24, height: 24 }}>
                                                        <TrendingDownIcon sx={{fontSize: '1.1rem', color:'#5C6BC0'}}/>
                                                    </Avatar>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography color="white" className='card-title'>Ingresos</Typography>
                                            </Grid>
                                            <Grid item xs={6}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-evenly">
                                            <Grid item xs={6}>
                                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                                    <Grid item>
                                                        <Avatar variant="rounded" sx={{backgroundColor:'#00796B'}}>
                                                            <CurrencyExchangeOutlinedIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>$0</Typography>
                                                        <Typography color="white" className='card-subtitle'>Ingreso Fijo</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                                    <Grid item>
                                                        <Avatar variant="rounded" sx={{backgroundColor:'#C62828'}}>
                                                            <MonetizationOnOutlinedIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>$0</Typography>
                                                        <Typography color="white" className='card-subtitle'>Ingreso Variable</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={graphs.yearIncome.options}
                                            series={graphs.yearIncome.series}
                                            type="area"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Card sx={{backgroundColor: '#00897B'}} className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Typography className='card-title-white'>Ingresos Principales</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <List sx={{ width: '100%'}}>
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <MonetizationOnOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Nomina" secondary="$13,500"/>
                                        </ListItem>
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <MonetizationOnOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Dividendos" secondary="$25,500" />
                                        </ListItem>
                                    </List>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}
