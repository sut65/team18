
// const theme = createTheme({
// 	palette: {
// 	  primary: {
// 		main: "#FEAC3F",
// 	  },
// 	  secondary: {
// 		main: "#ffebee"
// 	  },
// 	  text: {
// 		primary: "#1B2420",
// 		secondary: "#1B2420"
// 	  }
// 	},
	
//   })

import * as React from 'react';

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

import { Link as RouterLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//สี
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
//เมนูแถบ
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox'; //ไม่ได้ใช้
import MailIcon from '@mui/icons-material/Mail';
//ไอคอน 
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HealingIcon from '@mui/icons-material/Healing';
import { MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';

//สี

const theme = createTheme({
	palette: {
	  primary: {
		main: "#FEAC3F",
	  },
	  secondary: {
		main: "#ffebee"
	  },
	  text: {
		primary: "#1B2420",
		secondary: "#1B2420"
	  }
	},
	
  })

const drawerWidth = 320; //ความยาวของ แถบเมนู

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));







function Navbar() {

  const themep = useTheme();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  const menumember = [
    { name: "หน้าหลัก", icon: <AccountCircleIcon  />, path: "/" },
    { name: "ระบบข้อมูลสมาชิก", icon: <HomeRepairServiceIcon  />, path: "/MemberShow" },
    { name: "ระบบแจ้งชำรุดอุปกรณ์", icon: <PendingActionsIcon   />, path: "/Notify" },

  ]
  const admin = [
    { name: "หน้าหลัก", icon: <AccountCircleIcon  />, path: "/" },
    // { name: "ระบบ....", icon: <ManageAccountsIcon  />, path: "/NotifyShow" },
  ]

  var menu: any[];
  switch(role){
    case "Member":
      menu = menumember;
      break;
    case "Admin":
      menu = admin;
      break;
    default:
      menu = [];
      break;
  }

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setRole(localStorage.getItem("role") || "");
    } 
  }, []);
  return (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Typography variant="h6" color="secondary" noWrap component="div">
              ระบบสถานกีฬา
            </Typography>
            <MenuItem onClick={SignOut}><LogoutIcon style={{ marginRight: ".5rem" }}/>Log out</MenuItem>
          </Box>
          
        </Toolbar>

      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* ปุ่มกด < */}
          <IconButton onClick={handleDrawerClose}> 
            {themep.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> {/* ปุ่มกด < */}
        </DrawerHeader>

        <Divider />

         {menu.map((item, index) => (
                <ListItem key={index} button component={RouterLink} onClick={handleDrawerClose}
                 to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                  
                </ListItem>
              ))}

        <Divider />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>

    </Box>
  </ThemeProvider>
  );
}
export default Navbar;