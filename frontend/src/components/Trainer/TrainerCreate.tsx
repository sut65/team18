import { SelectChangeEvent, Container, CssBaseline, Stack, Typography, Grid, FormControl, TextField, Select, Button, AlertProps, Snackbar, Paper, Divider, Box } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { ExerciseProgramInterface } from '../../models/ExerciseProgram/IExerciseProgram';
import { CreateExerciseProgram, GetExercise, GetExPListByD, GetExPListByID, GetStretch, GetWormUp, ListExPList } from '../../services/ExerciseprogramHttpClientService';
import { TrainerBookingInterface } from '../../models/Trainer/ITrainerBooking';
import { MemberInterface } from '../../models/IMember';
import { EmployeeInterface } from '../../models/IEmployee';
import { GetEmployee, GetMember } from '../../services/HttpClientService';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import tr from 'date-fns/esm/locale/tr/index.js';
import { CreateTrainerBookingList } from '../../services/TrainerHttpClientService';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
function TrainerCreate() {
    const [trainer, setTrainer] = useState<Partial<TrainerBookingInterface>>({
        MemberID: 0,
        EmployeeID: 0,
    ExerciseProgramListID:0,    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");
    const [member, setMember] = React.useState<MemberInterface>();
    const [mem, setMem] = React.useState<Partial<MemberInterface>>({Name:""});
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    const [exprogram, setExProgram] = React.useState<ExerciseProgramInterface>({});
    const [expro, setExPro] = React.useState<ExerciseProgramInterface[]>([]);

    const getMember = async () => {
        let res = await GetMember();
        if (res) {
          setMember(res);
        }
    };
    
    const getEmployee = async () => {
        let res = await GetEmployee();
        if (res) {
          setEmployee(res);
        }
    };
    const getExPro = async () => {
        let res = await ListExPList();
        if (res.data) {
          setExPro(res.data);
        }
    };
    

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    const onChange = async (event: SelectChangeEvent) => {
        const id = event.target.value
        let res = await GetExPListByD(id);
        if (res) {
            setExProgram(res);
            console.log(res)
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event,reason?: string) => {
      if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof trainer;
        setTrainer({
          ...trainer,
          [name]: event.target.value,
        });
      };

    const handleChange = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof trainer;
        console.log(name)
        setTrainer({
            ...trainer,
            [name]: event.target.value,
        });
    };
    const [trtime, setTrTime] = React.useState<Date | null>(
        new Date()
    );

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setMem(JSON.parse(localStorage.getItem("lid") || ""));
        }
        getMember();
        getEmployee();
        getExPro();
        
        
      }, []);


      async function submit() {
        let data = {
            MemberID: mem?.ID ,
            EmployeeID: convertType(exprogram?.EmployeeID) ?? 0,
            ExerciseProgramListID: convertType(exprogram.ID) ?? 0,
            Training_Time: trtime,
            
      };
      let res = await CreateTrainerBookingList(data);
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
             <Snackbar
                id="success"
                open={success}
                autoHideDuration={8000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                id="error"
                open={error}
                autoHideDuration={8000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
            
            <Container
                component="main"
                maxWidth="md"
                sx={{
                    marginTop: 2,
                    
                }}>
                <CssBaseline />
                <Paper
                    className="paper"
                    elevation={6}
                    sx={{
                    padding: 2,
                    borderRadius: 3,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            color="secondary"
                            sx={{ padding: 2, fontWeight: "bold" }}
                        >
                            จองเทรนเนอร์
                        </Typography>
                    </Box>
                    <Divider />
                
                <Grid container spacing={2} sx={{ padding: 1 }}>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography>ชื่อผู้จอง</Typography>
                        <FormControl variant="outlined"  >
                            <TextField

                                disabled

                                id="MemberID"

                                color="secondary" variant="outlined"

                                type="string"

                                size="medium"

                                value={mem?.Name}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography>เทรนเนอร์</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                disabled
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={exprogram.EmployeeID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "EmployeeID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----Trainer----
                                </option>
                                {employee.map((item: EmployeeInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography>โปรแกรมออกกำลังกาย</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={exprogram.ID + ""}
                                onChange={onChange}
                                inputProps={{
                                    name: "ID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----Exercise Program----
                                </option>
                                {expro.map((item: ExerciseProgramInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.ProgramName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">

                                <p>วันที่นัดเทรน</p>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DateTimePicker

                                        value={trtime}

                                        onChange={(newValue) => {
                                            setTrTime(newValue);
                                          
                                        }}

                                        renderInput={(params) => <TextField {...params} />}

                                    />

                                </LocalizationProvider>

                            </FormControl>
                    </Grid>
                    
          <Grid item xs={4}></Grid>
          
          </Grid>
          <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mt: 3 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/trainer"
                        sx={{'&:hover': {color: '#1543EE', backgroundColor: '#e3f2fd'}}}
                    >
                        ถอยกลับ
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{'&:hover': {color: '#1543EE', backgroundColor: '#e3f2fd'}}}
                    >
                        บันทึกข้อมูล
                    </Button>

            </Stack>
            </Paper></Container>
        </div>
    )
}

export default TrainerCreate