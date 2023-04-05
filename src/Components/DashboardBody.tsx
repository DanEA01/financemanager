import { Avatar, Box, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
//Charts
import Chart from "react-apexcharts";
//Icons
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

export const DashboardBody = (props:any) => {
    const [statsData, setStatsData] = useState<any>('');
    const [expensesData, setExpensesData] = useState<any>('');
    const [overallDataDisplay, setoverallDataDisplay] = useState({
        ingresos: 0,
        gastos: 0,
        balance: 0
    })
    const [chartsSet, setChartsSet] = useState<any>({
        yearReport: {
            series:[
                {
                    name: "Ingresos",
                    data: [0]
                },
                {
                    name: "Gastos",
                    data: [0]
                },
            ],
            labels: [''],
        },
    });
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']    

    useEffect(() => {
        if(props.data !== null){
            setStatsData(props.data)
        }
    }, [props.data])

    useEffect(() => {
        if(props.topExpenses !== null){
            console.log(props.topExpenses);
            setExpensesData(props.topExpenses)
        }
    }, [props.topExpenses])

    useEffect(() => {
        if(statsData !== ''){
            setYearReportStats(statsData);
        }
    }, [statsData])

    const setYearReportStats = (data:any) => {
        let income:any = [];
        let expense:any = [];
        let labels:any = [];
        let labels2:any = [];
        let labelMonths:any = [];
        
        if(data !== undefined){
            let lastKeyIncome:any = data.incomes.incomeByMonth !== undefined ? Object.keys(data.incomes.incomeByMonth).pop() : -1;
            let firstKeyIncome:any = data.incomes.incomeByMonth !== undefined ? Object.keys(data.incomes.incomeByMonth)[0] : 100;
            let lastKeyExpense:any = data.expenses.expensesByMonth !== undefined ? Object.keys(data.expenses.expensesByMonth).pop() : -1;
            let firstKeyExpense:any = data.expenses.expensesByMonth !== undefined ? Object.keys(data.expenses.expensesByMonth)[0] : 100;
            let firstKey = firstKeyIncome <= firstKeyExpense ? firstKeyIncome : firstKeyExpense;
            let lastKey = lastKeyIncome >= lastKeyExpense ? lastKeyIncome : lastKeyExpense;
            
            for(let i=firstKey;i<=lastKey;i++){
                data.incomes.incomeByMonth !== undefined ? data.incomes.incomeByMonth[i] !== undefined  ? income.push(data.incomes.incomeByMonth[i]) : income.push(0) : income.push(0);
                data.expenses.expensesByMonth !== undefined  ? data.expenses.expensesByMonth[i] !== undefined ? expense.push(data.expenses.expensesByMonth[i]) : expense.push(0) : expense.push(0);
            }
            
            
            if(data.incomes.incomeByMonth !== undefined){
                //get the sum of expenses Fijo and the month labels
                Object.keys(data.incomes.incomeByMonth).map((key:any) => {
                    labels.push(key);
                })
            }
            if(data.expenses.expensesByMonth !== undefined){
                //get the sum of expenses Variable and the month labels
                Object.keys(data.expenses.expensesByMonth).map((key:any) => {
                    labels2.push(key);
                })
            }
            /* //Combine the 2 labels and remove duplicates
            this will create an array of the months the expenses took place */
            labels = labels.concat(labels2.filter((item:any) => labels.indexOf(item) < 0));
            labels.sort();
            labelMonths = labels.map((label:any) => {
                return(months[label])
            })
            
        }

            setChartsSet((prevChartSet:any) => ({
                ...prevChartSet,
                yearReport: {
                    ...prevChartSet.yearReport,
                    series:[
                        {
                            name: "Ingresos",
                            data: income
                        },
                        {
                            name: "Gastos",
                            data: expense
                        },
                    ],
                    labels:labelMonths,
                }
            }));
    }
    
    const yearReport: any = {
        chart: {
            events: {
                dataPointSelection: function(event:any, chartContext:any, config:any) {
                    props.barClick(months.indexOf(config.w.config.xaxis.categories[config.dataPointIndex]));
                    setoverallDataDisplay({...overallDataDisplay, ingresos: config.w.config.series[0].data[config.dataPointIndex], gastos:config.w.config.series[1].data[config.dataPointIndex], balance: (config.w.config.series[0].data[config.dataPointIndex] - config.w.config.series[1].data[config.dataPointIndex])})
                }
            }
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: chartsSet.yearReport.labels
        },
        colors: ['#4DB6AC', '#C62828', '#7986CB'],
    }

    const generateRandomColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16)
    }

    const numberToCurrency = (num:any) => {
        const formatter = new Intl.NumberFormat('es-MX');
        return '$ '+formatter.format(num);
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(overallDataDisplay.ingresos)}</Typography>
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(overallDataDisplay.gastos)}</Typography>
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(overallDataDisplay.balance)}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Balance</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={yearReport}
                                            series={chartsSet.yearReport.series}
                                            type="bar"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Grid container direction='column' spacing={2}>
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
                                            {expensesData.expenses !== undefined ?
                                            expensesData.expenses.expensesByType !== undefined ?
                                            Object.keys(expensesData.expenses.expensesByType).map((key, index) => {
                                                return (
                                                <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                                    <ListItemAvatar>
                                                    <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                        <LocalOfferOutlinedIcon />
                                                    </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={key} secondary={numberToCurrency(expensesData.expenses.expensesByType[key])}/>
                                                </ListItem>
                                                );
                                            }) :null : null}
                                            </List>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Card sx={{backgroundColor: '#d2c8bf'}} className='card'>
                                <Box padding="18px">
                                    <CardContent>
                                        <Grid container spacing={3} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <Typography className='card-title-white'>Ingresos Principales</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                            <List sx={{ width: '100%'}}>
                                            {expensesData.incomes !== undefined ?
                                            expensesData.incomes.incomeByType !== undefined ?
                                            Object.keys(expensesData.incomes.incomeByType).map((key, index) => {
                                                return (
                                                <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                                    <ListItemAvatar>
                                                    <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                        <MonetizationOnOutlinedIcon />
                                                    </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={key} secondary={numberToCurrency(expensesData.incomes.incomeByType[key])}/>
                                                </ListItem>
                                                );
                                            }) :null : null}
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
        </Grid>
    </Grid>
  )
}
