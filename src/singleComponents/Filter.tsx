import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

export const Filter = (props:any) => {
    const changeFilter = (e: SelectChangeEvent) => {
        props.filterChange(e.target.value);
    }
  return (
    <div style={{display:'flex', alignItems:'end', justifyContent:'end', marginTop:'15px'}}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Filtro</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.value}
          color='primary'
          onChange={(e) => changeFilter(e)}
          autoWidth
          label="Filtro"
          sx={{backgroundColor:'white', borderRadius:'15px'}}
        >
          <MenuItem value={'thisMonth'}>Este Mes</MenuItem>
          <MenuItem value={'lastMonth'}>Mes Pasado</MenuItem>
          <MenuItem value={'thisYear'}>Este Año</MenuItem>
          <MenuItem value={'lastYear'}>Año Pasado</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
