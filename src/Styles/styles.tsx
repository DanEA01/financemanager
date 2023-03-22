import { makeStyles } from "@mui/material";

export const useStyles = makeStyles((theme:any) => ({
  root: {
    backgroundColor: '#eee',
    borderRadius: 10,
    minHeight: 44
  },
  flexContainer: {
    display: 'inline-flex',
    position: 'relative',
    zIndex: 1
  },
  indicator: {
    top: 3,
    bottom: 3,
    right: 3,
    height: 'auto',
    background: 'none',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 4,
      right: 4,
      bottom: 0,
      borderRadius: 8,
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
    }
  }
}));