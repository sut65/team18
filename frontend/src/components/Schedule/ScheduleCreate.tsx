import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import { Schedule } from "@mui/icons-material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { createTheme, Divider, Grid } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { create } from "@mui/material/styles/createTransitions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Link as RouterLink } from "react-router-dom";
import { ScheduleInterface } from "../../models/Schedule/ISchedule";
import { EmployeeInterface } from "../../models/IEmployee";
import { RoleInterface } from "../../models/IRole";
import { DutyInterface } from "../../models/Schedule/IDuty";
import { TimeInterface } from "../../models/Schedule/ITime";
import { PlaceInterface } from "../../models/IPlace";
import { OcdInterface } from "../../models/IOcd";

import {
  CreateSchedule,
  GetDuty,
  GetTime,
  GetRole,
  GetPlace,
  GetDays,
} from "../../services/HttpClientService";

function ScheduleCreate() {
  const [error, setError] = React.useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");

  const [role, setRole] = React.useState<RoleInterface[]>([]);
  const [duty, setDuty] = React.useState<DutyInterface[]>([]);
  const [time, setTime] = React.useState<TimeInterface[]>([]);
  const [place, setPlace] = React.useState<PlaceInterface[]>([]);
  const [days, setDays] = React.useState<OcdInterface[]>([]);

  //const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
  //const [schedule, setSchedule] = useState<ScheduleInterface[]>([]);
  const [employee, setEmployee] = useState<Partial<EmployeeInterface>>({});
  const [schedule, setSchedule] = useState<Partial<ScheduleInterface>>({
    ID: 0,
    EmployeeID: 0,
    RoleID: 0,
  });

  //--------- รับค่า --------
  const getTime = async () => {
    let res = await GetTime();
    if (res) {
      setTime(res);
    }
  };

  const getDays = async () => {
    let res = await GetDays();
    if (res) {
      setDays(res);
    }
  };

  const getDuty = async () => {
    let res = await GetDuty();
    if (res) {
      setDuty(res);
    }
  };

  const getRole = async () => {
    let res = await GetRole();
    if (res) {
      setRole(res);
    }
  };

  const getPlace = async () => {
    let res = await GetPlace();
    if (res) {
      setPlace(res);
    }
  };

  // const getEmployee = async () => {
  //   let res = await GetEmployee();
  //   if (res) {
  //     setRole(res);
  //   }
  // };

  //ไม่ใส่ useEffect จะไม่ขึ้นให้เลือก combobox
  useEffect(() => {
    const getToken = localStorage.getItem("token");
        if (getToken) {
            setEmployee(JSON.parse(localStorage.getItem("lid") || ""));
        }
    getDuty();
    getTime();
    getRole();
    getPlace();
    getDays();
    //getEmployee();
  }, []);
  console.log(schedule);

  // Combobox
  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof schedule;
    setSchedule({
      ...schedule,
      [name]: event.target.value,
    });
  };

  //Alert
  const handleClose = (
    event?: React.SyntheticEvent | Event,

    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,

    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //Submit
  async function submit() {
    let data = {
      EmployeeID: employee?.ID,

      RoleID: employee?.RoleID,
      // RoleID: typeof schedule.RoleID === "string" ? parseInt(schedule.RoleID) : 0,
      
      // DutyID: schedule.DutyID,
      DutyID: typeof schedule.DutyID === "string" ? parseInt(schedule.DutyID) : 0,

      // OcdID: schedule.OcdID,
      OcdID: typeof schedule.OcdID === "string" ? parseInt(schedule.OcdID) : 0,
      
      //TimeID: schedule.TimeID,
      TimeID: typeof schedule.TimeID === "string" ? parseInt(schedule.TimeID) : 0,

      //PlaceID: schedule.PlaceID,
      PlaceID: typeof schedule.PlaceID === "string" ? parseInt(schedule.PlaceID) : 0,

      Record_Time: date,
    };
    console.log(data)
    let res = await CreateSchedule(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }
 

  return (
    <Container maxWidth="md">
      <Snackbar
        id="success"
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        id="error"
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      <Paper elevation={12}>
        {/* ชื่อระบบ */}
        <Box display="flex">
          <Box flexGrow={1} sx={{ background: "#FEAC3F" }}>
            <Typography
              component="h1"
              variant="h4" // ขนาดตัวอักษร
              color="Black"
              gutterBottom
              align="center"
              margin={2}
            >
              บันทึกตารางงาน
            </Typography>
          </Box>
        </Box>
        <Divider />

        {/* กำหนด layout ให้ช่องต่างๆ */}
        <Grid container spacing={3} margin={1}>
         
          {/* ชื่อ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <Select   
                disabled
                value={schedule?.EmployeeID}
              >
                <MenuItem value={0}>
                      {employee?.Name}
                </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                
              </Select>
            </FormControl>
          </Grid>

          {/* ประเภทพนักงาน */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>ประเภทพนักงาน</p>
            <FormControl fullWidth variant="outlined">
              <Select
                disabled
                value={schedule?.RoleID}
                onChange={handleChange}
              >
                <MenuItem value={0}>
                      {employee?.RoleID}
                </MenuItem> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า  
              </Select>
            </FormControl>
          </Grid>

          {/* หน้าที่รับผิดชอบ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>หน้าที่รับผิดชอบ</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={schedule.DutyID}
                onChange={handleChange}
                inputProps={{
                  name: "DutyID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหน้าที่รับผิดชอบ
                </option>
                {duty.map((item: DutyInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* เวลา */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>เวลา</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={schedule.TimeID}
                onChange={handleChange}
                inputProps={{
                  name: "TimeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุเวลา
                </option>
                {time.map((item: TimeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Range}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* สถานที่ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>สถานที่</p>
            <FormControl fullWidth variant="outlined">
            <Select
                native
                value={schedule.PlaceID}
                onChange={handleChange}
                inputProps={{
                  name: "PlaceID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุสถานที่
                </option>
                {place.map((item: PlaceInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Locate}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* วัน */}
          {/* npm install @mui/x-date-pickers */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>วัน</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={schedule.OcdID}
                onChange={handleChange}
                inputProps={{
                  name: "OcdID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุวันที่ต้องการบันทึก               
                  </option>
                {days.map((item: OcdInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Days}
                  </option>
                ))}
              </Select>
              </FormControl>
            </LocalizationProvider>
          </Grid>

          {/* ปุ่ม */}
          <Grid item xs={5} margin={2}>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              size="large"
              style={{ height: "42px", width: "100px" }}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={5} margin={2} spacing={1}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={submit}
              style={{ float: "right", height: "42px", width: "95px" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ScheduleCreate;
