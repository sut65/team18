import React, { useState , useEffect} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { createTheme, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { create } from "@mui/material/styles/createTransitions";
import { Schedule } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import { ScheduleInterface } from "../../models/Schedule/ISchedule";
import { EmployeeInterface } from "../../models/IEmployee";
import { RoleInterface } from "../../models/IRole";
import { DutyInterface } from "../../models/Schedule/IDuty";
import { TimeInterface } from "../../models/Schedule/ITime";
import {
  CreateSchedule,
  GetEmployee,
  GetDuty,
  GetTime,
  GetRole,
} from "../../services/HttpClientService";

function ScheduleCreate() {
  // const classes = makeStyles();

  const [date, setDate] = useState<Date | null>(null);
  const [schedule, setSchedule] = useState<Partial<ScheduleInterface>>({});
  //const [schedule, setSchedule] = useState<ScheduleInterface[]>([]);

  
  const [role, setRole] = React.useState<RoleInterface[]>([]);
  const [duty, setDuty] = React.useState<DutyInterface[]>([]);
  const [time, setTime] = React.useState<TimeInterface[]>([]);
  const [employee, setEmployee] = useState<EmployeeInterface[]>([]);

  //--------- รับค่า --------
  const getTime = async () => {
    let res = await GetTime();
    if (res) {
      setTime(res);
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

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setRole(res);
    }
  };
  //ไม่ใส่ useEffect จะไม่ขึ้นให้เลือก combobox
  useEffect(() => {
    getDuty();
    getTime();
    getRole();
    getEmployee();
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

  return (
    <Container maxWidth="md">
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
                native
                value={schedule.EmployeeID}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุชื่อ
                </option>
                {schedule.map((item: ScheduleInterface) => (
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
                native
                value={schedule.RoleID}
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
                    {item.Type}
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
          {/* <Grid item xs={5} margin={2} container spacing={1}>
            <p>สถานที่</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee.GenderID}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุเพศ
                </option>
                {gender.map((item: GenderInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Gtype}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid> */}

          {/* วัน */}
          {/* npm install @mui/x-date-pickers */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>วัน</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl fullWidth variant="outlined">
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                />
              </FormControl>
            </LocalizationProvider>
          </Grid>

          {/* ปุ่ม */}
          <Grid item xs={5} margin={2}>
            <Button
              component={RouterLink}
              to="/"
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
              //onClick={submit}
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