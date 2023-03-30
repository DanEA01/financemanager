import { Avatar, Box, Grid, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CreditCard } from '../singleComponents/CreditCard'
//icons
import AddIcon from '@mui/icons-material/Add';

const PageTitle = styled('div')(({ theme }) => ({
    marginBottom: '10px',
    padding: '30px',
}))

export const Accounts = (props:any) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleIndexClick = (index:number,id:string,cardNum:number) =>{
        props.selectedAccountID(id,cardNum);
        setSelectedIndex(index);
    }

  return (
    <>  
        <Grid container spacing={3}>
            <Grid item direction="row" xs={12}>
                <Grid container spacing={3} alignItems="center" wrap="nowrap" sx={{ overflow: 'auto'}}>
                    {props.cards !== null ?
                    props.cards.map((card:any,index:number) => (
                        <Grid item>
                            <CreditCard cardId={card._id} cardNumber={card.last4Digits} cardName={card.alias} cardType={card.cardBrand} indexClick={handleIndexClick} index={index} isSelected={index === selectedIndex}/>
                        </Grid>
                    )):null}
                    <Grid item>
                        <Tooltip title="Agregar Cuenta" placement="bottom" onClick={props.handleAddAccount}>
                            <IconButton aria-label="agregar cuenta">
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
  )
}
