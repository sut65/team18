import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { WormUpInterface } from '../../models/ExerciseProgram/IWormup';
import { StretchInterface } from '../../models/ExerciseProgram/IStretch';
import { ExerciseInterface } from '../../models/ExerciseProgram/IExercise';
import { GetExercise, GetExPListByID, GetStretch, GetWormUp, UpdateExPList } from '../../services/ExerciseprogramHttpClientService';
import { ExerciseProgramInterface } from '../../models/ExerciseProgram/IExerciseProgram';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProgramUpdate() {

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
    const [wormup, setWormup] = React.useState<WormUpInterface[]>([]);
    const [exercise, setExercise] = React.useState<ExerciseInterface[]>([]);
    const [stretch, setStretch] = React.useState<StretchInterface[]>([]);

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
    const [exprogram, setExProgram] = React.useState<ExerciseProgramInterface>({
        ProgramName:"",
        Minute:1,
    
      });
    const getExPListByID = async () => {
        let res = await GetExPListByID();
        if (res) {
            setExProgram(res);
            console.log(res)
        }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof exprogram;
        console.log(typeof event.target.valueAsNumber)
        setExProgram({
            ...exprogram,
            [name]: event.target.valueAsNumber,
        });
        console.log(exprogram)

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
            ID: convertType(exprogram.ID),
            ProgramName: exprogram.ProgramName,
            EmployeeID: convertType(exprogram.EmployeeID),
            WormUpID: convertType(exprogram.WormUpID),
            ExerciseID: convertType(exprogram.ExerciseID),
            StretchID: convertType(exprogram.StretchID),
            Minute: exprogram.Minute,
        };

        let res = await UpdateExPList(data);
        if (res.data) {
            setAlertMessage("อัพเดตข้อมูลสำเร็จ")
            setSuccess(true);
            setTimeout(() => {
                navigator("/program")
            }, 3000)
        } else {
            setAlertMessage(res.error)
            setError(true);
        }
    }
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof exprogram;

        setExProgram({
            ...exprogram,
            [name]: event.target.value
        })
    }
   

    useEffect(() => {

        getWormUp();
        getExercise();
        getStretch();
        getExPListByID();


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
                        แก้ไขข้อมูล  โปรแกรมออกกำลังกาย  ID {exprogram?.ID}
                    </Typography>
                </Stack>

                <Grid container rowSpacing={2}>
                <Grid item={true} xs={12}>
                        <Typography className='StyledTypography'> ชื่อโปรแกรม </Typography>
                        <TextField
                            name='ProgramName'
                            type="text"
                            value={exprogram.ProgramName || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography>ท่าวอร์มอัพ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={exprogram.WormUpID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "WormUpID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----Worm Up----
                                </option>
                                {wormup.map((item: WormUpInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.SetName}
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
                                value={exprogram.ExerciseID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "ExerciseID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----Exercise----
                                </option>
                                {exercise.map((item: ExerciseInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.SetName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography>ท่ายืดกล้ามเนื้อ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={exprogram.StretchID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "StretchID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----Stretch----
                                </option>
                                {stretch.map((item: StretchInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.SetName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} >
                        <Typography>เวลาที่ใช้</Typography>
                        <TextField
                            disabled={disTextField}
                            autoComplete='off'
                            placeholder='โปรดระบุเวลาที่ใช้'
                            type="number"
                            sx={{ bgcolor: '#fff' }}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            InputProps={{
                                inputProps: { min: 1 },
                                name: "Minute"
                            }}
                            value={exprogram.Minute}
                        />

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
                        to="/program"
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

export default ProgramUpdate