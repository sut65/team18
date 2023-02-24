import { SelectChangeEvent, Container, CssBaseline, Stack, Typography, Grid, FormControl, TextField, Select, Button, AlertProps, Snackbar, Paper, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { setDate } from 'date-fns';
import MuiAlert from "@mui/material/Alert";
import { ServiceInterface } from '../../models/IService';
import { BookInfoInterface } from '../../models/IBookInfo';
import { PlaceInterface } from '../../models/IPlace';
import { TimeperiodInterface } from '../../models/ITimeperiod';
import { CreateBookInfo, GetPlace, GetService, GetTimeperiod } from '../../services/BookInfoHttpClientService';
import { MemberInterface } from '../../models/IMember';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
function BookInfoCreate() {
    const [bookinfo, setBookInfo] = useState<
    Partial<BookInfoInterface>>({ BDate: new Date()});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");
    const [mm, setMem] = React.useState<Partial<MemberInterface>>({ Name: "" });
    
    const [service, setService] = useState<ServiceInterface[]>([]);
    const [place, setPlace] = useState<PlaceInterface[]>([]);
    const [timeperiod, setTimeperiod] = useState<TimeperiodInterface[]>([]);

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
    const getPlace = async () => {
        let res = await GetPlace();
        if (res) {
            setPlace(res);
        }
    };
    const getTimeperiod = async () => {
        let res = await GetTimeperiod();
        if (res) {
            setTimeperiod(res);
        }
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof bookinfo;
        setBookInfo({
          ...bookinfo,
          [name]: event.target.value,
        });
      };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof bookinfo;
        console.log(name)
        setBookInfo({
            ...bookinfo,
            [name]: event.target.value,
        });
    };

    useEffect(() => {
        setMem(JSON.parse(localStorage.getItem("lid") || ""));
        getService();
        getPlace();
        getTimeperiod();
    }, []);


    async function submit() {
        let data = {
            BDate: bookinfo?.BDate ?? new Date(),
            ServiceID: convertType(bookinfo?.ServiceID) ?? 0,
            MemberID: mm.ID,
            PlaceID: convertType(bookinfo?.PlaceID) ?? 0,
            TimeperiodID: convertType(bookinfo?.TimeperiodID) ?? 0,
            Tel: bookinfo.Tel ,
        };
        console.log(data)
        let res = await CreateBookInfo(data);
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
                            บันทึกข้อมูลการจองสถานกีฬา
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
                                value={bookinfo.ServiceID+""}
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
                            <p>จุดบริการ :</p>
                            <Select
                                className='StyledTextField'
                                native
                                name="PlaceID"
                                size="medium"
                                value={bookinfo.PlaceID+""}
                                onChange={handleChange}
                                inputProps={{
                                name: "PlaceID",
                                }}
                            ><option aria-label="None" value="">กรุณาเลือกจุดบริการ</option>
                                {place.map((item: PlaceInterface) => (
                                <option value={Number(item.ID)} key={item.ID}>
                                    {item.Locate}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>เบอร์โทรติดต่อ : </p>
                            <TextField
                            className='StyledTextField'
                            id="Tel"
                            variant="outlined"
                            size="medium"
                            value={bookinfo?.Tel || ""}
                            onChange = {handleInputChange}
                            inputProps={{
                                name: "Tel"
                            }}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>ระยะเวลาการจอง :</p>
                            <Select
                                className='StyledTextField'
                                native
                                name="TimePeriodID"
                                size="medium"
                                value={bookinfo.TimeperiodID+""}
                                onChange={handleChange}
                                inputProps={{
                                name: "TimeperiodID",
                                }}
                            ><option aria-label="None" value="">กรุณาเลือกระยะเวลาการจอง</option>
                                {timeperiod.map((item: TimeperiodInterface) => (
                                <option value={Number(item.ID)} key={item.ID}>
                                    {item.Period}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                        <Typography> วัน/เวลา ที่ทำการจอง : </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                            
                                value={bookinfo.BDate}
                                onChange={(newValue) => {
                                    setBookInfo({
                                        ...bookinfo,
                                        BDate: newValue,
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
                        to="/place_booking"
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

export default BookInfoCreate