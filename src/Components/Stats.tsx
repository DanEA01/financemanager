import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react';
//Charts
import Chart from "react-apexcharts";
//Icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CircleIcon from '@mui/icons-material/Circle';


const PageTitle = styled('div')(({ theme }) => ({
    marginBottom: '10px',
    padding: '30px',
}))

export const Stats = () => {

    const [graphs, setgraphs] = useState({
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
        expenses: {
            options:{
                  plotOptions: {
                    radialBar: {
                      offsetY: 0,
                      startAngle: 0,
                      endAngle: 270,
                      hollow: {
                        margin: 5,
                        size: '30%',
                        background: 'transparent',
                        image: undefined,
                      },
                      dataLabels: {
                        name: {
                          show: false,
                        },
                        value: {
                          show: false,
                        }
                      }
                    }
                  },
                  colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#0077B5'],
                  labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn','abc'],
                  legend: {
                    show: true,
                    floating: true,
                    fontSize: '16px',
                    offsetX: 200,
                    offsetY: 0,
                    labels: {
                      useSeriesColors: true,
                    },
                    formatter: function(seriesName:any, opts:any) {
                      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                    },
                  },
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      legend: {
                          show: false
                      }
                    }
                  }]
            },
            series:[30,20,18,8,4],
        },
        yearExpenses: {
            options:{
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"]
                },
                colors: ['#90CAF9', '#E1BEE7'],
            },
            series:[
                {
                    name: 'Gastos',
                    data: [9500, 8700, 9800, 13000, 10658, 5412, 9123]
                },
                {
                    name: 'Limite',
                    data: [9500, 9500, 9500, 9500, 9500, 9500, 9500]
                }
            ]
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
                  xaxis: {
                    categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"]
                  },
                  colors: ['#90CAF9', '#E1BEE7'],
            },
            series: [
              {
                name: 'Gastos Fijos',
                data: [44, 55, 41, 67, 22, 43]
              }, {
                name: 'Gastos Variables',
                data: [13, 23, 20, 8, 13, 27]
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
                colors: ['#90CAF9', '#E1BEE7'],
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
        expensesMapDetail:{
            options: {
                legend: {
                  show: true
                },
                plotOptions: {
                    treemap: {
                      distributed: true,
                      enableShades: false
                    }
                },
                colors: ['#90CAF9', '#E1BEE7', '#FFCDD2', '#F8BBD0', '#C5CAE9', '#BBDEFB', '#B2DFDB', '#DCEDC8'],
            },
            series: [
                {
                  data: [
                    {
                      x: 'Carne',
                      y: 1200
                    },
                    {
                      x: 'Lacteos',
                      y: 500
                    },
                    {
                      x: 'Limpieza',
                      y: 600
                    },
                    {
                       x: 'Otros',
                       y: 700
                    }
                  ]
                },
            ]
        }
    })

  return (
    <>  
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{paddingX: '30px'}}>
            <PageTitle sx={{paddingLeft: "0"}}>
                <Typography variant='h6'>Estadisticas</Typography>
            </PageTitle>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<FilterAltIcon />}>Filtro</Button>
                <Button variant="contained">Agregar Gasto</Button>
            </Stack>
        </Stack>
        <Grid container direction="row" spacing={2} sx={{paddingX: '30px'}}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant='body1' color="inherit">Saldo Restante</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex'}}>
                            <Chart
                                options={graphs.balance.options}
                                series={graphs.balance.series}
                                type="radialBar"
                                width="120%"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant='body1' color="inherit">Datos de Tarjeta</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex'}}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem sx={{padding: '10px', borderRadius: '10px', margin: '10px', backgroundColor: '#C5CAE9'}}>
                                    <ListItemIcon>
                                        <CircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Fecha de Corte" secondary="22 de Mes" />
                                </ListItem>
                                <ListItem sx={{padding: '10px', borderRadius: '10px', margin: '10px', backgroundColor: '#E1BEE7'}}>
                                    <ListItemIcon>
                                        <CircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Fecha de Pago" secondary="30 de Mes" />
                                </ListItem>
                                <ListItem sx={{padding: '10px', borderRadius: '10px', margin: '10px', backgroundColor: '#B2DFDB'}}>
                                    <ListItemIcon>
                                        <CircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Límite de gasto" secondary="$ 9,500.00" />
                                </ListItem>
                            </List>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card sx={{backgroundColor: '#f1416c'}}>
                    <CardContent>
                        <Typography variant='body1' color="white">Total Gastos</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex',paddingY:'50px'}}>
                            <Typography variant='h2' color="white">$ 19,500.00</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <PageTitle>
            <Typography variant='h6'>Detalle de Gastos</Typography>
        </PageTitle>
        <Grid container direction="row" spacing={2} sx={{paddingX: '30px'}}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant='body1' color="inherit">Gastos Principales</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex',paddingY:'50px'}}>
                            <Chart
                                options={graphs.expenses.options}
                                series={graphs.expenses.series}
                                type="radialBar"
                                width="450"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant='body1' color="inherit">Gastos Principales</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex',paddingY:'50px'}}>
                            <Chart
                                options={graphs.expensesMap.options}
                                series={graphs.expensesMap.series}
                                type="treemap"
                                width="450"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant='body1' color="inherit">Super</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex',paddingY:'50px'}}>
                            <Chart
                                options={graphs.expensesMapDetail.options}
                                series={graphs.expensesMapDetail.series}
                                type="treemap"
                                width="450"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <PageTitle>
            <Typography variant='h6'>Detalle Anual</Typography>
        </PageTitle>
        <Grid container direction="row" spacing={2} sx={{paddingX: '30px'}}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant='body1' color="inherit">Gastos Fijos /  Variables</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex',paddingY:'50px'}}>
                            <Chart
                                options={graphs.typeofExpense.options}
                                series={graphs.typeofExpense.series}
                                type="bar"
                                width="450"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8}>
                <Card>
                    <CardContent>
                        <Typography variant='body1' color="inherit">Gastos Anuales</Typography>
                        <Box justifyContent="center" alignItems="center" sx={{display:'flex',paddingY:'50px'}}>
                            <Chart
                                options={graphs.yearExpenses.options}
                                series={graphs.yearExpenses.series}
                                type="area"
                                width={800}
                                height={350}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        
    </>
  )
}
