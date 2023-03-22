import { Grid, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { useStyles } from '../Styles/styles';

export const IncomeTabs = () => {
  
    const [tabIndex, setTabIndex] = useState(0);
  return (
    <Grid container spacing={3} sx={{marginBottom: '20px'}} alignItems="center" justifyContent="center">
        <Grid item>
            <Tabs
            value={tabIndex}
            onChange={(e, index) => setTabIndex(index)}
            >
                <Tab disableRipple label={'Estadisticas'} />
                <Tab disableRipple label={'Movimientos'} />
            </Tabs>
        </Grid>
    </Grid>
  )
}
