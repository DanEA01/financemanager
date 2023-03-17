import { Card, CardContent, CardHeader, Grid, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'

//Icons
import TitleIcon from '@mui/icons-material/Title';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';

export const NewAccount = () => {

    const theme = useTheme();

  return (
    <Card className='card'>
        <CardHeader className='card-title' title="Agregar Cuenta" sx={{backgroundColor: '#ECEFF1'}} />
        <CardContent>
            <Grid container spacing={3} sx={{marginY: '20px'}} alignItems="center" justifyContent="space-between">
                <Grid item xs={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TitleIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth variant='outlined' color='primary' label="Alias" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Looks4OutlinedIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" fullWidth variant='outlined' color='primary' label="Ultimos 4 Digitos" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}
