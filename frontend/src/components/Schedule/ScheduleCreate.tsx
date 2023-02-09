import React, { useState } from "react";
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



function ScheduleCreate() {
  // const classes = makeStyles();
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
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
              {/* <Select native disabled value={foodSickness.NutritionistID}>
            <option aria-label="None" value="">
              {nutritionists?.Name}
            </option>
          </Select> */}
              <InputLabel id="Name">กรุณาระบุชื่อ</InputLabel>
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

          {/* ประเภทพนักงาน */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>ประเภทพนักงาน</p>
            <FormControl fullWidth variant="outlined">
              {/* <Select native disabled value={foodSickness.NutritionistID}>
            <option aria-label="None" value="">
              {nutritionists?.Name}
            </option>
          </Select> */}
              <InputLabel id="Name">กรุณาระบุชื่อ</InputLabel>
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

          {/* หน้าที่รับผิดชอบ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>หน้าที่รับผิดชอบ</p>
            <FormControl fullWidth variant="outlined">
              {/* <Select native disabled value={foodSickness.NutritionistID}>
            <option aria-label="None" value="">
              {nutritionists?.Name}
            </option>
          </Select> */}
              <InputLabel id="Name">กรุณาระบุชื่อ</InputLabel>
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

          {/* เวลา */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>เวลา</p>
            <FormControl fullWidth variant="outlined">
              {/* <Select native disabled value={foodSickness.NutritionistID}>
            <option aria-label="None" value="">
              {nutritionists?.Name}
            </option>
          </Select> */}
              <InputLabel id="Name">กรุณาระบุชื่อ</InputLabel>
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

          {/* สถานที่ */}
          <Grid item xs={5} margin={2} container spacing={1}>
            <p>สถานที่</p>
            <FormControl fullWidth variant="outlined">
              {/* <Select native disabled value={foodSickness.NutritionistID}>
            <option aria-label="None" value="">
              {nutritionists?.Name}
            </option>
          </Select> */}
              <InputLabel id="Name">กรุณาระบุชื่อ</InputLabel>
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

export default ScheduleCreate;
