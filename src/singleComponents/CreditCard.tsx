import { Card, CardActionArea, Chip, IconButton, Stack, Typography } from '@mui/material'
//css
import '../assets/css/Cards.css'
//Icons
import EditIcon from '@mui/icons-material/Edit';

export const CreditCard = (props:any) => {
  
  return (
    <Card sx={{minWidth:'350px',maxWidth:'400px',minHeight:'150px',borderRadius:'20px',position:'relative', border: props.isSelected === true ? "5px solid #FF2E63" : "none" }} className={"card --"+props.cardType}>
        <CardActionArea sx={{padding:'25px'}} onClick={() => props.indexClick(props.index,props.cardId,props.cardNumber)}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div className="cardChip" />
            <div className="issuer" />
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{paddingY:'30px'}} className="cardText">
            <Typography className="text" color="inherit" fontSize={25} letterSpacing={2}>•••• •••• •••• {props.cardNumber}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" className="cardText">
            <Typography className="text" color="inherit" fontSize={15} letterSpacing={2}>{props.cardName}</Typography>
        </Stack>
        </CardActionArea>
        <IconButton className="edit-card" aria-label="edit" sx={{position: 'absolute', bottom: '10px', left: '290px', color: 'white'}} onClick={() => props.editAccountClick(props.cardId)}>
          <EditIcon />
        </IconButton>
    </Card>
  )
}
