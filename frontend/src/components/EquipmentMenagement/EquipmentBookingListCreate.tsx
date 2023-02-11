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
  const [equipmentList, setEquipmentList] = useState<EquipmentListInterface[]>([]);
  const [member, setMember] = useState<MemberInterface[]>([]);
  const [equipmentBookingList, setEquipmentBookingList]  = useState<EquipmentBookingListInterface>({});

const [success, setSuccess] = useState(false);
const [error, setError] = useState(false);
  
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

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof equipmentBookingList;
      setEquipmentBookingList({
        ...equipmentBookingList,
        [name]: event.target.value,
      });
    };
  
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
    getEquipmentList();
    getMember();
  }, []);
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  
  async function submit() {
    let data = {
      EquipmentListID: convertType(equipmentBookingList.EquipmentListID),
      MemberID: convertType(equipmentBookingList.MemberID),
    };
    
    let res = await CreateEquipmentBookingList(data);
    if (res) {
      setSuccess(true);
    } else {
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
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
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
              <p>Member</p>
              <Select
                native
                value={equipmentBookingList.MemberID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "MemberID",
                }}
              >
                <option aria-label="None" value="">
                  member
                </option>
                {member.map((item: MemberInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
