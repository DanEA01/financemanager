import { Avatar, Box, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
//Charts
import Chart from "react-apexcharts";
//Icons
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

export const DashboardBody = () => {

    const [overallDataDisplay, setoverallDataDisplay] = useState({
        ingresos: 0,
        gastos: 0,
        ahorros: 0,
        balance: 0
    })
    const [graphs, setgraphs] = useState<any>(
        { 
            overallReport: {
            options:{
                chart: {
                    events: {
                        dataPointSelection: function(event:any, chartContext:any, config:any) {
                            setoverallDataDisplay({...overallDataDisplay, ingresos: config.w.config.series[0].data[config.dataPointIndex], gastos:config.w.config.series[1].data[config.dataPointIndex], balance: (config.w.config.series[0].data[config.dataPointIndex] - config.w.config.series[1].data[config.dataPointIndex])})
                        }
                    }
                  },
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 5,
                    },
                },
                xaxis: {
                    categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"]
                },
                colors: ['#4DB6AC', '#C62828', '#7986CB'],
            },
            series:[
                {
                    name: 'Ingresos',
                    data: [9500, 10500, 9800, 9500, 9750, 9800, 9600]
                },
                {
                    name: 'Gastos',
                    data: [8000, 9500, 7500, 7000, 10500, 7000, 6850]
                },
            ]
            },
            balanceReport:{
                series: [{
                    name: "Balance",
                    data: [1500, -200, 350, 400, 2500, 1000, -250]
                }],
                options: {
                  chart: {
                    events: {
                        markerClick: function(event:any, chartContext:any, config:any) {
                            setoverallDataDisplay({...overallDataDisplay, balance: config.w.config.series[config.seriesIndex].data[config.dataPointIndex] });
                        }
                      }
                  },
                  stroke: {
                    width: 5,
                    curve: 'smooth'
                  },
                  colors: ['#FFFFFF'],
                  grid: {
                    show: false,
                  },
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
            },
            incomeVsExpenses:{
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
                        name: "Gastos",
                        data: [15000, 17000, 20000, 14000, 13500, 9800, 16540]
                    },
                    {
                        name: "Limite Gastos",
                        data: [14000, 14000, 14000, 14000, 14000, 14000, 14000]
                    }
                ],
            }
        }
    )

    const generateRandomColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16)
    }

  return (
    <Grid container spacing={3} sx={{marginY: '20px'}}>
        <Grid item direction="row" xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography color="white" className='card-title'>Detalle Anual</Typography>
                                            </Grid>
                                            <Grid item xs={6}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-evenly">
                                            <Grid item xs={4}>
                                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                                    <Grid item>
                                                        <Avatar variant="rounded" sx={{backgroundColor:'#00796B'}}>
                                                            <LocalAtmIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>${overallDataDisplay.ingresos}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Ingresos</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                                    <Grid item>
                                                        <Avatar variant="rounded" sx={{backgroundColor:'#C62828'}}>
                                                            <ShoppingBagOutlinedIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>${overallDataDisplay.gastos}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Gastos</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                                    <Grid item>
                                                        <Avatar variant="rounded" sx={{backgroundColor:'#283593'}}>
                                                            <SavingsOutlinedIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>${overallDataDisplay.balance}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Balance</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={graphs.overallReport.options}
                                            series={graphs.overallReport.series}
                                            type="bar"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Card sx={{backgroundColor: '#757575'}} className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Typography className='card-title-white'>Gastos Principales</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <List sx={{ width: '100%'}}>
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <LocalOfferOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Super" secondary="$5,500"/>
                                        </ListItem>
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <LocalOfferOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Compras" secondary="$4,300" />
                                        </ListItem>
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <LocalOfferOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Casa" secondary="$2,000" />
                                        </ListItem>
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <LocalOfferOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Comida" secondary="$1,950" />
                                        </ListItem>
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <LocalOfferOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Otros" secondary="$1,500" />
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
