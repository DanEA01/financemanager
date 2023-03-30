import { Grid, Tab, Tabs, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTabItem, useTabs } from '../Styles/styles';

export const IncomeTabs = (props:any) => {
    
    const theme = useTheme();
    const tabsStyles = useTabs(theme);
    const tabItemStyles = useTabItem(theme);
  return (
    <Grid container spacing={3} sx={{marginBottom: '20px'}} alignItems="center" justifyContent="center">
        <Grid item>
            <Tabs
            classes={tabsStyles}
            value={props.tabIndex}
            onChange={(e, index) => props.handleIndexChange(index)}
            >
                <Tab classes={tabItemStyles} disableRipple label={'Estadisticas'} />
                <Tab classes={tabItemStyles} disableRipple label={'Movimientos'}/>
            </Tabs>
        </Grid>
    </Grid>
  )
}
