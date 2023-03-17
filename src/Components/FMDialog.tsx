import { Dialog, Slide,} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export const FMDialog = (props:any) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = (value: string) => {
        setOpen(false);
    };

  return (
    <>
    <Dialog fullWidth={props.fullWidth} maxWidth={props.width} onClose={props.close} open={props.open} TransitionComponent={Transition} PaperProps={{
    style: {
      backgroundColor: 'transparent',
    }}}>
        {props.form}
    </Dialog> 
    </>
  )
}
