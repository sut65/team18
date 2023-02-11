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
import { GetGender, GetTypem, GetEvidencet, CreateMember, GetWormUp, GetExercise, GetStretch, CreateExerciseProgram, GetEmployee } from "../../services/HttpClientService";
import NavbarMember from "../NavbarMember";
import { WormUpInterface } from "../../models/ExerciseProgram/IWormup";
import { ExerciseInterface } from "../../models/ExerciseProgram/IExercise";
import { StretchInterface } from "../../models/ExerciseProgram/IStretch";
import { ExerciseProgramInterface } from "../../models/ExerciseProgram/IExerciseProgram";
import { EmployeeInterface } from "../../models/IEmployee";




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

    const [program, setProgram] = React.useState<Partial<ExerciseProgramInterface>>({
      WormUpID:0,
      EmployeeID:0,
      StretchID:0,
      Minute:1,
  
    });
  const [wormup, setWormup] = React.useState<WormUpInterface[]>([]);
  const [exercise, setExercise] = React.useState<ExerciseInterface[]>([]);
  const [stretch, setStretch] = React.useState<StretchInterface[]>([]);
  const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);

  const [success, setSuccess] = React.useState(false);

  const [error, setError] = React.useState(false);

  const [message, setAlertMessage] = React.useState("");

  const getWormUp = async () => {
    let res = await GetWormUp();
    if (res) {
      setWormup(res);
    }
  };

  const getExercise = async () => {
    let res = await GetExercise();
    if (res) {
      setExercise(res);
    }
  };

  const getStretch = async () => {
    let res = await GetStretch();
    if (res) {
      setStretch(res);
    }
  };
  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setEmployee(res);
    }
  };

  useEffect(() => {
    getWormUp();
    getExercise();
    getStretch();
    getEmployee();
  }, []);

  console.log(program);


  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof program;
    const { value } = event.target;
    setProgram({ ...program, [id]: value  === "" ? "" : Number(value)  });
  };

  
  // combobox
  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof program;
    setProgram({
      ...program,
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

    setProgram({ ...program, [id]: value });

  };

  async function submit() {
      let data = {
        ProgramName:  program.ProgramName ?? "",
        EmployeeID:typeof program.EmployeeID === "string" ? parseInt(program.EmployeeID) : 0,
        WormUpID:typeof program.WormUpID === "string" ? parseInt(program.WormUpID) : 0,
        ExerciseID:typeof program.ExerciseID === "string" ? parseInt(program.ExerciseID) : 0,
        StretchID:typeof program.StretchID === "string" ? parseInt(program.StretchID) : 0,
        Minute: program.Minute ?? 0
    };
    let res = await CreateExerciseProgram(data);
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
              id="ProgramName"
              variant="outlined"
              type="string"
              size="medium"
              value={program.ProgramName || ""}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8} >
          <p>เลือกรูปแบบวอร์มอัพ</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={program.WormUpID}
              onChange={handleChange}
              inputProps={{
              name: "WormUpID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเซ็ต
              </option>
                {wormup.map((item: WormUpInterface) => (
                  <option value={item.ID}>{item.SetName}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} >
          <p>เลือกรูปแบบออกกำลังกาย</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={program.ExerciseID}
              onChange={handleChange}
              inputProps={{
              name: "ExerciseID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเซ็ต
              </option>
                {exercise.map((item: ExerciseInterface) => (
                  <option value={item.ID}>{item.SetName}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} >
          <p>เลือกรูปแบบยืดกล้ามเนื้อ</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={program.StretchID}
              onChange={handleChange}
              inputProps={{
              name: "StretchID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเซ็ต
              </option>
                {stretch.map((item: StretchInterface) => (
                  <option value={item.ID}>{item.SetName}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} >
                <FormControl fullWidth variant="outlined">
                  <p>กำหนดเวลา</p>
                  <TextField
                    id="Minute"
                    variant="outlined"
                    type="number"
                    size="medium"
                    InputProps={{ name: "MinPrice"}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={program?.Minute}
                    onChange={handleInputChangenumber}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8} >
          <p>เทรนเนอร์ที่สร้างโปรแกรม</p>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={program.EmployeeID}
              onChange={handleChange}
              inputProps={{
              name: "EmployeeID",
              }}
            >
              <option aria-label="None" value="">
                ระบุเทรนเนอร์
              </option>
                {employee.map((item: EmployeeInterface) => (
                  <option value={item.ID}>{item.Name}</option>
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