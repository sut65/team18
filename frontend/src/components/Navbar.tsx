import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
//icon
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FitbitIcon from '@mui/icons-material/Fitbit';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import BookIcon from '@mui/icons-material/Book';
import SportsCricketTwoToneIcon from '@mui/icons-material/SportsCricketTwoTone';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';
import NewspaperTwoToneIcon from '@mui/icons-material/NewspaperTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

import { Link as RouterLink } from "react-router-dom";
import { createTheme, styled, ThemeProvider, useTheme } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import { useEffect } from "react";
import { CssBaseline, Divider, Drawer, MenuItem } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: orange[400],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#F4F6F6',
    },
  },
});

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
  const [role, setRole] = React.useState("");

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
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/login" },
    { name: "ข้อมูลสมาชิก", icon: <PersonIcon />, path: "/member_show", },
    { name: "จองเทรนเนอร์", icon: <FitnessCenterIcon />, path: "/trainer", },
    { name: "จองสถานกีฬา", icon: <BookIcon />, path: "/place_booking", },
    { name: "จองอุปกรณ์กีฬา", icon: <BookIcon />, path: "/equipment_booking_show" },
    { name: "ชำระเงิน", icon: <PaymentTwoToneIcon />, path: "/bill_create", },
    { name: "แจ้งซ่อมอุปกรณ์ชำรุด", icon: <BuildTwoToneIcon />, path: "/notify_show", },
  ]
  const menuemployee = [
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/login" },
    { name: "บันทึกตารางงานพนักงาน", icon: <EventNoteIcon />, path: "/schedule_show", },
    { name: "ข้อมูลสมาชิก", icon: <PersonIcon />, path: "/member_shows", },
    { name: "ข้อมูลสถานกีฬา", icon: <SportsBasketballIcon />, path: "/place" },
    { name: "ข้อมูลอุปกรณ์กีฬา", icon: <SportsCricketTwoToneIcon />, path: "/equipment_shows", },
    { name: "ข้อมูลการแจ้งซ่อมอุปกรณ์ชำรุด", icon: <BuildTwoToneIcon />, path: "/notify_shows", },
    { name: "ข่าวประชาสัมพันธ์", icon: <NewspaperTwoToneIcon />, path: "/news_update", },
  ]
  const menuadmin = [
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/login" },
    { name: "ข้อมูลพนักงาน", icon: <BadgeIcon />, path: "/employee_show", },
    { name: "ข้อมูลสมาชิก", icon: <PersonIcon />, path: "/member_shows", },
    { name: "ข่าว", icon: <EventNoteIcon />, path: "/news_create", },
  ]
  const menutrainer = [
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/login" },
    { name: "โปรแกรมออกกำลังกาย", icon: <FitbitIcon />, path: "/program", },
    { name: "บันทึกตารางงานพนักงาน", icon: <EventNoteIcon />, path: "/schedule_show", },
  ]

  var menu: any[];
  switch (role) {
    case "member":
      menu = menumember;
      break;
    case "admin":
      menu = menuadmin;
      break;
    case "trainer":
      menu = menutrainer;
      break;
    case "employee":
      menu = menuemployee;
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Typography variant="h6" color="secondary" noWrap component="div" fontFamily= 'Gloock'>
                Sports Center
              </Typography>
              <MenuItem onClick={SignOut}><LogoutIcon style={{ marginRight: ".5rem" }} />Log out</MenuItem>
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