import { Alert, AlertTitle, Grow, GrowProps, SlideProps, Snackbar } from '@mui/material';


export const FMAlert = (props:any) => {
  type TransitionProps = Omit<SlideProps, 'direction'>;

  function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
  }

  return (
    <Snackbar open={props.open} TransitionComponent={GrowTransition} autoHideDuration={2000} onClose={props.AlertClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert
          severity={props.severity}
          variant="filled"
          onClose={props.AlertClose}
          sx={{ mb: 2, minWidth:'50vw' }}        >
          <AlertTitle>{props.title}</AlertTitle>
          {props.message}
      </Alert>
    </Snackbar>
  )
}