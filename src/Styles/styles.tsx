import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useTabs = makeStyles((theme:any) => ({
  root: {
    backgroundColor: '#fff',
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
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)',
    }
  }
}));

export const useTabItem = makeStyles((theme:any) => ({
  root: {
    '&:hover': {
      opacity: 1
    },
    minHeight: 44,
    minWidth: 96,
  },
  selected:{
    color: theme.palette.primary.contrastText+' !important',
  },
  wrapper: {
    // zIndex: 2,
    // marginTop: spacing(0.5),
    color: "white",
    textTransform: 'initial'
  }
}));