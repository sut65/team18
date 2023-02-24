import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { RoleInterface } from "../../models/IRole";
import { Link as RouterLink } from "react-router-dom";
import { GenderInterface } from "../../models/IGender";
import { EmployeeInterface } from "../../models/IEmployee";
import { createTheme, Divider, Grid } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { create } from "@mui/material/styles/createTransitions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { EducationInterface } from "../../models/Employee/IEducation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  CreateEmployee,
  GetEducation,
  GetGender,
  GetRole,
} from "../../services/HttpClientService";

//--------------ระบบพนักงาน ------------------------------
function EmployeeCreate() {
  const [error, setError] = React.useState(false);
  const [date, setDate] = useState<Date | null>(null); //วันเกิด
  const [success, setSuccess] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");
  const [role, setRole] = React.useState<RoleInterface[]>([]);
  const [gender, setGender] = React.useState<GenderInterface[]>([]);
  const [education, setEducation] = React.useState<EducationInterface[]>([]);
  const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({});

  //--------- รับค่า --------
  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGender(res);
    }
  };

  const getEducation = async () => {
    let res = await GetEducation();
    if (res) {
      setEducation(res);
    }
  };

  const getRole = async () => {
    let res = await GetRole();
    if (res) {
      setRole(res);
    }
  };

  useEffect(() => {
    getGender();
    getEducation();
    getRole();
  }, []);
  console.log(employee);

  // TextField
  const handleChangeEmployee = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof EmployeeCreate;
    const { value } = event.target;
    setEmployee({ ...employee, [id]: value });
  };

  // Combobox
  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof employee;
    setEmployee({
      ...employee,
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

  // Delay function
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // Submit
  async function submit() {
    let data = {
      Name: employee.Name ?? "",
      Tel: employee.Tel ?? "",
      Email: employee.Email ?? "",
      Password: employee.Password ?? "",
      DOB: date,
      GenderID:
        typeof employee.GenderID === "string" ? parseInt(employee.GenderID) : 0,
      EducationID:
        typeof employee.EducationID === "string"
          ? parseInt(employee.EducationID)
          : 0,
      RoleID:
        typeof employee.RoleID === "string" ? parseInt(employee.RoleID) : 0,
      User: {
        Name: employee.Email ?? "",
        Password: employee.Password ?? "",
      },
    };
    let res = await CreateEmployee(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
      await timeout(5000); //for 5 sec delay
      window.location.href = "/employee_show"; //เด้งไปหน้าโชว์
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
              บันทึกข้อมูลพนักงาน
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
              <TextField
                id="Name"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่อ"
                value={employee.Name || ""}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* เบอร์โทร */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Tel"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทร"
                value={employee.Tel || ""}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* อีเมลล์ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>อีเมลล์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอกเมลล์"
                value={employee.Email || ""}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* รหัสผ่าน */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>รหัสผ่าน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Password"
                variant="outlined"
                type="string" //type="password" จะมองไม่เห็นรหัสที่ตั้ง
                size="medium"
                placeholder="กรุณาตั้งรหัสผ่าน"
                value={employee.Password || ""}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* วันเกิด */}
          {/* npm install @mui/x-date-pickers */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>วันเกิด</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl fullWidth variant="outlined">
                <DatePicker
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </LocalizationProvider>
          </Grid>

          {/* เพศ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>เพศ</p>
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
                  <option value={item.ID}>{item.Gtype}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ประเภทพนักงาน*/}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>ประเภทพนักงาน</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee.RoleID}
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

          {/* ระดับการศึกษา */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>ระดับการศึกษา</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee.EducationID}
                onChange={handleChange}
                inputProps={{
                  name: "EducationID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุระดับการศึกษา
                </option>
                {education.map((item: EducationInterface) => (
                  <option value={item.ID}>{item.Education}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ปุ่ม */}
          <Grid item xs={5} margin={2}>
            <Button
              component={RouterLink}
              to="/employee_show"
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
export default EmployeeCreate;
