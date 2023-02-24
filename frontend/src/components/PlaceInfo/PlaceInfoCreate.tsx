import { SelectChangeEvent, Container, CssBaseline, Stack, Typography, Grid, FormControl, TextField, Select, Button, AlertProps, Snackbar, Paper, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { setDate } from 'date-fns';
import MuiAlert from "@mui/material/Alert";
import { PlaceinfoInterface } from '../../models/IPlaceInfo';
import { EmployeeInterface } from '../../models/IEmployee';
import { ServiceInterface } from '../../models/IService';
import { OcdInterface } from '../../models/IOcd';
import { OctInterface } from '../../models/IOct';
import { GetService, GetOpenandClosedays, GetOpenandClosetime, CreatePlaceInfo } from '../../services/PlaceInfoHttpClientService'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
function PlaceInfoCreate() {
    const [placeinfo, setPlaceInfo] = useState<
    Partial<PlaceinfoInterface>>({ PDate: new Date()});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");
    
    const [service, setService] = useState<ServiceInterface[]>([]);
    const [ocd, setOpenandCloseday] = useState<OcdInterface[]>([]);
    const [oct, setOpenandClosetime] = useState<OctInterface[]>([]);

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    const getService = async () => {
        let res = await GetService();
        if (res) {
            setService(res);
        }
    };
    const getOpenandClosedays = async () => {
        let res = await GetOpenandClosedays();
        if (res) {
            setOpenandCloseday(res);
        }
    };
    const getOpenandClosetime = async () => {
        let res = await GetOpenandClosetime();
        if (res) {
            setOpenandClosetime(res);
        }
    };
    
    //   const getEmployee = async () => {
    //     try {
    //       let res = await HttpClientServices.get("/employees");
    //       setEmployee(res.data);
    //       console.log(res.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof placeinfo;
        setPlaceInfo({
          ...placeinfo,
          [name]: event.target.value,
        });
      };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof placeinfo;
        console.log(name)
        setPlaceInfo({
            ...placeinfo,
            [name]: event.target.value,
        });
    };

    useEffect(() => {
        getService();
        getOpenandClosedays();
        getOpenandClosetime();
    }, []);


    async function submit() {
        let data = {
            PDate: placeinfo?.PDate ?? new Date(),
            Hours: convertType(placeinfo?.Hours) ?? 0,
            Detail: placeinfo?.Detail ?? "",
            ServiceID: convertType(placeinfo?.ServiceID) ?? 0,
            EmployeeID: convertType(placeinfo?.EmployeeID) ?? 1,
            OcdID: convertType(placeinfo?.OcdID) ?? 0,
            OctID: convertType(placeinfo?.OctID) ?? 0,
        };
        console.log(data)
        let res = await CreatePlaceInfo(data);
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
        // try {
        //     let res = await HttpClientServices.post("/disinfection", data);
        //     setSuccess(true);
        //     console.log(res.data);
        // } catch (err) {
        //     setError(false);
        //     console.log(JSON.stringify(err));
        // }
        // let res = await CreatDisinfection(data);
        //     if (res) {
        //         setSuccess(true);
        //     } else {
        //         setError(true);
        //     }
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
                            บันทึกข้อมูลสถานกีฬา
                        </Typography>
                    </Box>
                    <Divider />
                
                <Grid container spacing={2} sx={{ padding: 1 }}>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>สถานที่บริการ :</p>
                            <Select
                                className='StyledTextField'
                                native
                                name="ServiceID"
                                size="medium"
                                value={placeinfo.ServiceID+""}
                                onChange={handleChange}
                                inputProps={{
                                name: "ServiceID",
                                }}
                            ><option aria-label="None" value="">กรุณาเลือกประเภทสถานบริการ</option>
                                {service.map((item: ServiceInterface) => (
                                <option value={item.ID!} key={item.ID}>
                                    {item.TypeP}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>วันทำการ :</p>
                            <Select
                                className='StyledTextField'
                                native
                                name="OcdID"
                                size="medium"
                                value={placeinfo.OcdID+""}
                                onChange={handleChange}
                                inputProps={{
                                name: "OcdID",
                                }}
                            ><option aria-label="None" value="">กรุณาเลือกวันทำการ</option>
                                {ocd.map((item: OcdInterface) => (
                                <option value={Number(item.ID)} key={item.ID}>
                                    {item.Days}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>ระยะเวลาทำการ :</p>
                            <Select
                                className='StyledTextField'
                                native
                                name="OctID"
                                size="medium"
                                value={placeinfo.OctID+""}
                                onChange={handleChange}
                                inputProps={{
                                name: "OctID",
                                }}
                            ><option aria-label="None" value="">กรุณาเลือกระยะเวลาทำการ</option>
                                {oct.map((item: OctInterface) => (
                                <option value={item.ID!} key={item.ID}>
                                    {item.Times}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    


                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>จำนวนชั่วโมง : </p>
                            <TextField
                            className='StyledTextField'
                            id="Hours"
                            variant="outlined"
                            type="number"
                            size="medium"
                            value={placeinfo.Hours}
                            
                            InputProps={{
                                inputProps: { min: 1, max: 10 },
                                name: "Hours",
                              }}
                              onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>รายละเอียดเพิ่มเติม : </p>
                            <TextField
                            className='StyledTextField'
                            id="Detail"
                            variant="outlined"
                            size="medium"
                            onChange = {handleInputChange}
                            inputProps={{
                                name: "Detail"
                            }}

                            />
                        </FormControl>
                    </Grid>
                

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <Typography> วัน/เวลา ทำการบันทึก : </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                            
                                value={placeinfo.PDate}
                                onChange={(newValue) => {
                                    setPlaceInfo({
                                        ...placeinfo,
                                        PDate: newValue,
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} size="medium" />
                                }
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
                        to="/place"
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

export default PlaceInfoCreate