import { Avatar, Box, Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
//Charts
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
//Icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';


export const ExpensesStats = (props:any) => {
    const [statsData, setStatsData] = useState<any>('');
    const [chartsSet, setChartsSet] = useState<any>({
        balance: [0],
        yearExpenses: {
            series:[
                {
                    name: "Gastos",
                    data: [0]
                },
                {
                    name: "Limite Gastos",
                    data: [0]
                },
            ],
            labels: [''],
            expenseSum: 0,
            limitSum: 0,
            //variable to show or hide chart if it has no data
            show:false
        },
        yearExpensesType: {
            series:[
                {
                    name: "Gastos Fijos",
                    data: [0]
                },
                {
                    name: "Gastos Variables",
                    data: [0]
                },
            ],
            labels: [''],
            expenseFijoSum: 0,
            expenseVariableSum: 0,
            //variable to show or hide chart if it has no data
            show:false
        },
        yearExpensesMap: {
            series:[
                {
                    name: "Gastos Fijos",
                    data: [{x:'', y:0}]
                },
                {
                    name: "Gastos Variables",
                    data: [{x:'', y:0}]
                },
            ],
            //variable to show or hide chart if it has no data
            show:false
        }
    });
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']    

    useEffect(() => {
      if(props.data !== null){
        setStatsData(props.data)
      }
    }, [props.data])

    useEffect(() => {
        if(statsData !== ''){
            setChartsSet({...chartsSet ,balance: [statsData.balacePerc]});
            setYearExpStats(statsData.expensesStatsByYear.expensesByMonth,statsData.limit);
            setYearExpStatsType(statsData.expensesStatsByYear.expensesByType);
            setYearExpStatsMap(statsData.expensesStatsByYear.expensesByTypenTag);
        }
    }, [statsData])
    
    const numberToCurrency = (num:any) => {
        const formatter = new Intl.NumberFormat('es-MX');
        return '$ '+formatter.format(num);
    }
    
    const generateRandomColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16)
    }

    const setYearExpStats = (data:any, limit:number) => {
        let labels:any = [];
        let limits:any = [];
        let expenseSum = 0;
        let limitSum = 0;
        const expenses = data !== undefined ? Object.values(data) : [];
        if(data !== undefined){
            //get the sum of expenses and limit for the yearly data
            Object.keys(data).map((key:any) => {
                expenseSum += data[key];
                // /12 to take down the limit to each month
                limitSum += (limit/12);
                labels.push(months[key]);
                limits.push(limit/12);
            })
        }
        setChartsSet((prevChartSet:any) => ({
            ...prevChartSet,
            yearExpenses: {
                ...prevChartSet.yearExpenses,
                series:[
                    {
                        name: "Gastos",
                        data: expenses
                    },
                    {
                        name: "Limite Gastos",
                        data: limits
                    },
                ],
                labels:labels,
                expenseSum:expenseSum,
                limitSum:limitSum,
                show: data !== undefined ? true : false,
            }
        }));
    }

    const setYearExpStatsType = (data:any) => {
        let labels:any = [];
        let labels2:any = [];
        let expenseFijoSum = 0;
        let expenseVariableSum = 0;
        const expensesFijo:any = [];
        const expensesVariable:any = [];

        if(data !== undefined){
            let lastKeyFijo:any = data.Fijo !== undefined ? Object.keys(data.Fijo).pop() : -1;
            let firstKeyFijo:any = data.Fijo !== undefined ? Object.keys(data.Fijo)[0] : 100;
            let lastKeyVariable:any = data.Variable !== undefined ? Object.keys(data.Variable).pop() : -1;
            let firstKeyVariable:any = data.Variable !== undefined ? Object.keys(data.Variable)[0] : 100;
            let firstKey = firstKeyFijo <= firstKeyVariable ? firstKeyFijo : firstKeyVariable;
            let lastKey = lastKeyFijo >= lastKeyVariable ? lastKeyFijo : lastKeyVariable;

            for(let i=firstKey;i<=lastKey;i++){
                data.Fijo !== undefined ? data.Fijo[i] !== undefined  ? expenseFijoSum += data.Fijo[i] : expenseFijoSum += 0 : expenseFijoSum += 0;
                data.Fijo !== undefined ? data.Fijo[i] !== undefined  ? expensesFijo.push(data.Fijo[i]) : expensesFijo.push(0) : expensesFijo.push(0);
                data.Variable !== undefined ? data.Variable[i] !== undefined  ? expenseVariableSum += data.Variable[i] : expenseVariableSum += 0 : expenseVariableSum += 0;
                data.Variable !== undefined ? data.Variable[i] !== undefined  ? expensesVariable.push(data.Variable[i]) : expensesVariable.push(0) : expensesVariable.push(0);
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
            yearExpensesType: {
                ...prevChartSet.yearExpensesType,
                series:[
                    {
                        name: "Gastos Fijos",
                        data: expensesFijo
                    },
                    {
                        name: "Gastos Variables",
                        data: expensesVariable
                    },
                ],
                labels:labels,
                expenseFijoSum:expenseFijoSum,
                expenseVariableSum:expenseVariableSum,
                show: data !== undefined ? true : false,
            }
        }));
        
    }

    const setYearExpStatsMap = (data:any) => {
        const expensesFijo:any = [];
        const expensesVariable:any = [];

        if(data !== undefined){
            Object.keys(data.Fijo).map((key:any) => {
                expensesFijo.push({x:key,y:data.Fijo[key]})
            })

            Object.keys(data.Variable).map((key:any) => {
                expensesVariable.push({x:key,y:data.Variable[key]})
            })
        }

        setChartsSet((prevChartSet:any) => ({
            ...prevChartSet,
            yearExpensesMap: {
                ...prevChartSet.yearExpensesMap,
                series:[
                    {
                        name: "Gastos Fijos",
                        data: expensesFijo
                    },
                    {
                        name: "Gastos Variables",
                        data: expensesVariable
                    },
                ],
                show: data !== undefined ? true : false,
            }
        }));
        
    }

    const balanceChart: any = {
        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        formatter: function (val:any) {
                            return val+ "%";
                        }
                    }
                }
            }
        },
        labels: [numberToCurrency(statsData.balance)],
        colors: ['#A5D6A7'],
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
            categories: chartsSet.yearExpenses.labels,
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

    const yearExpensesType = {
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
            categories: chartsSet.yearExpensesType.labels,
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
    }

    const yearExpenseMap = {
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
                                                    <Typography color="white" className='card-amount'>{numberToCurrency(statsData.totalExpense)}</Typography>
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
                                                <Typography color="white" className='card-amount'>{numberToCurrency(statsData.limit)}</Typography>
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
                                        options={balanceChart}
                                        series={chartsSet.balance}
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
                                                <ListItemText primary="Fecha de Corte" secondary={statsData.cutDate+" de Mes"}/>
                                            </ListItem>
                                            <ListItem className='expenses-li' sx={{backgroundColor: '#E1BEE7'}}>
                                                <ListItemAvatar>
                                                <Avatar sx={{backgroundColor: '#78909C'}}>
                                                    <StarBorderIcon/>
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Fecha de Pago" secondary={statsData.payDate+" de Mes"}/>
                                            </ListItem>
                                            <ListItem className='expenses-li' sx={{backgroundColor: '#B2DFDB'}}>
                                                <ListItemAvatar>
                                                <Avatar sx={{backgroundColor: '#78909C'}}>
                                                    <StarBorderIcon/>
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Límite de gasto" secondary={numberToCurrency(statsData.limit)}/>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                { props.filter === 'thisYear' || props.filter === 'lastYear' ?
                chartsSet.yearExpenses.show === true ? 
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography color="white" className='card-title'>Balance Anual</Typography>
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(chartsSet.yearExpenses.expenseSum)}</Typography>
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(chartsSet.yearExpenses.limitSum)}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Limite Gastos</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={yearExpensesChart}
                                            series={chartsSet.yearExpenses.series}
                                            type="area"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                :null
                :null}
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
                                    {statsData.expensesStatsByMonth !== undefined ?
                                    Object.keys(statsData.expensesStatsByMonth).map((key, index) => {
                                        return (
                                        <ListItem className='expenses-li' sx={{backgroundColor: 'white'}}>
                                            <ListItemAvatar>
                                            <Avatar sx={{backgroundColor: generateRandomColor()}}>
                                                <LocalOfferOutlinedIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={key} secondary={numberToCurrency(statsData.expensesStatsByMonth[key])}/>
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
                { props.filter === 'thisYear' || props.filter === 'lastYear' ?
                chartsSet.yearExpensesType.show === true ?
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(chartsSet.yearExpensesType.expenseFijoSum)}</Typography>
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
                                                        <Typography color="white" className='card-title'>{numberToCurrency(chartsSet.yearExpensesType.expenseVariableSum)}</Typography>
                                                        <Typography color="white" className='card-subtitle'>Gastos Variables</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart
                                            options={yearExpensesType}
                                            series={chartsSet.yearExpensesType.series}
                                            type="bar"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                :null
                :null}
                { props.filter === 'thisYear' || props.filter === 'lastYear' ?
                chartsSet.yearExpensesMap.show === true ?
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
                                            options={yearExpenseMap}
                                            series={chartsSet.yearExpensesMap.series}
                                            type="treemap"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                :null
                :null}
            </Grid>
        </Grid>
    </Grid>
  )
}
