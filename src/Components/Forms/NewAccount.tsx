import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

//Icons
import TitleIcon from '@mui/icons-material/Title';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
//Input Verification
import { object, string, number, TypeOf, z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
//API
import { setAddAccount } from '../../api/setApiCalls';
//Auth
import { AuthContext } from '../../utils/auth';

export const NewAccount = () => {
  const theme = useTheme();
  const [authContext, setAuthContext] = useContext<any>(AuthContext);
  const [cardType, setcardType] = useState<any>('Credit');
  const [cardData, setCardData] = useState<any>(
    {
        type: 'Expense',
        cardType: 'Credit',
        cardBrand: 'Visa',
    }
  );

  const accountSchema = object({
    alias: string()
    .nonempty({ message: "Alias requerido" }),
    type: string()
    .nonempty({ message: "Tipo requerido" }),
    cardType: string()
    .nonempty({ message: "Tipo requerido" }),
    last4Digits: string()
    .max(4, { message: "Deben ser 4 digitos" })
    .regex(/^\d+$/).transform(Number),
    cardBrand: string()
    .nonempty({ message: "Marca requerida" })
    .toLowerCase(),
    cutoffDate: z.preprocess(
    (input) => {
        if(input !== ''){
            const processed = z.string().regex(/^\d+$/).transform(Number).safeParse(input);
            return processed.success ? processed.data : input;
        }else{
            return 1;
        }
    },
    z.number()
    .gte(1,{ message: "El dia no puede ser menor a 1" })
    .lte(31,{ message: "El dia no puede ser mayor a 31" }),
    ),
    payDate: z.preprocess(
    (input) => {
        if(input !== ''){
            const processed = z.string().regex(/^\d+$/).transform(Number).safeParse(input);
            return processed.success ? processed.data : input;
        }else{
            return 1;
        }
    },
    z.number()
    .gte(1,{ message: "El dia no puede ser menor a 1" })
    .lte(31,{ message: "El dia no puede ser mayor a 31" }),
    ),
    limit: z.preprocess(
    (input) => {
        if(input !== ''){
            const processed = z.string().regex(/^\d+$/).transform(Number).safeParse(input);
            return processed.success ? processed.data : input;
        }else{
            return 1;
        }
    },
    z.number()
    .gte(1,{ message: "El dia no puede ser menor a 1" })
    ),
  });

  //define a variable of the schema previously defined
  type accinput = TypeOf<typeof accountSchema>

  //define the method for validation using zod
  const methodsReg = useForm<accinput>({
      resolver: zodResolver(accountSchema)
  }); 

  const {
      register: register,
      reset: reset,
      handleSubmit: handleSubmit,
      formState: { isSubmitSuccessful:isSubmitSuccessful, errors: errors },
  } = methodsReg;

  useEffect(() => {
    /*if (isSubmitSuccessful) {
        reset();
    }*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);


    //function to handle the submit if the validations where successfull  
    const handleInsAcc: SubmitHandler<accinput> = (values) => {
        console.log(values);
        setAddAccount(values.alias,values.type,values.cardType,values.last4Digits,values.cardBrand,values.cutoffDate,values.payDate,values.limit,authContext.token).then(response => {
            console.log(response);      
        }).catch(error => {
            console.log(error);
        })
    }

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
                            <TextField fullWidth variant='outlined' color='primary' label="Alias"
                            error={!!errors['alias']}
                            helperText={errors['alias'] ? errors['alias'].message : ''}
                            {...register("alias")} />
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
                                    value={cardData.type}
                                    label="Tipo de Cuenta"
                                    error={!!errors['type']}
                                    {...register("type")}
                                    onChange={(e) => setCardData({...cardData , type:e.target.value})}
                                >
                                    <MenuItem value="Income">Ingreso</MenuItem>
                                    <MenuItem value="Expense">Gasto</MenuItem>
                                </Select>
                                <FormHelperText>{errors['type'] ? errors['type'].message : ''}</FormHelperText>
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
                                    value={cardData.cardType}
                                    error={!!errors['cardType']}
                                    {...register("cardType")}
                                    onChange={(e) => setCardData({...cardData , cardType:e.target.value})}
                                >
                                    <MenuItem value="Credit">Crédito</MenuItem>
                                    <MenuItem value="Debit">Débito</MenuItem>
                                </Select>
                                <FormHelperText>{errors['cardType'] ? errors['cardType'].message : ''}</FormHelperText>
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
                            <TextField type="number" fullWidth variant='outlined' color='primary' label="Ultimos 4 Digitos" 
                            error={!!errors['last4Digits']}
                            helperText={errors['last4Digits'] ? errors['last4Digits'].message : ''}
                            {...register("last4Digits")}/>
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
                                    value={cardData.cardBrand}
                                    label="Marca de Trajeta"
                                    error={!!errors['cardBrand']}
                                    {...register("cardBrand")}
                                    onChange={(e) => setCardData({...cardData , cardBrand:e.target.value})}
                                >
                                    <MenuItem value="Visa">Visa</MenuItem>
                                    <MenuItem value="MasterCard">MasterCard</MenuItem>
                                    <MenuItem value="AMEX">AMEX</MenuItem>
                                </Select>
                                <FormHelperText>{errors['cardBrand'] ? errors['cardBrand'].message : ''}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                {cardData.cardType === 'Credit' ?
                <>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TodayIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label="Fecha de Corte"
                            error={!!errors['cutoffDate']}
                            helperText={errors['cutoffDate'] ? errors['cutoffDate'].message : ''}
                            {...register("cutoffDate")} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <EventIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label="Fecha de Pago"
                            error={!!errors['payDate']}
                            helperText={errors['payDate'] ? errors['payDate'].message : ''}
                            {...register("payDate")} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <ProductionQuantityLimitsIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" fullWidth variant='outlined' color='primary' label="Límite de Gasto"
                            error={!!errors['limit']}
                            helperText={errors['limit'] ? errors['limit'].message : ''}
                            {...register("limit")} />
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
                    <Button variant='contained' color='primary' onClick={handleSubmit(handleInsAcc)}>Agregar</Button>
                </Grid>
            </Grid>
        </CardActions>
    </Card>
  )
}
