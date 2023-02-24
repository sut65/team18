import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

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

import DeleteIcon from '@mui/icons-material/Delete';

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { InputAdornment, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { GenderInterface } from "../../models/IGender";
import { MemberInterface } from "../../models/IMember";
import { TypemInterface } from "../../models/ITypem";
import { EvidenceInterface } from "../../models/IEvidencet";
import { GetGender, GetTypem, GetEvidence, CreateMember, UpdateMember, GetMember } from "../../services/HttpClientService";
import CheckIcon from '@mui/icons-material/Check';
import { getByPlaceholderText } from "@testing-library/react";




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


function MemberEdit() {
  //Partial คือเลือกค่า แล้ว set ค่าได้เฉพาะตัวได้
  const getToken = localStorage.getItem("token");
  const [user, setUser] = React.useState<Partial<MemberInterface>>({});
  const [member, setMember] = React.useState<Partial<MemberInterface>>({
    ID: user.ID,
    Name: user.Name,
    Email: user.Email,
    Password: user.Password,
    Age: user.Age,
    GenderID: user.GenderID,
    TypemID: user.TypemID,
    EvidenceID: user.EvidenceID,
    UserID: user.UserID
  });
  const [Bdate, setBdate] = React.useState<Date | null>(null);
  const [Bndate, setBndate] = React.useState<Date | null>(null);

  const [gender, setGender] = React.useState<GenderInterface[]>([]);

  const [typem, setTypem] = React.useState<TypemInterface[]>([]);

  const [evidence, setEvidencet] = React.useState<EvidenceInterface[]>([]);

  const [success, setSuccess] = React.useState(false);

  const [error, setError] = React.useState(false);

  const [message, setAlertMessage] = React.useState("");

  const [ar, setAlet] = React.useState(false);

  const [getUserID, setUserID] = React.useState();

  //-------------------------------------------------------------------------//
  async function DeleteMember() {
    localStorage.clear();
    window.location.href = "/";
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user.ID),
    };

    let res = await fetch(`${apiUrl}/members/${JSON.stringify(user.ID)}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // DeleteUser();
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });

    return res;
  }

  // async function DeleteUser() {
  //   console.log(getUserID)
  //   const apiUrl = "http://localhost:8080";
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(getUserID),
  //   };

  //   let res = await fetch(`${apiUrl}/users/${getUserID}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         return { status: true, message: res.data };
  //       } else {
  //         return { status: false, message: res.error };
  //       }
  //     });

  //   return res;
  // }


  async function setAl() {
    setAlet(true)
  };

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

  const getEvidence = async () => {
    let res = await GetEvidence();
    if (res) {
      setEvidencet(res);
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
    setUserID(JSON.parse(localStorage.getItem("uid") || ""));
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("lid") || ""));
    }
    getMember();
    getGender();
    getTypem();
    getEvidence();
  }, []);

  console.log(member);


  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof user;
    const { value } = event.target;
    setUser({ ...user, [id]: value === "" ? "" : Number(value) });
  };


  // combobox
  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof user;
    setUser({
      ...user,
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
    setAlet(false);
    setError(false);

  };


  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {

    const id = event.target.id as keyof typeof MemberEdit;

    const { value } = event.target;

    setUser({ ...user, [id]: value });

  };

  async function submit() {
    let data = {
      ID: user.ID,
      Name: user.Name ?? "",
      Email: user.Email ?? "",
      Password: user.Password ?? "",
      Age: user.Age ?? 0,

      GenderID: typeof user.GenderID === "string" ? parseInt(user.GenderID) : user.GenderID,

      TypemID: typeof user.TypemID === "string" ? parseInt(user.TypemID) : user.TypemID,

      EvidenceID: typeof user.EvidenceID === "string" ? parseInt(user.EvidenceID) : user.EvidenceID,

      Bdate: user.Bdate,
      UserID: user.UserID,



    };
    console.log(data)
    let res = await UpdateMember(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);

      window.location.href = "/member_show";
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }

  return (

    <div>

      {/* <NavbarMember /> */}

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

        <Snackbar id="error" open={error} autoHideDuration={6000} onClose={handleClose}>

          <Alert onClose={handleClose} severity="error">

            {message}

          </Alert>

        </Snackbar>


        <ThemeProvider theme={theme}>
          <Snackbar open={ar} autoHideDuration={8000} onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>

            <Alert onClose={handleClose} severity="warning" >

              คุณต้องการยกเลิกการเป็นสมาชิก

              <Stack direction="column" spacing={4}>
                <Button onClick={DeleteMember} variant="outlined" >
                  <CheckIcon color="secondary" />
                </Button>
              </Stack>
            </Alert>

          </Snackbar>

        </ThemeProvider>


        <Paper sx={{ bgcolor: "#fffde7" }} >
          <ThemeProvider theme={theme}>
            <Typography sx={{ marginLeft: 40, padding: 1, marginTop: 0, }}
              component="h2" variant="h4" color="primary"
              fontFamily= 'Prompt'
              gutterBottom
            >
              ข้อมูลสมาชิก
            </Typography>
          </ThemeProvider>
          <Divider />



          <Grid item xs={6} sx={{ padding: 2, marginTop: 0, }} >
            <p>ชื่อ-นามสกุล</p>

            <FormControl fullWidth variant="outlined" >

              <TextField

                id="Name"

                variant="outlined"

                type="string"

                size="medium"

                value={user?.Name || ""}

                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>


          {/* อีเมล */}
          <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }} item xs={12}>
          <Grid item xs={6} sx={{ padding: 2 }}>

            <p>Email</p>

            <FormControl fullWidth variant="outlined">

              <TextField


                id="Email"

                variant="outlined"

                type="string"

                size="medium"

                value={user?.Email}


                onChange={handleInputChange}

              />

            </FormControl>

          </Grid>


          {/* password */}
          <Grid item xs={6} sx={{ padding: 2 }}>

            <p>Password</p>

            <FormControl fullWidth variant="outlined">

              <TextField

                id="Password"

                variant="outlined"

                type="string"

                size="medium"

                value={user?.Password || ""}

                onChange={handleInputChange}

              />

            </FormControl>

          </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }}>
            {/* birth */}
            <Grid item xs={6} >

              <FormControl fullWidth variant="outlined">

                <p>วันเกิด</p>

                <LocalizationProvider dateAdapter={AdapterDateFns}>

                  <DatePicker

                    value={user.Bdate}

                    // onChange={setBdate}
                    onChange={(newValue) => {
                      setUser({
                        ...user,
                        Bdate: newValue,
                      });
                    }}


                    renderInput={(params) => <TextField {...params} />}

                  />

                </LocalizationProvider>

              </FormControl>

            </Grid>
          </Grid>


          <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }} >
            {/* เพศ */}
            <Grid item xs={6}>
              <p>เพศ</p>

              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={user?.GenderID}
                  onChange={handleChange}
                  inputProps={{
                    name: "GenderID",
                  }}

                >
                  <option aria-label="None" value="">
                    ระบุเพศ
                  </option>
                  {gender.map((item: GenderInterface) => (
                    <option value={item.ID}>{item.Gtype}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth variant="outlined">
                <p>อายุ</p>
                <TextField
                  id="Age"
                  variant="outlined"
                  type="number"
                  size="medium"
                  InputProps={{ name: "Min" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={user?.Age}
                  onChange={handleInputChangenumber}
                />
              </FormControl>
            </Grid>
          </Grid>






          <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }}>
            {/* ประเภทสมาชิก */}
            <Grid item xs={6}>
              <p>ประเภทสมาชิก</p>

              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={user?.TypemID}
                  onChange={handleChange}
                  inputProps={{
                    name: "TypemID",
                  }}

                >
                  <option aria-label="None" value="">
                    กรุณาเลือกประเภทของสมาชิก
                  </option>
                  {typem.map((item: TypemInterface) => (
                    <option value={item.ID}>{item.Ttype}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>




            <Grid item xs={6}>
              <p>หลักฐานที่ยืนตัวตน</p>

              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={user?.EvidenceID}
                  onChange={handleChange}
                  inputProps={{
                    name: "EvidenceID",
                  }}

                >
                  <option aria-label="None" value="">
                    กรุณาเลือกประเภทหลักฐานที่ยื่น
                  </option>
                  {evidence.map((item: EvidenceInterface) => (
                    <option value={item.ID}>{item.Etype}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12}>

              <ThemeProvider theme={theme}>
                <Button component={RouterLink} to="/member_show" variant="contained" color="primary"
                >
                  <Typography color="secondary" fontFamily= 'Prompt'>

                    ย้อนกลับ

                  </Typography>
                </Button>
              </ThemeProvider>



              <ThemeProvider theme={theme}>
                <Stack direction="row-reverse" spacing={2} sx={{ marginTop: -5 }}>
                  <Button

                    style={{ float: "right" }}

                    onClick={submit}

                    variant="contained"

                    color="primary"

                  >
                    <Typography color="secondary" fontFamily= 'Prompt'>

                      ยืนยันการแก้ไข

                    </Typography>
                  </Button>



                  <Button endIcon={<DeleteIcon color="secondary" />} variant="contained" color="primary" onClick={setAl} style={{ float: "right" }}>
                    <Typography color="secondary" fontFamily= 'Prompt'>
                      ยกเลิกการเป็นสมาชิก
                    </Typography>
                  </Button>
                </Stack>
              </ThemeProvider>

            </Grid>

          </Grid>

        </Paper>

      </Container>

    </div>

  );

}


export default MemberEdit;


