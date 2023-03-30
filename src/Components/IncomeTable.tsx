import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material'
//Table
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const gastoTypeColor = (value:string) => {
    if(value === 'Fijo'){
        return '#8D6E63'
    }else{
        return '#26A69A'
    }
}

const columns: GridColDef[] = [
    { field: 'date', headerName: 'Fecha', width: 100, editable: false },
    { field: 'desc', headerName: 'Descripción', width: 200, editable: false },
    { field: 'total', type:'number', headerName: 'Total', width: 90, editable: false },
    { field: 'type', headerName: 'Tipo', width: 120, editable: false, renderCell: (params) => { 
        return(<Chip variant='filled' sx={{backgroundColor: gastoTypeColor(params.value), color:'white'}} label={params.value} />)
    }},
    { field: 'obs', headerName: 'Comentarios', width: 200, editable: false,}
];

const rows: GridRowsProp = [
    {id: 1,date: '12-01-2023',desc: 'Nomina',total: 1200,type: 'Fijo',obs: ''},
    {id: 2,date: '12-01-2023',desc: 'Nomina',total: 1350,type: 'Fijo',obs: ''},
    {id: 3,date: '12-01-2023',desc: 'Nomina',total: 2500,type: 'Fijo',obs: ''},
    {id: 4,date: '12-01-2023',desc: 'Nomina',total: 4000,type: 'Fijo',obs: ''},
    {id: 5,date: '12-01-2023',desc: 'Nomina',total: 3890,type: 'Variable',obs: ''},
    {id: 6,date: '12-01-2023',desc: 'Fondo de Ahorro',total: 2250,categroy: 'Super',type: 'Fijo',obs: ''},
]

export const IncomeTable = (props:any) => {
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
                                                <Typography color="white" className='card-title'>Ingresos Principales a Detalle</Typography>
                                            </Grid>
                                            <Grid item xs={6} textAlign="right">
                                                <Button variant='contained' color='primary'  onClick={props.handleAddIncome}>Agregar Ingreso</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} style={{ height: '500px' }}>
                                        <DataGrid
                                            rows={rows}
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
