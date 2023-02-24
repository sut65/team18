import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ServiceInterface } from '../../models/IService';
import { PlaceInterface } from '../../models/IPlace';
import { TimeperiodInterface } from '../../models/ITimeperiod';
import { GetBookInfolist, GetBookInfoListByID, GetPlace, GetService, GetTimeperiod, UpdateBookInfoList } from '../../services/BookInfoHttpClientService';
import { BookInfoInterface } from '../../models/IBookInfo';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookInfoUpdate() {

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
    const [service, setService] = React.useState<ServiceInterface[]>([]);
    const [place, setPlace] = React.useState<PlaceInterface[]>([]);
    const [timeperiod, setTimeperiod] = React.useState<TimeperiodInterface[]>([]);

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
    const [bookinfo, setBookInfo] = React.useState<BookInfoInterface>({
        Tel: "",
        BDate:new Date(),
    
      });
    const getBookInfoListByID = async () => {
        let res = await GetBookInfoListByID();
        if (res) {
            setBookInfo(res);
            console.log(res)
        }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof bookinfo;
        console.log(typeof event.target.valueAsNumber)
        setBookInfo({
            ...bookinfo,
            [name]: event.target.valueAsNumber,
        });
        console.log(bookinfo)

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
            ID: convertType(bookinfo.ID),
            MemberID: convertType(bookinfo.MemberID),
            ServiceID: convertType(bookinfo.ServiceID),
            PlaceID: convertType(bookinfo.PlaceID),
            TimeperiodID: convertType(bookinfo.TimeperiodID),
            Tel: bookinfo.Tel,
            PDate: bookinfo.BDate

        };

        let res = await UpdateBookInfoList(data);
        if (res.data) {
            setAlertMessage("อัพเดตข้อมูลสำเร็จ")
            setSuccess(true);
            setTimeout(() => {
                navigator("/place_booking")
            }, 3000)
        } else {
            setAlertMessage(res.error)
            setError(true);
        }
    }
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof bookinfo;

        setBookInfo({
            ...bookinfo,
            [name]: event.target.value
        })
    }
   

    useEffect(() => {

        getService();
        getPlace();
        getTimeperiod();
        getBookInfoListByID();


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
                        แก้ไขข้อมูล  รายการจองสถานที่  ID {bookinfo?.ID}
                    </Typography>
                </Stack>

                <Grid container spacing={2} sx={{ padding: 1 }}>
                    <Grid item xs={6}>
                        <Typography>สถานที่บริการ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={bookinfo.ServiceID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "ServiceID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----กรุณาเลือกสถานบริการ----
                                </option>
                                {service.map((item: ServiceInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.TypeP}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>จุดบริการ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={bookinfo.PlaceID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PlaceID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----กรุณาเลือกจุดบริการ----
                                </option>
                                {place.map((item: PlaceInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.Locate}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>ช่วงเวลาการจอง</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={bookinfo.TimeperiodID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "TimeperiodID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----กรุณาเลือกช่วงเวลาการจอง----
                                </option>
                                {timeperiod.map((item: TimeperiodInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.Period}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography>เบอร์โทรติดต่อ</Typography>
                        <TextField
                            disabled={disTextField}
                            autoComplete='off'
                            placeholder='ระบุเบอร์โทรติดต่อ'
                            type="text"
                            sx={{ bgcolor: '#fff' }}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                name: "Tel"
                            }}
                            value={bookinfo.Tel}
                            
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
                        to="/place_booking"
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

export default BookInfoUpdate