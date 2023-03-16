import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react'
//Charts
import Chart from "react-apexcharts";
//Icons
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

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
                            setoverallDataDisplay({...overallDataDisplay, ingresos: config.w.config.series[0].data[config.dataPointIndex], gastos:config.w.config.series[1].data[config.dataPointIndex], ahorros: config.w.config.series[2].data[config.dataPointIndex]})
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
                colors: ['#4DB6AC', '#E57373', '#7986CB'],
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
                {
                    name: 'Ahorro',
                    data: [2500, 1000, 500, 2000, 0, 3000, 485]
                }
            ]
            },
            balanceReport:{
                series: [{
                    name: "Balance",
                    data: [1500, -200, 350, 400, 2500, 1000, -250, -2000, 180]
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
            }
        }
    )

  return (
    <Grid container spacing={3} sx={{marginY: '20px'}}>
        <Grid item direction="row" xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Card>
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
                                                        <Typography color="white" className='card-title'>${overallDataDisplay.ahorros}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Ahorros</Typography>
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
                    <Card sx={{backgroundColor: '#546E7A'}}>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Typography className='card-title-white'>Balance</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="white" className='card-amount'>${overallDataDisplay.balance}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={graphs.balanceReport.options}
                                            series={graphs.balanceReport.series}
                                            type="line"
                                        />
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-evenly">
                                            <Grid item sm={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Typography color="white" >Ingresos</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" >${overallDataDisplay.ahorros}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Typography color="white" >Gastos</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" >${overallDataDisplay.ahorros}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
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
