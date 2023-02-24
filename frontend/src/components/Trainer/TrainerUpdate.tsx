import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { WormUpInterface } from '../../models/ExerciseProgram/IWormup';
import { StretchInterface } from '../../models/ExerciseProgram/IStretch';
import { ExerciseInterface } from '../../models/ExerciseProgram/IExercise';
import { GetExercise, GetExPListByD, GetExPListByID, GetStretch, GetWormUp, ListExPList, UpdateExPList } from '../../services/ExerciseprogramHttpClientService';
import { ExerciseProgramInterface } from '../../models/ExerciseProgram/IExerciseProgram';
import { TrainerBookingInterface } from '../../models/Trainer/ITrainerBooking';
import { MemberInterface } from '../../models/IMember';
import { GetMember } from '../../services/NotifyHttpCS';
import { GetEmployee } from '../../services/HttpClientService';
import { EmployeeInterface } from '../../models/IEmployee';
import { GetTrBListByID, UpdateTrBList } from '../../services/TrainerHttpClientService';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TrainerUpdate() {

    const [alertmessage, setAlertMessage] = React.useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };
    const [trainer, setTrainer] = useState<Partial<TrainerBookingInterface>>({
        Training_Time: new Date(),
    });
    const [tr, setTr] = useState<Partial<TrainerBookingInterface>>({
        Training_Time: new Date(),
    });
    const [exprogram, setExProgram] = React.useState<ExerciseProgramInterface>({});
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    const [member, setMember] = React.useState<MemberInterface>();
    const [mem, setMem] = React.useState<Partial<MemberInterface>>({Name:""});
    const [trtime, setTrTime] = React.useState<Date | null>(
        new Date()
    );
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
    
    const getExPListByID = async () => {
        let res = await GetExPListByID();
        if (res.data) {
            setExProgram(res.data);
            console.log(res)
        }
    };
    const getTrListByID = async () => {
        const id = localStorage.getItem("tr_id")
        let res = await GetTrBListByID(id);
        if (res) {
            setTrainer(res);
            setTr(res);
            
        }
        console.log(res)
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof trainer;
        console.log(typeof event.target.valueAsNumber)
        setTrainer({
            ...trainer,
            [name]: event.target.valueAsNumber,
        });
        console.log(trainer)

    };
    const onChange = async (event: SelectChangeEvent) => {
        const id = event.target.value
        let res = await GetExPListByD(id);
        if (res) {
            
            setTrainer(res);
            console.log(res)
        }
    };


    const [disTextField, setDisTextField] = useState(false);
    const [snackBar, setSnackBar] = React.useState({
        open: false,
        error: false,
        errorMsg: ""
    })
    const handleSnackBarOpen = () => {
        setSnackBar({
            ...snackBar,
            open: true
        })
    }
    const handleSnackBarError = (res : any) => {
        setSnackBar({
            ...snackBar,
            error: true,
            errorMsg: res
        })
    }
    const handleSnackBarClose = () => {
        setSnackBar({
            ...snackBar,
            open: false,
            error: false,
        })
    }

    const navigator = useNavigate();
    async function submit() {
        let data = {
            ID: tr.ID,
            MemberID: mem?.ID ,
            EmployeeID: convertType(trainer?.EmployeeID) ?? 0,
            ExerciseProgramListID: convertType(trainer.ID) ?? 0,
            Training_Time: trtime,
        };
        console.log(data)

        let res = await UpdateTrBList(data);
        if (res.data) {
            setAlertMessage("อัพเดตข้อมูลสำเร็จ")
            setSuccess(true);
            setTimeout(() => {
                navigator("/trainer")
            }, 3000)
        } else {
            setAlertMessage(res.error)
            setError(true);
        }
    }
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof trainer;

        setTrainer({
            ...trainer,
            [name]: event.target.value
        })
    }
   

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setMem(JSON.parse(localStorage.getItem("lid") || ""));
        }

        getEmployee();
        getMember();
        getExPro();
        getExPListByID();
        getTrListByID();


    }, []);


    return (
        <div>
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    {alertmessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={error}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    {alertmessage}
                </Alert>
            </Snackbar>

            <Container
                component="main"
                maxWidth="sm"
                sx={{
                    mt: 5,
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    bgcolor: '#F1F6F5',
                    borderRadius: 3
                }}
            >
                <CssBaseline />
                <Stack
                    sx={{ p: 0, m: 0, mb: 3 }}
                >
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                        
                    >
                        แก้ไขข้อมูล  การจองเทรนเนอร์  ID {tr?.ID}
                    </Typography>
                </Stack>

                <Grid container rowSpacing={2}>
                    
                    <Grid item xs={12} sx={{ mt: 3 }}>
                    <Typography>ชื่อผู้จอง</Typography>
                        <FormControl variant="outlined"  >
                            <TextField

                                disabled

                                id="MemberID"

                                color="secondary" variant="outlined"

                                type="string"

                                size="medium"
                                onChange={handleChange}

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
                                value={trainer.EmployeeID}
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
                        <Typography>ท่าออกกำลังกาย</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={trainer.ID + ""}
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
                        color="error"
                        component={RouterLink}
                        to="/trainer"
                        sx={{ borderRadius: 10, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                    >
                        ถอยกลับ
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{ borderRadius: 10, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' } }}
                    >
                        อัพเดตข้อมูล
                    </Button>

                </Stack>

            </Container>
        </div>
    )
}

export default TrainerUpdate