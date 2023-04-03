import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material'
//Table
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
//Icons
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

const gastoTypeColor = (value:string) => {
    if(value === 'Fijo'){
        return '#8D6E63'
    }else{
        return '#26A69A'
    }
}

const columns: GridColDef[] = [
    { field: 'date', headerName: 'Fecha', width: 130, editable: false },
    { field: 'title', headerName: 'Descripción', width: 200, editable: false },
    { field: 'account', headerName: 'Cuenta', width: 100, editable: false },
    { field: 'amount', type:'number', headerName: 'Total', width: 90, editable: false },
    { field: 'category', headerName: 'Categoria', width: 150, editable: false, renderCell: (params) => { 
        return(<Chip sx={{backgroundColor:'#90A4AE', color: 'white'}} avatar={
        <Avatar sx={{backgroundColor:'#ffffff', width: 24, height: 24 }}>
            <LocalOfferOutlinedIcon sx={{fontSize: '1.1rem', color:'black'}}/>
        </Avatar>
        } 
    label={params.value}  />)
    }},
    { field: 'type', headerName: 'Tipo', width: 120, editable: false, renderCell: (params) => { 
        return(<Chip variant='filled' sx={{backgroundColor: gastoTypeColor(params.value), color:'white'}} label={params.value} />)
    }},
    { field: 'comments', headerName: 'Comentarios', width: 200, editable: false,}
];

const rows: GridRowsProp = [
    {id: 1,date: '12-01-2023',desc: 'Compra de Super',total: 1200,category: 'Super',type: 'Variable',obs: ''},
]

export const ExpensesTable = (props:any) => {
  return (
    <Grid container spacing={3} sx={{marginY: '20px'}}>
        <Grid item direction="row" xs={12}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card className='card'>
                        <Box padding="18px">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={6}>
                                                <Typography color="white" className='card-title'>Gastos Principales a Detalle</Typography>
                                            </Grid>
                                            <Grid item xs={6} textAlign="right">
                                                <Button variant='contained' color='primary' onClick={props.handleAddExpense}>Agregar Gasto</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} style={{ height: '500px' }}>
                                        <DataGrid
                                            rows={props.data}
                                            columns={columns}
                                            autoPageSize
                                            pageSizeOptions={[5]}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}
