import { SelectChangeEvent, Container, CssBaseline, Stack, Typography, Grid, FormControl, TextField, Select, Button, AlertProps, Snackbar, Paper, Divider, Box, Card } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { ExerciseProgramInterface } from '../../models/ExerciseProgram/IExerciseProgram';
import { WormUpInterface } from '../../models/ExerciseProgram/IWormup';
import { ExerciseInterface } from '../../models/ExerciseProgram/IExercise';
import { StretchInterface } from '../../models/ExerciseProgram/IStretch';
import { CreateExerciseProgram, GetExercise, GetStretch, GetWormUp } from '../../services/ExerciseprogramHttpClientService';
import { EmployeeInterface } from '../../models/IEmployee';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
function ProgramCreate() {
    const [exprogram, setExProgram] = useState<Partial<ExerciseProgramInterface>>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");
    const [emp, setEmp] = React.useState<EmployeeInterface>();
    const [meswo, setAMeswo] = useState("");
    
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

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleClose = (event?: React.SyntheticEvent | Event,reason?: string) => {
      if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof exprogram;
        setExProgram({
          ...exprogram,
          [name]: event.target.value,
        });
      };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof exprogram;
        const value = event.target.value
        console.log(name)
        setExProgram({
            ...exprogram,
            [name]: event.target.value,
        });
        setAMeswo(value)
        console.log(`[${name}]: ${value}`)
    };
    const handleWChange = (
        event: SelectChangeEvent<number>
    ) => {
        const name = event.target.name as keyof typeof wormup;
        const value = event.target.value
        setWormup({
            ...wormup,
            [name]: value,
        });}
    useEffect(() => {
        setEmp(JSON.parse(localStorage.getItem("lid") || ""));
        getWormUp();
        getExercise();
        getStretch();
      }, []);
      async function submit() {
        let data = {
          ProgramName: exprogram?.ProgramName ?? "",
            EmployeeID: emp?.ID,
            WormUpID: convertType(exprogram?.WormUpID) ?? 0,
            ExerciseID: convertType(exprogram?.ExerciseID) ?? 0,
            StretchID: convertType(exprogram?.StretchID) ?? 0,
            Minute: convertType(exprogram?.Minute) ?? 0,
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
                            color="primary"
                            sx={{ padding: 2, fontWeight: "bold", marginTop: 1 }}
                        >
                            สร้างโปรแกรมออกกำลังกาย
                        </Typography>
                    </Box>
                    <Divider />
                
                <Grid container spacing={1} sx={{ padding: 1 }}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6} sx={{ padding: 1, marginTop: 0, }} >
                        <Typography className='StyledTypography'> ชื่อเทรนเนอร์ </Typography>
                        <FormControl fullWidth variant="outlined" >

                            <TextField

                                disabled

                                id="EmployeeID"

                                color="secondary" variant="outlined"

                                type="string"

                                size="small"

                                value={emp?.Name}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={2.5}></Grid>
                <Grid item={true} xs={7}>
                        <Typography className='StyledTypography'> ชื่อโปรแกรม </Typography>
                        <TextField className='StyledTextField'
                            autoComplete='off'
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleInputChange}
                            inputProps={{
                                name: "ProgramName",
                            }}
                        />
                    </Grid>
                <Grid container spacing={{ xs: 12, md: 5 }}>
                    <Grid item xs={4} sx={{ mt: 3 }}>
                        <Typography>เซ็ตวอร์มอัพ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 200}}
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
                    <Grid item xs={4} sx={{ mt: 3 }}>
                        <Typography>เซ็ตออกกำลังกาย</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 200}}
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
                    <Grid item xs={4} sx={{ mt: 3 }}>
                        <Typography>เซ็ตยืดกล้ามเนื้อ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 200}}
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
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <p>เวลาที่ใช้(นาที) </p>
                            <TextField
                            className='StyledTextField'
                            id="Minute"
                            variant="outlined"
                            type="number"
                            size="small"
                            value={exprogram.Minute}
                            
                            InputProps={{
                                inputProps: { min: 1, max: 99999 },
                                name: "Minute",
                              }}
                              onChange={handleInputChange}
                            />
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
                        to="/program"
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

export default ProgramCreate