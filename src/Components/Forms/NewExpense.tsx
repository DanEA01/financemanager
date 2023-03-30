import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

//Icons
import TitleIcon from '@mui/icons-material/Title';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
//Input Verification
import { object, string, number, TypeOf, z, date } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insExpense } from '../../api/setApiCalls';
//Auth
import { AuthContext } from '../../utils/auth';

export const NewExpense = (props:any) => {
    const theme = useTheme();
    const [authContext, setAuthContext] = useContext<any>(AuthContext);
    const [expData, setExpData] = useState<any>(
        {
            expType: 'Variable',
            expCat: 'Super',
            expAuto: false,
        }
    );

    const Tags = ['Super','Compras','Casa','Comida','Otros'];
    const Types = ['Variable', 'Fijo'];

    const expenseSchema = object({
        title: string()
        .nonempty({ message: "Descripción requerida" }),
        account: string()
        .max(4, { message: "Deben ser 4 digitos" })
        .regex(/^\d+$/).transform(Number),
        date: string()
        .nonempty({ message: "Fecha requerida" }),
        amount: z.preprocess(
        (input) => {
            const processed = z.string().regex(/^\d+$/).transform(Number).safeParse(input);
            return processed.success ? processed.data : input;
        },
        z.number()
        .gte(1,{ message: "El monto no puede ser menor a 1" })
        ),
        category: string()
        .nonempty({ message: "Categoria requerida" }),
        type: string()
        .nonempty({ message: "Tipo requerido" }),
        comments: string(),
        expAuto: z.boolean(),
    })

    //define a variable of the schema previously defined
    type expinput = TypeOf<typeof expenseSchema>

    //define the method for validation using zod
    const methodsExp = useForm<expinput>({
        resolver: zodResolver(expenseSchema)
    }); 

    const {
        register: register,
        reset: reset,
        handleSubmit: handleSubmit,
        formState: { isSubmitSuccessful:isSubmitSuccessful, errors: errors },
    } = methodsExp;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
    
    
        //function to handle the submit if the validations where successfull  
    const handleInsExp: SubmitHandler<expinput> = (values) => {
        console.log(props.selectedAcc.cardId);
        insExpense(values.title,values.account,values.date,values.amount,values.category,values.type,values.comments,values.expAuto,props.selectedAcc.cardId,authContext.token).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

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
                            <TextField fullWidth multiline minRows={1} variant='outlined' color='primary' label="Descripción" 
                            error={!!errors['title']}
                            helperText={errors['title'] ? errors['title'].message : ''}
                            {...register("title")}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}  sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <CreditCardIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" fullWidth variant='outlined' color='primary' label="Cuenta"
                            defaultValue={props.selectedAcc.cardNum}
                            InputProps={{
                                readOnly: true,
                            }}  
                            error={!!errors['account']}
                            helperText={errors['account'] ? errors['account'].message : ''}
                            {...register("account")}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <EventIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="date" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label={expData.expType === 'Fijo' ? 'Fecha Cobro' : 'Fecha Gasto'} 
                            error={!!errors['date']}
                            helperText={errors['date'] ? errors['date'].message : ''}
                            {...register("date")}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <AttachMoneyIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField type="number" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label="Monto" 
                            error={!!errors['amount']}
                            helperText={errors['amount'] ? errors['amount'].message : ''}
                            {...register("amount")}/>
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
                                    label="Categoria"
                                    value={expData.expCat}
                                    error={!!errors['category']}
                                    {...register("category")}
                                    onChange={(e) => setExpData({...expData , expCat:e.target.value})}
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
                                    label="Tipo"
                                    value={expData.expType}
                                    error={!!errors['type']}
                                    {...register("type")}
                                    onChange={(e) => {
                                        e.target.value === 'Fijo' ?
                                            setExpData({...expData , expType:e.target.value, expAuto:true})
                                        :
                                            setExpData({...expData , expType:e.target.value, expAuto:false})
                                    }}
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
                            <TextField fullWidth multiline minRows={2} variant='outlined' color='primary' label="Observaciones" 
                            error={!!errors['comments']}
                            helperText={errors['comments'] ? errors['comments'].message : ''}
                            {...register("comments")}/>
                        </Grid>
                    </Grid>
                </Grid>
                {expData.expType == 'Fijo' ?
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch checked={expData.expAuto} {...register("expAuto")} onChange={(e) => setExpData({...expData , expAuto:e.target.checked})} color='primary'/>
                        }
                        label="Agregar este gasto automaticamente cada mes?"
                    />
                </Grid>
                :null}
            </Grid>
        </CardContent>
        <CardActions sx={{padding: '16px', backgroundColor: '#ECEFF1'}}>
            <Grid container spacing={2} alignItems="center" justifyContent='flex-end'>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={handleSubmit(handleInsExp)}>Agregar</Button>
                </Grid>
            </Grid>
        </CardActions>
    </Card>
  )
}
