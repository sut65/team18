import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { GetOpenandClosedays, GetOpenandClosetime, GetService, GetPlaceInfoListByID, UpdatePlaceInfoList } from '../../services/PlaceInfoHttpClientService';
import { ServiceInterface } from '../../models/IService';
import { OcdInterface } from '../../models/IOcd';
import { OctInterface } from '../../models/IOct';
import { PlaceinfoInterface } from '../../models/IPlaceInfo';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PlaceInfoUpdate() {

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
    const [ocd, setOpenandClosedays] = React.useState<OcdInterface[]>([]);
    const [oct, setOpenandClosetime] = React.useState<OctInterface[]>([]);

    const getService = async () => {
        let res = await GetService();
        if (res) {
          setService(res);
        }
    };
    
    const getOpenandClosedays = async () => {
        let res = await GetOpenandClosedays();
        if (res) {
          setOpenandClosedays(res);
        }
    };
    
    const getOpenandClosetime = async () => {
        let res = await GetOpenandClosetime();
        if (res) {
          setOpenandClosetime(res);
        }
    };
    const [placeinfo, setPlaceInfo] = React.useState<PlaceinfoInterface>({
        Detail:"",
        Hours:1,
        PDate:new Date(),
    
      });
    const getPlaceInfoListByID = async () => {
        let res = await GetPlaceInfoListByID();
        if (res) {
            setPlaceInfo(res);
            console.log(res)
        }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof placeinfo;
        console.log(typeof event.target.valueAsNumber)
        setPlaceInfo({
            ...placeinfo,
            [name]: event.target.valueAsNumber,
        });
        console.log(placeinfo)

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
            ID: convertType(placeinfo.ID),
            EmployeeID: convertType(placeinfo.EmployeeID),
            ServiceID: convertType(placeinfo.ServiceID),
            OcdID: convertType(placeinfo.OcdID),
            OctID: convertType(placeinfo.OctID),
            Hours: placeinfo.Hours,
            Detail: placeinfo.Detail,
            PDate: placeinfo.PDate

        };

        let res = await UpdatePlaceInfoList(data);
        console.log(res)
        if (res.data) {
            setAlertMessage("อัพเดตข้อมูลสำเร็จ")
            setSuccess(true);
            setTimeout(() => {
                navigator("/place")
            }, 3000)
        } else {
            setAlertMessage(res.error)
            setError(true);
        }
    }
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof placeinfo;

        setPlaceInfo({
            ...placeinfo,
            [name]: event.target.value
        })
        console.log(placeinfo);
    }
   

    useEffect(() => {

        getService();
        getOpenandClosedays();
        getOpenandClosetime();
        getPlaceInfoListByID();


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
                        แก้ไขข้อมูล  รายการสถานที่  ID {placeinfo?.ID}
                    </Typography>
                </Stack>

                <Grid container spacing={2} sx={{ padding: 1 }}>
                    <Grid item xs={6}>
                        <Typography>สถานที่บริการ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={placeinfo.ServiceID + ""}
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
                        <Typography>วันทำการ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={placeinfo.OcdID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "OcdID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----กรุณาเลือกวันทำการ----
                                </option>
                                {ocd.map((item: OcdInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.Days}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>ระยะเวลาทำการ</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={placeinfo.OctID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "OctID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    ----กรุณาเลือกระยะเวลาทำการ----
                                </option>
                                {oct.map((item: OctInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        {item.Times}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>จำนวนชั่วโมง</Typography>
                        <TextField
                            disabled={disTextField}
                            autoComplete='off'
                            placeholder='โปรดระบุจำนวนชั่วโมง'
                            type="number"
                            sx={{ bgcolor: '#fff' }}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            InputProps={{
                                inputProps: { min: 1 },
                                name: "Hours"
                            }}
                            value={placeinfo.Hours}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <Typography>รายละเอียดเพิ่มเติม</Typography>
                        <TextField
                            disabled={disTextField}
                            autoComplete='off'
                            placeholder='ระบุรายละเอียดเพิ่มเติม'
                            type="text"
                            sx={{ bgcolor: '#fff' }}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                name: "Detail"
                            }}
                            value={placeinfo.Detail}
                            
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
                        to="/place"
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

export default PlaceInfoUpdate