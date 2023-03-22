import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

//Icons
import TitleIcon from '@mui/icons-material/Title';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export const NewAccount = () => {

  const theme = useTheme();
  const [cardType, setcardType] = useState<any>('Credit');

  return (
    <Card className='card' sx={{overflow: 'auto'}}>
        <CardHeader className='card-title' title="Agregar Cuenta" sx={{backgroundColor: '#ECEFF1'}} />
        <CardContent>
            <Grid container spacing={3} sx={{marginY: '20px'}} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TitleIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth variant='outlined' color='primary' label="Alias" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <AccountBalanceWalletIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel id="cardType-select-label">Tipo de Cuenta</InputLabel>
                                <Select
                                    labelId="cardType-select-label"
                                    id="demo-simple-select"
                                    value="Expense"
                                    label="Tipo de Cuenta"
                                >
                                    <MenuItem value="Income">Ingreso</MenuItem>
                                    <MenuItem value="Expense">Gasto</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <CreditCardIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel id="cardType-select-label">Tipo de Tarjeta</InputLabel>
                                <Select
                                    labelId="cardType-select-label"
                                    id="demo-simple-select"
                                    label="Tipo de Trajeta"
                                    value={cardType}
                                    onChange={(e) => setcardType(e.target.value)}
                                >
                                    <MenuItem value="Credit">Crédito</MenuItem>
                                    <MenuItem value="Debit">Débito</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Looks4OutlinedIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" fullWidth variant='outlined' color='primary' label="Ultimos 4 Digitos" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <CreditCardIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel id="cardBrand-select-label">Marca de Tarjeta</InputLabel>
                                <Select
                                    labelId="cardBrand-select-label"
                                    id="demo-simple-select"
                                    value="Visa"
                                    label="Marca de Trajeta"
                                >
                                    <MenuItem value="Visa">Visa</MenuItem>
                                    <MenuItem value="MasterCard">MasterCard</MenuItem>
                                    <MenuItem value="AMEX">AMEX</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                {cardType === 'Credit' ?
                <>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TodayIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="date" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label="Fecha de Corte" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <EventIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="date" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label="Fecha de Pago" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <ProductionQuantityLimitsIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" fullWidth variant='outlined' color='primary' label="Límite de Gasto" />
                        </Grid>
                    </Grid>
                </Grid>
                </>
                : null}
            </Grid>
        </CardContent>
        <CardActions sx={{padding: '16px', backgroundColor: '#ECEFF1'}}>
            <Grid container spacing={2} alignItems="center" justifyContent='flex-end'>
                <Grid item>
                    <Button variant='contained' color='primary'>Agregar</Button>
                </Grid>
            </Grid>
        </CardActions>
    </Card>
  )
}
