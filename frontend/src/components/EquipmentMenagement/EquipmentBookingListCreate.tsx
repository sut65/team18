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

import { EquipmentBookingListInterface }  from "../../models/IEquipmentBookingList";
import { EquipmentListInterface } from "../../models/IEquipmentList";
import { MemberInterface } from "../../models/IMember";

import { MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
    CreateEquipmentBookingList,
    GetEquipmentList,
    GetMember,
  }from "../../services/HttpClientService";

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function EquipmentBookingListCreate() {
  const [equipmentBookingList, setEquipmentBookingList] = React.useState<Partial<EquipmentBookingListInterface>>({
    EquipmentListID:0,
    MemberID:0
  
  });
  const [equipmentList, setEquipmentList] = useState<EquipmentListInterface[]>([]);
  const [member, setMember] = React.useState<Partial<MemberInterface>>({});
  const [DateTimeBooking, setDateTimeBooking] = React.useState<Date | null>(null);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const getEquipmentList = async () => {
    let res = await GetEquipmentList();
    if (res) {
      setEquipmentList(res);
    }
  };
    
  const getMember = async () => {
    let res = await GetMember();
    if (res) {
      setMember(res);
    }
  };



  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
        setMember(JSON.parse(localStorage.getItem("lid") || ""));
    }
    getEquipmentList();
    getMember();
}, []);

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof equipmentBookingList;
    setEquipmentBookingList({
      ...equipmentBookingList,
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
      const id = event.target.id as keyof typeof EquipmentBookingListCreate;
      const { value } = event.target;
      setEquipmentBookingList({ ...equipmentBookingList, [id]: value });
    };
  
  
  async function submit() {
    let data = {
      EquipmentListID:typeof  equipmentBookingList.EquipmentListID === "string" ? parseInt(equipmentBookingList.EquipmentListID) : 0,
      MemberID: typeof  equipmentBookingList.MemberID === "string" ? parseInt(equipmentBookingList.MemberID) : 0,
      DateTimeBooking: DateTimeBooking,
    };
    
    let res = await CreateEquipmentBookingList(data);
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
              Equipment Booking List
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Equipment name</p>
              <Select
                native
                value={equipmentBookingList.EquipmentListID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EquipmentListID",
                }}
              >
                <option aria-label="None" value="">
                  Name
                </option>
                {equipmentList.map((item: EquipmentListInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Detail}
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
                  value={DateTimeBooking}
                  onChange={(newValue) => {
                    setDateTimeBooking(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <p>ผู้จอง:</p>
                                <Select
                                    value={equipmentBookingList?.MemberID}
                                    disabled
                                >
                                    <MenuItem value={0} >
                                        {member?.Name}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/equipmentBookingList"
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
export default EquipmentBookingListCreate;
