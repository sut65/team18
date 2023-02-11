import React, { useEffect } from "react";

import {Link as RouterLink} from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { InputAdornment, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { GenderInterface } from "../../models/IGender";
import { MemberInterface } from "../../models/IMember";
import { TypemInterface } from "../../models/ITypem";
import { EvidenceInterface } from "../../models/IEvidencet";
import { GetGender, GetTypem, GetEvidencet, CreateMember } from "../../services/HttpClientService";
import NavbarMember from "../NavbarMember";




const theme = createTheme({
	palette: {
	  primary: {
		main: "#FEAC3F",
	  },
	  secondary: {
		main: "#ffebee"
	  },
	  text: {
		primary: "#1B2420",
		secondary: "#1B2420"
	  }
	},
	
  })


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

  props,

  ref

) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function ProgramCreate() {
    //Partial คือเลือกค่า แล้ว set ค่าได้เฉพาะตัวได้

    const [member, setMember] = React.useState<Partial<MemberInterface>>({
      Age:1 ,
      GenderID:0,
      TypemID:0,
      EvidenceID:0,
  
    });
  const [Bdate, setBdate] = React.useState<Date | null>(null);

  const [gender, setGender] = React.useState<GenderInterface[]>([]);

  const [typem, setTypem] = React.useState<TypemInterface[]>([]);

  const [evidencet, setEvidencet] = React.useState<EvidenceInterface[]>([]);

  const [success, setSuccess] = React.useState(false);

  const [error, setError] = React.useState(false);

  const [message, setAlertMessage] = React.useState("");

  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGender(res);
    }
  };

  const getTypem = async () => {
    let res = await GetTypem();
    if (res) {
      setTypem(res);
    }
  };

  const getEvidencet = async () => {
    let res = await GetEvidencet();
    if (res) {
      setEvidencet(res);
    }
  };

  useEffect(() => {
    getGender();
    getTypem();
    getEvidencet();
  }, []);

  console.log(member);


  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof member;
    const { value } = event.target;
    setMember({ ...member, [id]: value  === "" ? "" : Number(value)  });
  };

  
  // combobox
  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof member;
    setMember({
      ...member,
      [name]: event.target.value,
    });
  };

  //เปิดปิดตัว Alert
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

    const id = event.target.id as keyof typeof ProgramCreate;

    const { value } = event.target;

    setMember({ ...member, [id]: value });

  };

  async function submit() {
      let data = {

      Name: member.Name ?? "",
      Email: member.Email ?? "",
      Password: member.Password ?? "",
      Age: member.Age ?? 0,

      GenderID:typeof member.GenderID === "string" ? parseInt(member.GenderID) : 0,

      TypemID:typeof member.TypemID === "string" ? parseInt(member.TypemID) : 0,

      EvidenceID:typeof member.EvidenceID === "string" ? parseInt(member.EvidenceID) : 0,

      Bdate: Bdate,
      User: {
       Name: member.Email ?? "",
        Password: member.Password ?? "",
      }
    };
    let res = await CreateMember(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }
  

  return (
    <div>
    <Container maxWidth="md">
      <Snackbar
        id="success"
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
        {message}
        </Alert>
      </Snackbar>
      <Snackbar  id="error" open={error} autoHideDuration={6000} onClose={handleClose}>
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
          <Box sx={{ paddingX: 35, paddingY: 1 }}>
            <ThemeProvider theme={theme}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                สร้างโปรแกรมออกกำลังกาย
              </Typography>
            </ThemeProvider>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2}>
        <Grid item xs={12} alignItems="center">
          <p>ชื่อโปรแกรม</p>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Name"
              variant="outlined"
              type="string"
              size="medium"
              value={member.Name || ""}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8} >
          <p>เลือกรูปแบบวอร์มอัพ</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={member.GenderID}
              onChange={handleChange}
              inputProps={{
              name: "GenderID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเซ็ต
              </option>
                {gender.map((item: GenderInterface) => (
                  <option value={item.ID}>{item.Gtype}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} >
          <p>เลือกรูปแบบออกกำลังกาย</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={member.GenderID}
              onChange={handleChange}
              inputProps={{
              name: "GenderID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเซ็ต
              </option>
                {gender.map((item: GenderInterface) => (
                  <option value={item.ID}>{item.Gtype}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} >
          <p>เลือกรูปแบบยืดกล้ามเนื้อ</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={member.GenderID}
              onChange={handleChange}
              inputProps={{
              name: "GenderID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเซ็ต
              </option>
                {gender.map((item: GenderInterface) => (
                  <option value={item.ID}>{item.Gtype}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} >
                <FormControl fullWidth variant="outlined">
                  <p>กำหนดเวลา</p>
                  <TextField
                    id="Age"
                    variant="outlined"
                    type="number"
                    size="medium"
                    InputProps={{ name: "MinPrice"}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={member?.Age}
                    onChange={handleInputChangenumber}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8} >
          <p>เทรนเนอร์ที่สร้างโปรแกรม</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={member.GenderID}
              onChange={handleChange}
              inputProps={{
              name: "GenderID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเทรนเนอร์
              </option>
                {gender.map((item: GenderInterface) => (
                  <option value={item.ID}>{item.Gtype}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          </Grid>


          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
              <Button component={RouterLink} to="/member_show" variant="contained" color="primary">
                <Typography color="secondary">

                  Back

                </Typography>
              </Button>
            </ThemeProvider>

            <ThemeProvider theme={theme}>
              <Button

                style={{ float: "right" }}

                onClick={submit}

                variant="contained"

                color="primary"

              >
                <Typography color="secondary">

                  Submit

                </Typography>
              </Button>
            </ThemeProvider>

          </Grid>

      </Paper>

    </Container>
    </div>

  );

}


export default ProgramCreate;