import { List, ListItemButton, ListItemIcon, ListItemText, styled, Theme, CSSObject, IconButton, useTheme, Toolbar, Typography, Stack, Badge, Button, Avatar, Menu, MenuItem, Divider, Chip } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer';
import MuiListItem from '@mui/material/ListItem';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import React, { useContext, useEffect, useState } from 'react'
//icons
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GroupIcon from '@mui/icons-material/Group';
//Router
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: "#1e1e2d",
    zIndex: "1202", 
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
},
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
   paddingTop: '8px',
   paddingBottom: '8px',
   paddingLeft: '0px',
   paddingRight: '0px',
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
  })<AppBarProps>(({ theme, open }) => ({
    boxShadow:"none",
    /*zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })*/
  }));


const Drawer = styled(MuiDrawer, { 
    shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

export const Sidebar = (props:any) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setanchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        setanchorEl(null);
    }

    const handleSelectClick = (path:string) => {
        //setselected(index);
        navigate(path);
    }

    function stringToColor(string: string) { //sets a color depending on the input string
        let hash = 0;
        let i;
        let color = '#';

        if(string !== undefined){
          /* eslint-disable no-bitwise */
          for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
          }
      
          for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
          }
        }

        return color;
      }
      
      function stringAvatar(name: string) { //takes the first letter of a String
        if(name === undefined){
          name = '';
        }
        
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')}`,
        };
      }

  return (
    <>
    <AppBar position="fixed" color="inherit" open={open}>
        <Toolbar>
            <Typography onClick={() => navigate('/Financemanager')} variant="h6" color="inherit" component="div" sx={{flexGrow:1,marginLeft:"75px"}}>{props.brandName}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" >
                <IconButton aria-label='Notificaciones' color='inherit'>
                    <Badge badgeContent={3} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Button color="inherit" sx={{textTransform: 'none'}} id="user-button" onClick={handleClick} aria-controls={openMenu ? 'user-menu':undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} endIcon={<KeyboardArrowDownIcon />}>
                    <Avatar {...stringAvatar(props.username)}></Avatar> {/*if user doesnt have an image render the name only*/}
                    <Typography variant="body1" sx={{marginLeft:'10px'}}>{props.username}</Typography>
                </Button>
                <Menu id="user-menu" anchorEl={anchorEl} open={openMenu} MenuListProps={{
                    "aria-labelledby" : 'user-button'
                }}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      ml: 2.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 2,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 10,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                > 
                    <MenuItem onClick={() => navigate('/FinanceManager/Profile')}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        Mi Cuenta
                    </MenuItem>
                    <Divider variant="middle" />
                    <MenuItem>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        Cerrar Sesion
                    </MenuItem>
                </Menu>
            </Stack>
        </Toolbar>
    </AppBar>
    <Drawer variant="permanent" color="primary" open={open}>
        <DrawerHeader>
            <img src="/assets/img/FM Logo.svg" width={50}/>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem selected={props.index === 0} onClick={() => handleSelectClick('/Financemanager')}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
                    <ListItemIcon sx={{
                        minWidth: 0,
                        color: 'white',
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center'
                    }}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendario" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
            </ListItem>
            <ListItem selected={props.index === 1} onClick={() => handleSelectClick('/FinanceManager/Details')}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
                    <ListItemIcon sx={{
                        minWidth: 0,
                        color: 'white',
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center'
                    }}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendario" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
            </ListItem>
        </List>
        <List sx={{marginTop:'auto'}}>
          <Divider />
          <ListItem selected={props.index === 4} onClick={() => handleSelectClick('/FinanceManager/Profile')}>
              <ListItemButton sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}>
                  <ListItemIcon sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                  }}>
                      <Avatar {...stringAvatar(props.username)}></Avatar> {/*if user doesnt have an image render the name only*/}
                  </ListItemIcon>
                  <ListItemText primary="Cuenta" sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
          </ListItem>
        </List>
    </Drawer>
    </>
  )
}