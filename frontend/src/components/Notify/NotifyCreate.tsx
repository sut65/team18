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

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { InputAdornment, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { GenderInterface } from "../../models/IGender";
import { MemberInterface } from "../../models/IMember";
import { TypemInterface } from "../../models/ITypem";
import { EvidenceInterface } from "../../models/IEvidencet";
import { GetGender, GetTypem, CreateMember, GetEvidence, GetMember } from "../../services/HttpClientService";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NotifyInterface } from "../../models/INotify";
import { EquipmentNameInterface } from "../../models/EquipmentList/IEquipmentName";
import { RunNumberInterface } from "../../models/EquipmentList/IRunNumber";
import { CreateNotify, GetEquipmentname, GetRunnumber } from "../../services/NotifyHttpCS";




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


function NotifyCreate() {

    const [notify, setNotify] = React.useState<Partial<NotifyInterface>>({
        EquipmentNameID: 0,
        RunNumberID: 0,
        MemberID: 0,

    });
    const [Ddate, setDdate] = React.useState<Date | null>(new Date());

    const [member, setMember] = React.useState<MemberInterface>();

    const [eqm, setEquipment] = React.useState<EquipmentNameInterface[]>([]);

    const [runn, setRunn] = React.useState<RunNumberInterface[]>([]);

    const [success, setSuccess] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [message, setAlertMessage] = React.useState("");

    const [mm, setMem] = React.useState<Partial<MemberInterface>>({ Name: "" });

    const getMember = async () => {
        let res = await GetMember();
        if (res) {
            setMember(res);
        }
    };

    const getRunnumber = async () => {
        let res = await GetRunnumber();
        if (res) {
            setRunn(res);
        }
    };

    const getEquipmentname = async () => {
        let res = await GetEquipmentname();
        if (res) {
            setEquipment(res);
        }
    };

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setMem(JSON.parse(localStorage.getItem("lid") || ""));
        }
        getMember();
        getRunnumber();
        getEquipmentname();
    }, []);

    console.log(notify);


    // const handleInputChangenumber = (
    //     event: React.ChangeEvent<{ id?: string; value: any }>
    // ) => {
    //     const id = event.target.id as keyof typeof notify;
    //     const { value } = event.target;
    //     setNotify({ ...notify, [id]: value === "" ? "" : Number(value) });
    // };


    // combobox
    const handleChange = (
        event: SelectChangeEvent<number>
    ) => {
        const name = event.target.name as keyof typeof notify;
        setNotify({
            ...notify,
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

        const id = event.target.id as keyof typeof NotifyCreate;

        const { value } = event.target;

        setNotify({ ...notify, [id]: value });

    };

    async function submit() {
        let data = {

            Problem: notify.Problem ?? "",


            MemberID: mm?.ID,

            RunNumberID: typeof notify.RunNumberID === "string" ? parseInt(notify.RunNumberID) : 0,

            EquipmentNameID: typeof notify.EquipmentNameID === "string" ? parseInt(notify.EquipmentNameID) : 0,

            Ddate: Ddate,

        };
        console.log("submit")
        console.log(data)
        let res = await CreateNotify(data);
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

            <Container maxWidth="md" style={{ marginTop: 0 }}>

                <Snackbar id="success" open={success} autoHideDuration={6000} onClose={handleClose}

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



                <Paper sx={{ bgcolor: "#fffde7" }}>
                    <ThemeProvider theme={theme}>
                        <Typography sx={{ marginLeft: 0, padding: 1, marginTop: 0, }}

                            component="h2"

                            variant="h4"

                            color="primary"
                            fontFamily= 'Prompt'

                            gutterBottom

                        >

                            แจ้งอุปกรณ์ชำรุด

                        </Typography>
                    </ThemeProvider>

                    <Box

                        display="flex"

                        sx={{

                            marginTop: 0,

                        }}

                    >

                    </Box>

                    <Divider />

                    {/* ชื่อ */}
                    <Grid item xs={6} sx={{ padding: 2, marginTop: 0, }} >
                        <p>ชื่อผู้ใช้</p>

                        <FormControl fullWidth variant="outlined" >

                            <TextField

                                disabled

                                id="MemberID"

                                color="secondary" variant="outlined"

                                type="string"

                                size="medium"

                                value={mm?.Name}

                            />
                        </FormControl>
                    </Grid>

                    <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }}>

                        <Grid item xs={6}>
                            <p>ชนิดของอุปกรณ์</p>

                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={notify.EquipmentNameID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "EquipmentNameID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกชนิดอุปกรณ์ที่ชำรุด
                                    </option>
                                    {eqm.map((item: EquipmentNameInterface) => (
                                        <option value={item.ID}>{item.Name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* ประเภทสมาชิก */}
                        <Grid item xs={6}>
                            <p>รหัสของอุปกรณ์</p>

                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={notify.RunNumberID }
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "RunNumberID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกหมายเลขชำรุด
                                    </option>
                                    {runn.map((item: RunNumberInterface) => (
                                        <option value={item.ID}>{item.Number}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ padding: 2, marginTop: -3, }}>

                        <p>ปัญหาที่พบ</p>

                        <FormControl fullWidth variant="outlined">

                            <TextField

                                id="Problem" label="ปัญหาที่พบ"

                                variant="outlined"

                                type="string"

                                size="medium"

                                value={notify.Problem || ""}

                                onChange={handleInputChange}

                            />

                        </FormControl>

                    </Grid>

                    <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }}>
                        {/* birth */}
                        <Grid item xs={6} >

                            <FormControl fullWidth variant="outlined">

                                <p>วันที่แจ้ง</p>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DatePicker

                                        value={Ddate}

                                        onChange={(newValue) => {

                                            setDdate(newValue);

                                        }}

                                        renderInput={(params) => <TextField {...params} />}

                                    />

                                </LocalizationProvider>

                            </FormControl>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ThemeProvider theme={theme}>
                            <Button component={RouterLink} to="/notify_show" variant="contained" color="primary">
                                <Typography color="secondary" fontFamily= 'Prompt'>

                                    ย้อนกลับ

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
                                <Typography color="secondary" fontFamily= 'Prompt'>

                                    บันทึกข้อมูล

                                </Typography>
                            </Button>
                        </ThemeProvider>

                    </Grid>

                </Paper>

            </Container >
        </ div >

    );

}


export default NotifyCreate;