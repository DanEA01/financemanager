import { Box, Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
//Logos
import {ReactComponent as ReactLogo} from '../assets/img/FM Logo White.svg';
import {ReactComponent as ReactLogo2} from '../assets/img/FM Logo.svg';
//css
import '../assets/css/Main.css'
//icons
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Visibility, VisibilityOff } from '@mui/icons-material';
//colors
import { grey } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom';
//zod
import { object, string, TypeOf } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setRegister } from '../api/setApiCalls';

export const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setshowPassword] = useState(false);

    var pattern = new RegExp(
        "^(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    )

    const registerSchema = object({
        Name:string()
        .nonempty({ message: "Nombre requerido" }),
        Email:string()
        .email({ message: "Correo invalido" }),
        Password:string()
        .nonempty({ message: "Contraseña requerida" })
        .min(8, { message: "Contraseña debe contener al menos 8 caracteres" })
        .refine(
            (data) => pattern.test(data),
            (data) => ({ message: "Contraseña debe tener al menos una mayuscula un numero y un caracter especial" })
        ),
    });

    //difine a variable of the schema previously defined
    type reginput = TypeOf<typeof registerSchema>

    //define the method for validation using zod
    const methodsReg = useForm<reginput>({
        resolver: zodResolver(registerSchema)
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
    const handleInsUser: SubmitHandler<reginput> = (values) => {
        setRegister(values).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    const showPasswordHandle = () => {
        setshowPassword(!showPassword)
    }

  return (
    <Box sx={{
        width:'100vw',
        height:'100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1618367634912-016f4ac23267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        margin: '0px',
        overflow: 'hidden'
    }}>
        <Grid container>
            <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} >
                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{height:'100vh'}}>
                    <Grid item>
                        <ReactLogo style={{width: '200px', height:'100px', marginBottom: '20px'}}/>
                        <Typography variant='h5' color='white' marginLeft={1.2}>Controla tus ingresos y gastos</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{height:'100vh'}}>
                    <Card sx={{minWidth: {xs: '250px', sm: '400px'}, borderRadius:'20px', padding: '30px'}} elevation={3}>
                        <CardContent>
                            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                <Grid item sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} >
                                    <ReactLogo2 style={{width: '150px', height:'50px', marginBottom: '20px'}}/>
                                </Grid>
                                <Grid item sx={{marginBottom: '15px'}}>
                                    <Typography variant='h5' className='card-title-bold'>Registro</Typography>
                                </Grid>
                                <Grid item>
                                    <Stack direction='row' spacing={2}>
                                        <Button onClick={() => window.location.href = "http://localhost:4000/auth/google/financemanager"} variant='outlined' startIcon={<GoogleIcon sx={{color:'#db3236'}}/>} fullWidth sx={{textTransform:'none',borderColor:grey[500],color:grey[800]}} >Google</Button>
                                        <Button disabled onClick={() => window.location.href = "http://localhost:4000/auth/facebook/financemanager"} variant='outlined' startIcon={<FacebookIcon sx={{color:'#4267B2'}} />} color='primary' fullWidth sx={{textTransform:'none',borderColor:grey[500],color:grey[800]}}>Facebook</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Divider sx={{paddingY:'30px'}}><Typography variant='body1' className='card-subtitle'>O con correo</Typography></Divider>
                            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        label='Nombre'
                                        type='text'
                                        sx={{width: {xs: '250px', sm: '250px' , md: '350px'}}}
                                        error={!!errors['Name']}
                                        helperText={errors['Name'] ? errors['Name'].message : ''}
                                        {...register("Name")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        label='Email'
                                        type='text'
                                        sx={{width: {xs: '250px', sm: '250px' , md: '350px'}}}
                                        error={!!errors['Email']}
                                        helperText={errors['Email'] ? errors['Email'].message : ''}
                                        {...register("Email")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        label='Contraseña'
                                        type={showPassword ? 'text' : 'password'}
                                        sx={{width: {xs: '250px', sm: '250px' , md: '350px'}, marginBottom: '10px'}}
                                        required
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton onClick={showPasswordHandle}>{!showPassword ? <Visibility /> : <VisibilityOff />}</IconButton></InputAdornment>,
                                        }}
                                        error={!!errors['Password']}
                                        helperText={errors['Password'] ? errors['Password'].message : ''}
                                        {...register("Password")} 
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button color='primary' variant='contained' sx={{width: {xs: '250px', sm: '250px' , md: '350px'}, marginTop: '30px'}} onClick={handleSubmit(handleInsUser)}>Registrar</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1}>
                                        <Typography className='card-subtext' color="black">Ya estas registrado?</Typography>
                                        <Typography className='card-subtext' color="primary" onClick={() => navigate('/Login')} sx={{cursor: 'pointer'}}>LogIn</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}
