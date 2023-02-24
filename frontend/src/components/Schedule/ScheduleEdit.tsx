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
import { createTheme, Divider, Grid , Stack} from "@mui/material";
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
  GetDuty,
  GetTime,
  GetRole,
  GetPlace,
  GetDays,
  GetEmployee,
  GetScheduleID,
  ListScheduleID,
  CreateSchedule,
  UpdateSchedule,
} from "../../services/HttpClientService";

function ScheduleEdit() {
  const [error, setError] = React.useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [success, setSuccess] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");

  const [role, setRole] = React.useState<RoleInterface[]>([]);
  const [duty, setDuty] = React.useState<DutyInterface[]>([]);
  const [time, setTime] = React.useState<TimeInterface[]>([]);
  const [place, setPlace] = React.useState<PlaceInterface[]>([]);
  const [days, setDays] = React.useState<OcdInterface[]>([]);

  // const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
  //const [schedule, setSchedule] = useState<ScheduleInterface[]>([]);
  const [mapEmployee, setMapEmployee] = useState<EmployeeInterface[]>([]);
  const [employee, setEmployee] = useState<Partial<EmployeeInterface>>({});
  const [schedule, setSchedule] = useState<ScheduleInterface[]>([]);
  const [newSchedule, setNewSchedule] = useState<Partial<ScheduleInterface>>({
    // ID: 0,
    // EmployeeID: 0,
    //RoleID: 0,
  });
// --------------------------------------------ลบข้อมูล------------------------------------------------
async function DeleteSchedule() {
  //localStorage.clear();
  window.location.href = "/schedule_show"; 
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSchedule.ID),
  };

  let res = await fetch(
    `${apiUrl}/schedules/${JSON.stringify(newSchedule.ID)}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        // DeleteSchedule();
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  return res;
}


  //-------------------------------------------- รับค่า --------------------------------------------------------
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

  const listScheduleID = async (id: any) => {
    let res = await ListScheduleID(id);
    if (res) {
      setSchedule(res);
      console.log(res);
    }
  };

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setMapEmployee(res);
    }
  };

  //ไม่ใส่ useEffect จะไม่ขึ้นให้เลือก combobox
  useEffect(() => {
    // ดึงข้อมูล database จาก storage
    const getToken = localStorage.getItem("token");
    if (getToken) {
      //setEmployee(JSON.parse(localStorage.getItem("lid") || ""));
      const x = JSON.parse(localStorage.getItem("lid") || "");
      setEmployee(x);
      listScheduleID(x.ID);
    }
    getDuty();
    getTime();
    getRole();
    getPlace();
    getDays();
    getEmployee();
  }, []);
  console.log(schedule);

  // ----------------------------------- ค้นหาข้อมูล --------------------------------------------------------
  const onChange = async (event: SelectChangeEvent) => {
    const id = event.target.value;
    let res = await GetScheduleID(id);
    if (res) {
      let data = {
        // Combobox เปลี่ยนไปด้วย
        ID: res.ID,
        EmployeeID: res.EmployeeID,
        RoleID: res.RoleID,
        DutyID: res.DutyID,
        OcdID: res.OcdID,
        TimeID: res.TimeID,
        PlaceID: res.PlaceID,
        Detail: res.Detail,
  
        Record_Time: date,
      };

      setNewSchedule(res);
    }
  };

    // TextField
 const handleChangeEmployee = (
  event: React.ChangeEvent<{ id?: string; value: any }>
) => {
  const id = event.target.id as keyof typeof ScheduleEdit;
  const { value } = event.target;
  setNewSchedule({ ...newSchedule, [id]: value });
};

  // Combobox
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof newSchedule;
    setNewSchedule({
      ...newSchedule,
      [name]: event.target.value,
    });
  };

  // -----------------------------------  Alert --------------------------------------------------------
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
  
  // -----------------------------------  Submit --------------------------------------------------------
  async function submit() {
    let data = {
      ID: newSchedule.ID,

      EmployeeID: employee?.ID,
      RoleID: employee?.RoleID,
      // RoleID: typeof schedule.RoleID === "string" ? parseInt(schedule.RoleID) : 0,

      // DutyID: newSchedule.DutyID,
      DutyID: typeof newSchedule.DutyID === "string" ? parseInt(newSchedule.DutyID) : 0,

      // OcdID: newSchedule.OcdID,
      OcdID: typeof newSchedule.OcdID === "string" ? parseInt(newSchedule.OcdID) : 0,

      // TimeID: newSchedule.TimeID,
      TimeID: typeof newSchedule.TimeID === "string" ? parseInt(newSchedule.TimeID) : 0,

      // PlaceID: newSchedule.PlaceID,
      PlaceID: typeof newSchedule.PlaceID === "string" ? parseInt(newSchedule.PlaceID) : 0,

      Detail: newSchedule.Detail,
      Record_Time: date,
    };
    console.log("submit");
    console.log(data);
    let res = await UpdateSchedule(data);
    if (res.status) {
      setAlertMessage("แก้ไขข้อมูลสำเร็จ");
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
              แก้ไขตารางงาน
            </Typography>
          </Box>
        </Box>
        <Divider />

        {/* กำหนด layout ให้ช่องต่างๆ */}
        <Grid container spacing={3} margin={1}>

          {/* ค้นหา */}
          <Grid item spacing={2}>
            <p>ค้นหารายชื่อที่ต้องการแก้ไข</p>
          </Grid>
          <Grid item xs={8.5}>
            <FormControl variant="outlined" fullWidth>
              <Select
                native
                value={newSchedule.ID + ""}
                onChange={onChange}
                inputProps={{
                  name: "ID",
                }}
              >
                <option aria-label="None" value="">
                  ID
                </option>
                {schedule?.map((item: ScheduleInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ชื่อ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <Select 
                //disabled 
                native
                value={newSchedule.EmployeeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}
                >
                <option aria-label="None" value="">
                  พนักงาน
                </option>
                {mapEmployee?.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ประเภทพนักงาน */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>ประเภทพนักงาน</p>
            <FormControl fullWidth variant="outlined">
              <Select 
                disabled 
                value={newSchedule.RoleID + ""} 
                onChange={handleChange}
                inputProps={{
                  name: "RoleID",
                }}
                >
                <option aria-label="None" value="">
                  กรุณาระบุประเภทพนักงาน
                </option>
                {role.map((item: RoleInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* หน้าที่รับผิดชอบ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>หน้าที่รับผิดชอบ</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={newSchedule.DutyID + ""}
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
                value={newSchedule.TimeID + ""}
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
                value={newSchedule.PlaceID + ""}
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
                  value={newSchedule.OcdID + ""}
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

          {/* รายละเอียดงานที่ทำ */}
          <Grid item xs={10.5} margin={2} container spacing={1}>
            <p>รายละเอียด</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Detail"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่อ"
                value={newSchedule.Detail || ""}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>


             {/* ปุ่ม */}
             <Grid item xs={5} margin={2} padding={1}>
            <Button
              component={RouterLink}
              to="/schedule_show"
              variant="contained"
              size="large"
              style={{ height: "42px", width: "100px" }}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={5} margin={2} spacing={1}>
          <Stack direction="row-reverse" spacing={2}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={submit}
              style={{ float: "right", height: "42px", width: "95px" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={DeleteSchedule}
              style={{
                float: "right",
                height: "42px",
                width: "95px",
                padding: 1,
              }}
            >
              Delete
            </Button>
            </Stack>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
}

export default ScheduleEdit;
