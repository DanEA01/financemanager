import { Avatar, Box, Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React, { useState } from 'react';
//Charts
import Chart from "react-apexcharts";
//Icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';


export const ExpensesStats = () => {

    const [graphs, setgraphs] = useState<any>({
        balance:{
            options:{
                radialBar: {
                    hollow: {
                      size: '70%',
                    }
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            value: {
                            formatter: function (val:any) {
                                return "$ 9,460.00";
                            }
                            }
                        }
                    }
                },
                labels: ['Saldo'],
                colors: ['#A5D6A7']
            },
            series:[70],
        },
        yearExpenses: {
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
        },
        typeofExpense: {
            options: {
                chart: {
                    stacked: true,
                    toolbar: {
                      show: true
                    },
                    zoom: {
                      enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                      legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                      }
                    }
                  }],
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 10,
                      dataLabels: {
                        total: {
                          enabled: true,
                          style: {
                            fontSize: '13px',
                            fontWeight: 900
                          }
                        }
                      }
                    },
                  },
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
                  colors: ['#8D6E63', '#26A69A'],
            },
            series: [
              {
                name: 'Gastos Fijos',
                data: [2300, 2400, 2100, 3200, 1200, 3000]
              }, {
                name: 'Gastos Variables',
                data: [8500, 8000, 7700, 5850, 9580, 1000]
              }
            ]
              
        },
        expensesMap: {
            options: {
                legend: {
                  show: true
                },
                plotOptions: {
                    treemap: {
                      distributed: false,
                      enableShades: false
                    }
                },
                colors: ['#8D6E63', '#26A69A'],
            },
            series: [
                {
                  name: 'Gastos Fijos',  
                  data: [
                    {
                      x: 'Comida',
                      y: 3520
                    },
                    {
                      x: 'Super',
                      y: 4500
                    },
                    {
                      x: 'Mantenimiento',
                      y: 1200
                    },
                    {
                       x: 'Total Play',
                       y: 700
                    }
                  ]
                },
                {
                  name: 'Gastos Variables',  
                  data: [
                    {
                      x: 'Ropa',
                      y: 1200
                    },
                    {
                      x: 'Casa',
                      y: 1000
                    },
                    {
                      x: 'Otros',
                      y: 836
                    }]
                }
            ]
        },
    })

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
                            <Card className='card2'>
                                <div className='card2-circle1'></div>
                                <div className='card2-circle2'></div>
                                <Box padding="18px">
                                    <CardContent>
                                        <Grid container spacing={3} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs={6}>
                                                        <Typography className='card-title-white'>Total Gastos</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack direction="row" spacing={1} alignItems="center" alignContent="center">
                                                    <Typography color="white" className='card-amount'>$25,000</Typography>
                                                    <Avatar sx={{backgroundColor:'#f7b6b5', width: 24, height: 24 }}>
                                                        <TrendingDownIcon sx={{fontSize: '1.1rem', color:'#E53935'}}/>
                                                    </Avatar>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className='card4'>
                                <div className='card4-circle1'></div>
                                <div className='card4-circle2'></div>
                                <Box padding="18px">
                                    <CardContent>
                                        <Grid container spacing={3} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs={6}>
                                                        <Typography className='card-title-white'>Limite de Gasto</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                            <Stack direction="row" spacing={1} alignItems="center" alignContent="center">
                                                <Typography color="white" className='card-amount'>$15,000</Typography>
                                                <Avatar sx={{backgroundColor:'#D1C4E9', width: 24, height: 24 }}>
                                                    <TrendingDownIcon sx={{fontSize: '1.1rem', color:'#7B1FA2'}}/>
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
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography className='card-title'>Saldo Restante</Typography>
                                            </Grid>
                                            <Grid item xs={6}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <Chart
                                        options={graphs.balance.options}
                                        series={graphs.balance.series}
                                        type="radialBar"
                                        height={300}
                                    />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography className='card-title'>Datos de Tarjeta</Typography>
                                            </Grid>
                                            <Grid item xs={6}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <List sx={{ width: '100%'}}>
                                            <ListItem className='expenses-li' sx={{backgroundColor: '#C5CAE9'}}>
                                                <ListItemAvatar>
                                                <Avatar sx={{backgroundColor: '#78909C'}}>
                                                    <StarBorderIcon/>
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Fecha de Corte" secondary="22 de Mes"/>
                                            </ListItem>
                                            <ListItem className='expenses-li' sx={{backgroundColor: '#E1BEE7'}}>
                                                <ListItemAvatar>
                                                <Avatar sx={{backgroundColor: '#78909C'}}>
                                                    <StarBorderIcon/>
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Fecha de Pago" secondary="30 de Mes"/>
                                            </ListItem>
                                            <ListItem className='expenses-li' sx={{backgroundColor: '#B2DFDB'}}>
                                                <ListItemAvatar>
                                                <Avatar sx={{backgroundColor: '#78909C'}}>
                                                    <StarBorderIcon/>
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Límite de gasto" secondary="$ 9,500.00"/>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography color="white" className='card-title'>Balance</Typography>
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
                                                            <ShoppingBagOutlinedIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>$0</Typography>
                                                        <Typography color="white" className='card-subtitle'>Gastos</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                                    <Grid item>
                                                        <Avatar variant="rounded" sx={{backgroundColor:'#C62828'}}>
                                                            <ProductionQuantityLimitsIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>$0</Typography>
                                                        <Typography color="white" className='card-subtitle'>Limite Gastos</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={graphs.yearExpenses.options}
                                            series={graphs.yearExpenses.series}
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
                <Grid item xs={12} sm={12} md={12} lg={7}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography color="white" className='card-title'>Gastos Fijos vs Variables</Typography>
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
                                                            <LocalAtmIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>$0</Typography>
                                                        <Typography color="white" className='card-subtitle'>Gastos Fijos</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                                    <Grid item>
                                                        <Avatar variant="rounded" sx={{backgroundColor:'#C62828'}}>
                                                            <ShoppingBagOutlinedIcon />
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="white" className='card-title'>$0</Typography>
                                                        <Typography color="white" className='card-subtitle'>Gastos Variables</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={graphs.typeofExpense.options}
                                            series={graphs.typeofExpense.series}
                                            type="bar"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography color="white" className='card-title'>Gastos Principales a Detalle</Typography>
                                            </Grid>
                                            <Grid item xs={6}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={graphs.expensesMap.options}
                                            series={graphs.expensesMap.series}
                                            type="treemap"
                                        />
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
