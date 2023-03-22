import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'

//Icons
import TitleIcon from '@mui/icons-material/Title';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

export const NewExpense = () => {
    const theme = useTheme();
    const [expType, setexpType] = useState<any>('Variable');

    const Tags = ['Super','Compras','Casa','Comida','Otros'];
    const Types = ['Variable', 'Fijo'];

    const gastoTypeColor = (value:string) => {
        if(value === 'Fijo'){
            return '#8D6E63'
        }else{
            return '#26A69A'
        }
    }
  return (
    <Card className='card' sx={{overflow: 'auto'}} >
        <CardHeader className='card-title' title="Agregar Gasto" sx={{backgroundColor: '#ECEFF1'}} />
        <CardContent>
            <Grid container spacing={3} sx={{marginY: '20px'}} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TitleIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth multiline minRows={1} variant='outlined' color='primary' label="Descripción" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}  sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <CreditCardIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" fullWidth variant='outlined' color='primary' label="Cuenta" disabled />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <EventIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="date" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label={expType === 'Fijo' ? 'Fecha Cobro' : 'Fecha Gasto'} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <AttachMoneyIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label="Monto" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <LocalOfferOutlinedIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel  id="expTag-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="expTag-select-label"
                                    id="demo-simple-select"
                                    label="Tipo de Trajeta"
                                >
                                    {Tags.map(tag => (
                                    <MenuItem value={tag}>
                                        <Chip icon={<LocalOfferOutlinedIcon />} label={tag} variant="outlined" />
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SavingsOutlinedIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel  id="expType-select-label">Tipo</InputLabel>
                                <Select
                                    labelId="expType-select-label"
                                    id="demo-simple-select"
                                    label="Tipo de Trajeta"
                                    value={expType}
                                    onChange={(e) => setexpType(e.target.value)}
                                >
                                    {Types.map(type => (
                                    <MenuItem value={type}>
                                        <Chip label={type} variant="outlined" sx={{backgroundColor: gastoTypeColor(type), color:'white'}}/>
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TitleIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth multiline minRows={2} variant='outlined' color='primary' label="Observaciones" />
                        </Grid>
                    </Grid>
                </Grid>
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
