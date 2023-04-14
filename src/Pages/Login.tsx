import { Backdrop, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
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
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
//Api Calls
import { setLogIn } from '../api/setApiCalls';
//Alerts
import { FMAlert } from '../Components/FMAlert';
//Auth
import { AuthContext } from '../utils/auth';
//zod
import { object, string, TypeOf } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setRegister } from '../api/setApiCalls';

export const Login = () => {
    const navigate = useNavigate();
    const [authContext, setAuthContext] = useContext<any>(AuthContext);
    const [showPassword, setshowPassword] = useState(false);
    const [openBackdrop, setopenBackdrop] = useState(false);
    const [openAlert, setOpenAlert] = useState({
        open:false,
        title:'',
        severity:'error',
        message:''
    });

    const logInSchema = object({
        username:string()
        .email({ message: "Correo invalido" }),
        password:string()
        .nonempty({ message: "Contraseña requerida" })
    })

    //difine a variable of the schema previously defined
    type loginput = TypeOf<typeof logInSchema>

    //define the method for validation using zod
    const methodsReg = useForm<loginput>({
        resolver: zodResolver(logInSchema)
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
    const handleLogIn: SubmitHandler<loginput> = (values) => {
        setopenBackdrop(true);
        setLogIn(values.username,values.password).then(response => {
            setAuthContext((oldValues: any) => {
                return { ...oldValues, token: response.data.token, username: response.data.name, email: response.data.email}
            })
            setopenBackdrop(false);
            navigate('/FinanceManager');
        }).catch(error => {
            if(error.response.status === 400 || error.response.status === 401){
                setOpenAlert({open:true,title:'Error',severity:'error',message:error.response.data.msg});
            }else{
                console.log(error);
            }
            setopenBackdrop(false);
        })
    }

    const showPasswordHandle = () => {
        setshowPassword(!showPassword)
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
                                    <Typography variant='h5' className='card-title-bold'>Log In</Typography>
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
                                        label='Email'
                                        type='text'
                                        sx={{width: {xs: '250px', sm: '250px' , md: '350px'}}}
                                        error={!!errors['username']}
                                        helperText={errors['username'] ? errors['username'].message : ''}
                                        {...register("username")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        label='Contraseña'
                                        type={showPassword ? 'text' : 'password'}
                                        sx={{width: {xs: '250px', sm: '250px' , md: '350px'}, marginBottom: '10px'}}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton onClick={showPasswordHandle}>{!showPassword ? <Visibility /> : <VisibilityOff />}</IconButton></InputAdornment>,
                                        }}
                                        error={!!errors['password']}
                                        helperText={errors['password'] ? errors['password'].message : ''}
                                        {...register("password")} 
                                    />
                                    <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end">
                                        <Grid item>
                                            <Typography className='card-subtext' color="primary">Olvidaste la contraseña</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button color='primary' type='submit' variant='contained' sx={{width: {xs: '250px', sm: '250px' , md: '350px'}, marginTop: '30px'}} onClick={handleSubmit(handleLogIn)}>Ingresar</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1}>
                                        <Typography className='card-subtext' color="black">No estas registrado?</Typography>
                                        <Typography className='card-subtext' color="primary" onClick={() => navigate('/Registro')} sx={{cursor: 'pointer'}}>Regsitrate</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
        >
            <CircularProgress color="primary" />
        </Backdrop>
        <FMAlert open={openAlert.open} AlertClose={handleAlertClose} severity={openAlert.severity} title={openAlert.title} message={openAlert.message}/>
    </Box>
  )
}
