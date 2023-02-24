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
import PaymentCreate from './components/Payment/PaymentCreate';
import BillCreate from './components/Payment/billsCreate';
import PaymentShow from './components/Payment/PaymentShow';
import ProgramShow from './components/ExerciseProgram/ProgramShow';
import EquipmentListCreate from './components/EquipmentMenagement/EquipmentCreate';
import MemberS from './components/Member/MemberS';
import MemberShow from './components/Member/MemberShow';

import EmployeeShow from './components/Employee/EmployeeShow';
import EmployeeEdit from './components/Employee/EmployeeEdit';
import EmployeeCreate from './components/Employee/EmployeeCreate';

import ScheduleShow from './components/Schedule/ScheduleShow';
import ScheduleEdit from './components/Schedule/ScheduleEdit';
import ScheduleCreate from './components/Schedule/ScheduleCreate';

import NewsCreate from './components/News/NewsCreate';
import NewsUpdate from './components/News/NewsUpdate';
import EquipmentBookingListCreate from './components/EquipmentMenagement/EquipmentBookingListCreate';
import NotifyShow from './components/Notify/NotifyShow';
import NotifyShowad from './components/Notify/NotifyAdmin';
import NotifyEdit from './components/Notify/NotifyEdit';
import NotifyCreate from './components/Notify/NotifyCreate';
import EquipmentBookingShow from './components/EquipmentMenagement/EquipmentBookingShow';
import EquipmentListShow from './components/EquipmentMenagement/EquipmentListShow';
import EquipmentListEdit from './components/EquipmentMenagement/EquipmentListEdit';
import EquipmentBookingEdit from './components/EquipmentMenagement/EquipmentBookingEdit';
import News from './components/News/News';
import ProgramUpdate from './components/ExerciseProgram/ProgramUpdate';
import TrainerShow from './components/Trainer/TrainerShow';
import TrainerCreate from './components/Trainer/TrainerCreate';
import TrainerUpdate from './components/Trainer/TrainerUpdate';
import BookInfoShow from './components/BookInfo/BookInfoShow';
import BookInfoCreate from './components/BookInfo/BookInfoCreate';
import BookInfoUpdate from './components/BookInfo/BookInfoUpdate';



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
              <Navbar />
              <div className='container-router'>
                <Routes>{role === "admin" && (
                  <>
                    <Route path="/login" element={<Home role={role} />} />
                    <Route path='/news_create' element={<NewsCreate />} />
                    <Route path='/employee_edit' element={<EmployeeEdit  />} />
                    <Route path='/employee_show' element={<EmployeeShow />} />
                    <Route path='/employee_create' element={<EmployeeCreate />} />
                    <Route path='/news_shows' element={<News />} />
                    <Route path='/news_create' element={<NewsCreate />} />
                    <Route path='/news_update' element={<NewsUpdate />} />
                    <Route path='/member_shows' element={<MemberShow />} />
                  </>
                )
                }{role === "member" && (
                  <>
                    <Route path="/login" element={<Home role={role} />} />
                    <Route path='/member_show' element={<MemberS />} />
                    <Route path='/member_shows' element={<MemberShow />} />
                    <Route path='/member_edit' element={<MemberEdit />} />
                    <Route path='/notify_create' element={<NotifyCreate />} />
                    <Route path='/notify_show' element={<NotifyShow />} />
                    <Route path='/notify_edit' element={<NotifyEdit />} />
                    <Route path='/trainer' element={<TrainerShow />} />
                    <Route path='/trainer/trainer_create' element={<TrainerCreate />} />
                    <Route path='/trainer/trainer_edit' element={<TrainerUpdate />} />
                    <Route path='/payment_create' element={<PaymentCreate />} />
                    <Route path='/bill_create' element={<BillCreate />} />
                    <Route path='/payment_show' element={<PaymentShow />} />
                    <Route path='/equipment_booking' element={<EquipmentBookingListCreate />} />
                    <Route path='/equipment_booking_show' element={<EquipmentBookingShow />} />
                    <Route path='/equipment_booking_edit' element={<EquipmentBookingEdit />} />
                    <Route path='/news_shows' element={<News />} />
                    <Route path='/place_booking' element={<BookInfoShow />} />
                    <Route path='/place_booking/place_booking_create' element={<BookInfoCreate />} />
                    <Route path='/place_booking/place_booking_edit' element={<BookInfoUpdate />} />
                  </>
                )
                  }{role === "employee" && (
                    <>
                      <Route path="/login" element={<Home role={role} />} />
                      <Route path='/member_shows' element={<MemberShow />} />
                      <Route path='/notify_shows' element={<NotifyShowad/>} />
                      <Route path='/equipment_create' element={<EquipmentListCreate />} />
                      <Route path='/schedule_edit' element={<ScheduleEdit />} />
                      <Route path='/schedule_show' element={<ScheduleShow />} />
                      <Route path='/schedule_create' element={<ScheduleCreate />} />
                      <Route path='/equipment_shows' element={<EquipmentListShow />} />
                      <Route path='/equipment_edit' element={<EquipmentListEdit />} />
                      <Route path='/news_shows' element={<News />} />
                      <Route path='/news_create' element={<NewsCreate />} />
                      <Route path='/news_update' element={<NewsUpdate />} />
                      <Route path='/member_shows' element={<MemberShow />} />
                    </>
                  )
                  }{role === "trainer" && (
                    <>
                      <Route path="/login" element={<Home role={role} />} />
                      <Route path='/program' element={<ProgramShow />} />
                      <Route path='/program/program_create' element={<ProgramCreate />} />
                      <Route path='/program/program_edit' element={<ProgramUpdate />} />
                      <Route path='/schedule_edit' element={<ScheduleEdit />} />
                      <Route path='/schedule_show' element={<ScheduleShow />} />
                      <Route path='/schedule_create' element={<ScheduleCreate />} />
                      <Route path='/news_shows' element={<News />} />
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

