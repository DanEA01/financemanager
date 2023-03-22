import { Avatar, Box, Grid, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { CreditCard } from '../singleComponents/CreditCard'
//icons
import AddIcon from '@mui/icons-material/Add';

const PageTitle = styled('div')(({ theme }) => ({
    marginBottom: '10px',
    padding: '30px',
}))

const cards = [
    {
        cardNumber:"4587",
        cardName:"Daniel Enriquez A.",
        cardType:"visa",
        cardDefault:true,
    },
    {
        cardNumber:"3087",
        cardName:"Daniel Enriquez A.",
        cardType:"mastercard",
        cardDefault:false,
    }
  ]

export const Accounts = (props:any) => {
  return (
    <>  
        <Grid container spacing={3}>
            <Grid item direction="row" xs={12}>
                <Grid container spacing={3} alignItems="center" wrap="nowrap" sx={{ overflow: 'auto'}}>
                    {cards.map(card => (
                        <Grid item>
                            <CreditCard cardNumber={card.cardNumber} cardName={card.cardName} cardType={card.cardType} cardDefault={card.cardDefault}/>
                        </Grid>
                    ))}
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
