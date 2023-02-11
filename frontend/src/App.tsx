import React, { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Signin from './components/Signin';
import Home from './components/Home';

import MemberCreate from './components/Member/MemberCreate';
import MemberEdit from './components/Member/MemberEdit';
import Navbar from './components/Navbar';
import ProgramHome from './components/ExerciseProgram/ProgramShow';
import ProgramCreate from './components/ExerciseProgram/ProgramCreate';
import MenuShow from './components/Menu';
import EmployeeCreate from './components/Employee/EmployeeCreate';
import ScheduleCreate from './components/Schedule/ScheduleCreate';
import PaymentCreate from './components/Payment/PaymentCreate';
import BillCreate from './components/Payment/billsCreate';
import PaymentShow from './components/Payment/PaymentShow';
import ProgramShow from './components/ExerciseProgram/ProgramShow';
import EquipmentListCreate from './components/EquipmentMenagement/EquipmentCreate';
import MemberS from './components/Member/MemberS';
import MemberShow from './components/Member/MemberShow';


const drawerWidth = 240;

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FEAC3F",
      },
      secondary: {
        main: "#8FCCB6"
      },
      text: {
        primary: "#1B2420",
        secondary: "#1B2420"
      }
    },

  })
  const [token, setToken] = useState<String>("");
  const [login, setLogin] = React.useState<String>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    setLogin(localStorage.getItem("login") || "");
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setRole(localStorage.getItem("role") || "");
    }
  }, []);

   if ((!token) && login) {
    localStorage.clear();
     return <Signin />
    }

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: Boolean; }>(({ theme, open }) => ({
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
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          {token && (
            <>
              <Navbar/>
              <div className='container-router'>
                <Routes>{role === "admin" && (
                  <>
                  <Route path="/login" element={<Home role={role}/>} />
                  <Route path='/employee_create' element={<EmployeeCreate />} />
                  <Route path='/schedule_create' element={<ScheduleCreate/>} />
                  </>
                  )
                }{role === "member" && (
                  <>
                  <Route path="/login" element={<Home role={role}/>} />
                  <Route path='/member_show' element={<MemberS/>} />
                  <Route path='/member_shows' element={<MemberShow/>} />
                  <Route path='/member_edit' element={<MemberEdit/>} />
                  <Route path='/program_booking' element={<ProgramHome/>} />
                  <Route path='/payment_create' element={<PaymentCreate />} />
                  <Route path='/bill_create' element={<BillCreate/>} />
                  <Route path='/payment_show' element={<PaymentShow/>} />
                  </>
                  )
                }{role === "employee" && (
                  <>
                  <Route path="/login" element={<Home role={role}/>} />
                  <Route path='/member_shows' element={<MemberS />} />
                  <Route path='/member_create' element={<MemberCreate/>} />
                  <Route path='/member_edit' element={<MemberEdit/>} />
                  <Route path='/equipment_create' element={<EquipmentListCreate/>} />
                  </>
                  )
                }{role === "trainer" && (
                  <>
                  <Route path="/login" element={<Home role={role}/>} />
                  <Route path='/program_create' element={<ProgramCreate />} />
                  <Route path='/program_show' element={<ProgramShow />} />

                  
                  </>
                  )
                }


                </Routes>
                
              </div>
            </>
          )}
          {!token && (
          <Fragment>
            <Routes>
              <Route path="/" element={<MenuShow />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/member_create" element={<MemberCreate />} />

            </Routes>
          </Fragment>)
      }
        </ThemeProvider>
      </Router>
    </div>
  );
}

