import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, Divider, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { create } from "@mui/material/styles/createTransitions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NavbarEmployee from "./NavbarEmployee";

//import NavbarEmployee from "./NavbarEmployee";


// import { createStyles, makeStyles, Theme } from '@mui/styles';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     .root: {
//       flexGrow: 1,
//     },
//     container: {
//       marginTop: theme.spacing(2),
//     },
//     paper: {
//       padding: theme.spacing(2),
//       color: theme.palette.text.secondary,
//     },
//   })
// );

//--------------ระบบพนักงาน ------------------------------
function EmployeeCreate() {
  // const classes = makeStyles();
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  return (
      //ยังไม่ใช้ ถ้าจะใช้ใส่ div ไว้ข้างบน <NavbarEmployee />
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
                  // value={nutritionist.Name || ""}
                  // onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            {/* เบอร์โทร */}
            <Grid item xs={5} margin={2} container spacing={1}>
              <p>เบอร์โทรศัพท์</p>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="Telephone"
                  variant="outlined"
                  type="string"
                  size="medium"
                  placeholder="กรุณากรอกเบอร์โทร"
                  // value={nutritionist.Name || ""}
                  // onChange={handleInputChange}
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
                  placeholder="กรุณากรอกอรเมลล์"
                  // value={nutritionist.Name || ""}
                  // onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            {/* รหัสผ่าน */}
            <Grid item xs={5} margin={2} container spacing={1}>
              <p>รหัสผ่าน</p>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="Passwords"
                  variant="outlined"
                  type="string"
                  size="medium"
                  placeholder="กรุณาตั้งรหัสผ่าน"
                  // value={nutritionist.Name || ""}
                  // onChange={handleInputChange}
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
            <Grid item xs={5} margin={2} container spacing={1}>
              <p>เพศ</p>
              <FormControl fullWidth variant="outlined">
                {/* <Select native disabled value={foodSickness.NutritionistID}>
          <option aria-label="None" value="">
            {nutritionists?.Name}
          </option>
        </Select> */}
                <InputLabel id="Name">กรุณาเลือกเพศ</InputLabel>
                <Select
                  labelId="Name"
                  id="demo-simple-select"
                  value={name}
                  label="Age"
                  onChange={handleChangeName}
                >
                  <MenuItem value={"Tanaphat"}>Tanaphat</MenuItem>
                  <MenuItem value={"Nopakan"}>Nopakan</MenuItem>
                  <MenuItem value={"Kantaya"}>Kantaya</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* ประเภทพนักงาน*/}
            <Grid item xs={5} margin={2} container spacing={1}>
              <p>ประเภทพนักงาน</p>
              <FormControl fullWidth variant="outlined">
                {/* <Select native disabled value={foodSickness.NutritionistID}>
          <option aria-label="None" value="">
            {nutritionists?.Name}
          </option>
        </Select> */}
                <InputLabel id="Name">กรุณาเลือกประเภท</InputLabel>
                <Select
                  labelId="Name"
                  id="demo-simple-select"
                  value={name}
                  label="Age"
                  onChange={handleChangeName}
                >
                  <MenuItem value={"Tanaphat"}>Tanaphat</MenuItem>
                  <MenuItem value={"Nopakan"}>Nopakan</MenuItem>
                  <MenuItem value={"Kantaya"}>Kantaya</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* ระดับการศึกษา */}
            <Grid item xs={5} margin={2} container spacing={1}>
              <p>ระดับการศึกษา</p>
              <FormControl fullWidth variant="outlined">
                {/* <Select native disabled value={foodSickness.NutritionistID}>
          <option aria-label="None" value="">
            {nutritionists?.Name}
          </option>
        </Select> */}
                <InputLabel id="Name">กรุณาระดับการศึกษา</InputLabel>
                <Select
                  labelId="Name"
                  id="demo-simple-select"
                  value={name}
                  label="Age"
                  onChange={handleChangeName}
                >
                  <MenuItem value={"Tanaphat"}>Tanaphat</MenuItem>
                  <MenuItem value={"Nopakan"}>Nopakan</MenuItem>
                  <MenuItem value={"Kantaya"}>Kantaya</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* ปุ่ม */}
            <Grid item xs={5} margin={2}>
              <Button
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
