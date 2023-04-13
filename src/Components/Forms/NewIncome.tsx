import { Button, Card, CardActions, CardContent, CardHeader, Chip, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
//Input Verification
import { TypeOf, z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { insIncome } from '../../api/setApiCalls';
//Icons
import TitleIcon from '@mui/icons-material/Title';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
//auth
import { AuthContext } from '../../utils/auth';
//date
import moment from "moment";
//Alert
import { FMAlert } from '../FMAlert';


export const NewIncome = (props:any) => {
    const theme = useTheme();
    const [authContext, setAuthContext] = useContext<any>(AuthContext);
    const [incData, setIncData] = useState<any>(
        {
            incType: 'Variable',
            incCat: 'Nomina',
            incAuto: false,
        }
    );

    const Tags = ['Nomina','Bono','Fondo Ahorro','Comisión','Otros'];
    const Types = ['Variable', 'Fijo'];
    const [openAlert, setOpenAlert] = useState({
        open:false,
        title:'',
        severity:'error',
        message:''
    });

    useEffect(() => {
        if(props.data !== '') {
            setIncData({incType: props.data.type, incCat: props.data.category})
        }
      }, [props.data])

    const incomeSchema = z.object({
        title: z.string()
        .nonempty({ message: "Descripción requerida" }),
        account: z.string()
        .max(4, { message: "Deben ser 4 digitos" })
        .regex(/^\d+$/).transform(Number),
        date: z.string()
        .nonempty({ message: "Fecha requerida" }),
        amount: z.preprocess(
        (input) => {
            const processed = z.string().regex(/^\d+$/).transform(Number).safeParse(input);
            return processed.success ? processed.data : input;
        },
        z.number()
        .gte(1,{ message: "El monto no puede ser menor a 1" })
        ),
        category: z.string()
        .nonempty({ message: "Categoria requerida" }),
        type: z.string()
        .nonempty({ message: "Tipo requerido" }),
        comments: z.string(),
        incAuto: z.boolean().default(false),
    })

    //define a variable of the schema previously defined
    type incinput = TypeOf<typeof incomeSchema>

    //define the method for validation using zod
    const methodsInc = useForm<incinput>({
        resolver: zodResolver(incomeSchema)
    }); 

    const {
        register: register,
        reset: reset,
        handleSubmit: handleSubmit,
        formState: { isSubmitSuccessful:isSubmitSuccessful, errors: errors },
    } = methodsInc;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

        //function to handle the submit if the validations where successfull  
    const handleInsInc: SubmitHandler<incinput> = (values) => {
        insIncome(props.data.id,values.title,values.account,values.date,values.amount,values.category,values.type,values.comments,values.incAuto,props.selectedAcc.cardId,authContext.token).then(response => {
            const success = response.data.success;
            setOpenAlert({open:true,title: success === true ? 'Exito' : 'Error',severity: success === true ? 'success' : 'error',message:response.data.msg});
            props.onInsPost(success);
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

    //close Alert Dialog automatically
    const isOpen = openAlert.open === true;
    useEffect(() => {
      if(isOpen) setTimeout(() => setOpenAlert({...openAlert , open:false}), 5000);
    }, [isOpen]) 

    const handleAlertClose = () => {
        setOpenAlert({...openAlert , open:false});
    }

  return (
    <>
    <Card className='card' sx={{overflow: 'auto'}} >
        <CardHeader className='card-title' title={props.data.id !== undefined ? "Editar Ingreso" : "Agregar Ingreso"} sx={{backgroundColor: '#ECEFF1'}} />
        <CardContent>
            <Grid container spacing={3} sx={{marginY: '20px'}} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TitleIcon sx={{color:theme.palette.primary.main}} fontSize='medium' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth multiline minRows={1} variant='outlined' color='primary' label="Descripción"
                            defaultValue={props.data.title}
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
                            <TextField type="date" InputLabelProps={{ shrink: true }} fullWidth variant='outlined' color='primary' label='Fecha Ingreso'
                            defaultValue={moment(props.data.date,'DD/MM/YYYY').format('YYYY-MM-DD')}
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
                            defaultValue={props.data.amount}
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
                                <InputLabel  id="incTag-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="incTag-select-label"
                                    id="demo-simple-select"
                                    label="Categoria"
                                    value={incData.incCat}
                                    error={!!errors['category']}
                                    {...register("category")}
                                    onChange={(e) => setIncData({...incData , incCat:e.target.value})}
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
                                <InputLabel  id="incType-select-label">Tipo</InputLabel>
                                <Select
                                    labelId="incType-select-label"
                                    id="demo-simple-select"
                                    label="Tipo"
                                    value={incData.incType}
                                    error={!!errors['type']}
                                    {...register("type")}
                                    onChange={(e) => {
                                        e.target.value === 'Fijo' ?
                                            setIncData({...incData , incType:e.target.value, incAuto:true})
                                        :
                                            setIncData({...incData , incType:e.target.value, incAuto:false})
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
                            defaultValue={props.data.comments}
                            error={!!errors['comments']}
                            helperText={errors['comments'] ? errors['comments'].message : ''}
                            {...register("comments")}/>
                        </Grid>
                    </Grid>
                </Grid>
                {incData.incType == 'Fijo' ?
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch checked={incData.incAuto} {...register("incAuto")} onChange={(e) => setIncData({...incData , incAuto:e.target.checked})} color='primary'/>
                        }
                        label="Agregar este ingreso automaticamente cada mes?"
                    />
                </Grid>
                :null}
            </Grid>
        </CardContent>
        <CardActions sx={{padding: '16px', backgroundColor: '#ECEFF1'}}>
            <Grid container spacing={2} alignItems="center" justifyContent='flex-end'>
                <Grid item>
                    {props.data.id !== undefined ?
                        <Button variant='contained' color='secondary' onClick={handleSubmit(handleInsInc)}>Editar</Button>
                    :
                        <Button variant='contained' color='primary' onClick={handleSubmit(handleInsInc)}>Agregar</Button>
                    }
                </Grid>
            </Grid>
        </CardActions>
    </Card>
    <FMAlert open={openAlert.open} AlertClose={handleAlertClose} severity={openAlert.severity} title={openAlert.title} message={openAlert.message}/>
    </>
  )
}
