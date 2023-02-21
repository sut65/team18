import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { EquipmentListInterface } from "../../models/EquipmentList/IEquipmentList";
import { EquipmentNameInterface } from "../../models/EquipmentList/IEquipmentName";
import { RunNumberInterface } from "../../models/EquipmentList/IRunNumber";

import { MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { EmployeeInterface } from "../../models/IEmployee";

import {
    CreateEquipmentList,
    GetEquipmentName,
    GetRunNumber,
    GetEmployee,
}from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EquipmentListCreate() {
const [equipmentList, setEquipmentList] = React.useState<Partial<EquipmentListInterface>>({

  RunNumberID:0,
  EquipmentNameID:0,
  EmployeeID:0,

});
const [equipmentName, setEquipmentName] = useState<EquipmentNameInterface[]>([]);
const [runNumber, setRunNumer] = useState<RunNumberInterface[]>([]);
const [DateTime, setDateTime] = React.useState<Date | null>(null);
const [employeee, setEmployee] = React.useState<Partial<EmployeeInterface>>({});
const [employeeeName, setEmployeeName] = React.useState<Partial<EmployeeInterface>>({});

const [message, setAlertMessage] = React.useState("");

const [success, setSuccess] = useState(false);
const [error, setError] = useState(false);

  const getEquipmentName = async () => {
    let res = await GetEquipmentName();
    if (res) {
      setEquipmentName(res);
    }
  };
    
  const getRunNumber = async () => {
    let res = await GetRunNumber();
    if (res) {
      setRunNumer(res);
    }
  };

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setEmployee(res);
    }
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
        setEmployeeName(JSON.parse(localStorage.getItem("lid") || ""));
    }
    getEquipmentName();
    getRunNumber();
    getEmployee();
}, []);


  console.log(equipmentList);
  
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof equipmentList;
    setEquipmentList({
      ...equipmentList,
      [name]: event.target.value,
    });
  };

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

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {
    const id = event.target.id as keyof typeof EquipmentListCreate;
    const { value } = event.target;
    setEquipmentList({ ...equipmentList, [id]: value });
  };

 async function submit() {
      let data = {

      Detail: equipmentList.Detail ?? "",

      RunNumberID:typeof equipmentList.RunNumberID === "string" ? parseInt(equipmentList.RunNumberID) : 0,

      EquipmentNameID:typeof equipmentList.EquipmentNameID === "string" ? parseInt(equipmentList.EquipmentNameID) : 0,

      EmployeeID: employeeeName?.ID,

      DateTime: DateTime,
      
    };
    let res = await CreateEquipmentList(data);
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
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
        {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
        {message}
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกรายการอุปกรณ์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid item xs={6} sx={{ padding: 2 }}>
            <p>โปรดระบุรายละเอียด</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Detail"
                variant="outlined"
                type="string"
                size="medium"
                value={equipmentList.Detail || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขอุปกรณ์</p>
              <Select
                native
                value={equipmentList.RunNumberID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RunNumberID",
                }}
              >
                <option aria-label="None" value="">
                  โปรดเลือก หมายเลข
                </option>
                {runNumber.map((item: RunNumberInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Number}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่ออุปกรณ์</p>
              <Select
                native
                value={equipmentList.EquipmentNameID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EquipmentNameID",
                }}
              >
                <option aria-label="None" value="">
                  โปรดเลือก ชื่ออุปกรณ์
                </option>
                {equipmentName.map((item: EquipmentNameInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={DateTime}
                  onChange={(newValue) => {
                    setDateTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ padding: 2, marginTop: 0, }} >
                        <p>ชื่อผู้บันทึก</p>

                        <FormControl fullWidth variant="outlined" >

                            <TextField

                                disabled

                                id="employeeID"

                                color="secondary" variant="outlined"

                                type="string"

                                size="medium"

                                value={employeeeName?.Name}

                            />
                        </FormControl>
                    </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/equipment_shows"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default EquipmentListCreate;
