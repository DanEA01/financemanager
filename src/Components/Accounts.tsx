import { Avatar, Box, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
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

export const Accounts = () => {
  return (
    <>  
        <Box sx={{ width: '100%' }}>
        <PageTitle>
            <Typography variant='h6'>Cuentas</Typography>
        </PageTitle>
        <Grid container wrap="nowrap" spacing={2} sx={{ overflow: 'auto', paddingX: '30px' }} alignItems="center">
            {cards.map(card => (
                <Grid item>
                    <CreditCard cardNumber={card.cardNumber} cardName={card.cardName} cardType={card.cardType} cardDefault={card.cardDefault}/>
                </Grid>
            ))}
            <Grid item>
            <IconButton aria-label="agregar cuenta">
                <Avatar>
                    <AddIcon />
                </Avatar>
            </IconButton>
            </Grid>
        </Grid>
        </Box>
        
    </>
  )
}
