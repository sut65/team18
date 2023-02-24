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
import Autocomplete from "@mui/material/Autocomplete";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, Divider, Grid } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { create } from "@mui/material/styles/createTransitions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { EmployeeInterface } from "../../models/IEmployee";
import { GenderInterface } from "../../models/IGender";
import { RoleInterface } from "../../models/IRole";
import { EducationInterface } from "../../models/Employee/IEducation";
import {
  GetRole,
  GetGender,
  GetEmployee,
  GetEducation,

  GetEmployeeID,
  ListEmployeeID,
  CreateEmployee,
  UpdateEmployee,
} from "../../services/HttpClientService";
import { Stack } from "@mui/system";

//--------------ระบบพนักงาน ------------------------------
function EmployeeEdit() {
  const [error, setError] = React.useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const [role, setRole] = React.useState<RoleInterface[]>([]);
  const [gender, setGender] = React.useState<GenderInterface[]>([]);
  const [education, setEducation] = React.useState<EducationInterface[]>([]);

  const [user, setUser] = React.useState<Partial<EmployeeInterface>>({});
  const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
  const [employee_Id, setEmployeeID] = React.useState<Partial<EmployeeInterface>>({});

  // --------------------------------------------ลบข้อมูล------------------------------------------------
  async function DeleteEmployee() {
    //localStorage.clear();
    window.location.href = "/employee_show";
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee_Id.ID),
    };

    let res = await fetch(
      `${apiUrl}/employees/${JSON.stringify(employee_Id.ID)}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // DeleteEmployee();
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
    return res;
  }

  
  //-------------------------------------------- รับค่า --------------------------------------------------------
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

  // ดึงข้อมูลออกมาในรูป ID
  const listEmployeeID = async (id: any) => {
    let res = await ListEmployeeID(id);
    if (res) {
      setEmployee(res);
      console.log(res);
    }
  };

  //ฟังก์ชันที่เอาไว้ใช้เรียกงานเมื่อ component มีการเปลี่้ยนแปลง สามารถส่เงื่อนไขการเรียกใช้ได้ที่[]
  useEffect(() => {
    // ดึงข้อมูล database จาก storage
    const getToken = localStorage.getItem("token");
    if (getToken) {
      const x = JSON.parse(localStorage.getItem("lid") || "");
      setUser(x);
      listEmployeeID(x.ID);
    }
    getGender();
    getEducation();
    getRole();
  }, []);
  console.log(employee);

  // ----------------------------------- ค้นหาข้อมูล --------------------------------------------------------
  const onChange = async (event: SelectChangeEvent) => {
    const id = event.target.value;
    let res = await GetEmployeeID(id);
    if (res) {
      let data = {
        // Combobox เปลี่ยนไปด้วย
        ID: res.ID,
        Name: res.Name,
        Tel: res.Tel,
        Email: res.Email,
        Password: res.Password,
        DOB: res.DOB,

        GenderID: res.GenderID,
        EducationID: res.EducationID,
        RoleID: res.RoleID,
      };

      setEmployeeID(res);
    }
  };

  // ----------------------------------- เปลี่ยนข้อมูล(input) --------------------------------------------------------
  // TextField
  const handleChangeEmployee = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof EmployeeEdit;
    const { value } = event.target;
    setEmployeeID({ ...employee_Id, [id]: value });
  };

  // Combobox
  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof employee;
    setEmployeeID({
      ...employee_Id,
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
      ID: employee_Id.ID,
      Name: employee_Id.Name,
      Tel: employee_Id.Tel,
      Email: employee_Id.Email,
      Password: employee_Id.Password,
      DOB: date,
      GenderID:
        typeof employee_Id.GenderID === "string"
          ? parseInt(employee_Id.GenderID)
          : employee_Id.GenderID,
      EducationID:
        typeof employee_Id.EducationID === "string"
          ? parseInt(employee_Id.EducationID)
          : employee_Id.EducationID,
      RoleID:
        typeof employee_Id.RoleID === "string"
          ? parseInt(employee_Id.RoleID)
          : employee_Id.RoleID,
    };
    console.log("submit");
    console.log(data);
    let res = await UpdateEmployee(data);
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
        id="true"
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
              แก้ไขข้อมูลพนักงาน
            </Typography>
          </Box>
        </Box>
        <Divider />

        {/* กำหนด layout ให้ช่องต่างๆ */}
        <Grid container spacing={1} margin={1} padding={1}>
          {/* ค้นหา */}
          <Grid item spacing={2}>
            <p>ค้นหารายชื่อที่ต้องการแก้ไข</p>
          </Grid>
          <Grid item xs={8.5}>
            <FormControl variant="outlined" fullWidth>
              <Select
                native
                value={employee_Id.ID + ""}
                onChange={onChange}
                inputProps={{
                  name: "ID",
                }}
              >
                <option aria-label="None" value="">
                  ID
                </option>
                {employee?.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ชื่อ */}
          <Grid item xs={5} margin={2} container spacing={2}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                variant="outlined"
                type="string"
                size="medium"
                //placeholder="กรุณากรอกข้อมูลชื่อ"
                value={employee_Id?.Name}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* เบอร์โทร */}
          <Grid item xs={5} margin={2} container spacing={3}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Tel"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทร"
                value={employee_Id?.Tel}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* อีเมลล์ */}
          <Grid item xs={5} margin={2} container spacing={2}>
            <p>อีเมลล์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอกเมลล์"
                value={employee_Id?.Email}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* รหัสผ่าน */}
          <Grid item xs={5} margin={2} container spacing={3}>
            <p>รหัสผ่าน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Password"
                variant="outlined"
                type="string" //type="password" จะมองไม่เห็นรหัสที่ตั้ง
                size="medium"
                placeholder="กรุณาตั้งรหัสผ่าน"
                value={employee_Id?.Password}
                onChange={handleChangeEmployee}
              />
            </FormControl>
          </Grid>

          {/* วันเกิด */}
          {/* npm install @mui/x-date-pickers */}
          <Grid item xs={5} margin={2} container spacing={2}>
            <p>วันเกิด</p>
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

          {/* เพศ */}
          <Grid item xs={5} margin={2} container spacing={3}>
            <p>เพศ</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee_Id?.GenderID}
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
          <Grid item xs={5} margin={2} container spacing={2}>
            <p>ประเภทพนักงาน</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee_Id?.RoleID}
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
          <Grid item xs={5} margin={2} container spacing={3}>
            <p>ระดับการศึกษา</p>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={employee_Id?.EducationID}
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
          <Grid item xs={5} margin={2} padding={1}>
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
              onClick={DeleteEmployee}
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
export default EmployeeEdit;
