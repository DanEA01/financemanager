import { Avatar, Box, Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
//Charts
import Chart from "react-apexcharts";
//Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';


export const IncomeStats = (props:any) => {
    const [statsData, setStatsData] = useState<any>('');
    const [chartsSet, setChartsSet] = useState<any>({
        yearIncomes: {
            series:[
                {
                    name: "Ingresos Fijos",
                    data: [0]
                },
                {
                    name: "Ingresos Variables",
                    data: [0]
                },
            ],
            labels: [''],
            incomeFijoSum: 0,
            incomeVariableSum: 0,
            //variable to show or hide chart if it has no data
            show:false
        },
    });
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']    

    useEffect(() => {
        if(props.data !== null){
          setStatsData(props.data)
        }
      }, [props.data])

    useEffect(() => {
        if(statsData !== ''){
            setYearIncStats(statsData.incomesStatsByYear.incomesByType);
        }
    }, [statsData])

    const numberToCurrency = (num:any) => {
        const formatter = new Intl.NumberFormat('es-MX');
        return '$ '+formatter.format(num);
    }

    const generateRandomColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16)
    }

    const setYearIncStats = (data:any) => {
        let incomeFijoSum = 0;
        let incomeVariableSum = 0;
        let incomeFijo:any = [];
        let incomeVariable:any = [];
        let labels:any = [];
        let labels2:any = [];

        if(data !== undefined){
            let lastKeyFijo:any = data.Fijo !== undefined ? Object.keys(data.Fijo).pop() : -1;
            let firstKeyFijo:any = data.Fijo !== undefined ? Object.keys(data.Fijo)[0] : 100;
            let lastKeyVariable:any = data.Variable !== undefined ? Object.keys(data.Variable).pop() : -1;
            let firstKeyVariable:any = data.Variable !== undefined ? Object.keys(data.Variable)[0] : 100;
            let firstKey = firstKeyFijo <= firstKeyVariable ? firstKeyFijo : firstKeyVariable;
            let lastKey = lastKeyFijo >= lastKeyVariable ? lastKeyFijo : lastKeyVariable;
            //let firstKey:any = Object.keys(data.Fijo)[0] <= Object.keys(data.Variable)[0] ? Object.keys(data.Fijo)[0] : Object.keys(data.Variable)[0];
            
            for(let i=firstKey;i<=lastKey;i++){
                data.Fijo !== undefined ? data.Fijo[i] !== undefined  ? incomeFijo.push(data.Fijo[i]) : incomeFijo.push(0) : incomeFijo.push(0);
                data.Fijo !== undefined ? data.Fijo[i] !== undefined  ? incomeFijoSum += data.Fijo[i] : incomeFijoSum += 0 : incomeFijoSum += 0;
                data.Variable !== undefined  ? data.Variable[i] !== undefined ? incomeVariable.push(data.Variable[i]) : incomeVariable.push(0) : incomeVariable.push(0);
                data.Variable !== undefined  ? data.Variable[i] !== undefined ? incomeVariableSum += data.Variable[i] : incomeVariableSum += 0 : incomeVariableSum += 0;
            }

            if(data.Fijo !== undefined){
                //get the sum of expenses Fijo and the month labels
                Object.keys(data.Fijo).map((key:any) => {
                    labels.push(months[key]);
                })
            }
            if(data.Variable !== undefined){
                //get the sum of expenses Variable and the month labels
                Object.keys(data.Variable).map((key:any) => {
                    labels2.push(months[key]);
                })
            }
            /* //Combine the 2 labels and remove duplicates
            this will create an array of the months the expenses took place */
            labels = labels.concat(labels2.filter((item:any) => labels.indexOf(item) < 0));
        }

        setChartsSet((prevChartSet:any) => ({
            ...prevChartSet,
            yearIncomes: {
                ...prevChartSet.yearIncomes,
                series:[
                    {
                        name: "Ingresos Fijos",
                        data: incomeFijo
                    },
                    {
                        name: "Ingresos Variables",
                        data: incomeVariable
                    },
                ],
                labels:labels,
                incomeFijoSum:incomeFijoSum,
                incomeVariableSum:incomeVariableSum,
                show: data !== undefined ? true : false,
            }
        }));
        
    }

    const yearExpensesChart: any = {
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
            categories: chartsSet.yearIncomes.labels,
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
                                                    <Typography color="white" className='card-amount'>{numberToCurrency(statsData.totalIncome)}</Typography>
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(chartsSet.yearIncomes.incomeFijoSum)}</Typography>
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(chartsSet.yearIncomes.incomeVariableSum)}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Ingreso Variable</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={yearExpensesChart}
                                            series={chartsSet.yearIncomes.series}
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
                                        {statsData.incomesStatsByMonth !== undefined ?
                                        Object.keys(statsData.incomesStatsByMonth).map((key, index) => {
                                            return (
                                            <ListItem className='expenses-li' sx={{backgroundColor: 'white'}} key={"income"+index}>
                                                <ListItemAvatar>
                                                <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                    <MonetizationOnOutlinedIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={key} secondary={numberToCurrency(statsData.incomesStatsByMonth[key])}/>
                                            </ListItem>
                                            );
                                        }) :null}
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
