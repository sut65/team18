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
import {
    CreateNotify, GetEquipmentname, GetNotifyID, GetRunnumber, UpdateNotify,
    ListNotifybyMember,
} from "../../services/NotifyHttpCS";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';




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


function NotifyEdit() {
    const [Ddate, setDdate] = React.useState<Date | null>(null);
    const [notify, setNotify] = React.useState<Partial<NotifyInterface>>({
        Problem: "",
        EquipmentNameID: 0,
        RunNumberID: 0,
        MemberID: 0,
        Ddate: new Date(),
    });


    const [member, setMember] = React.useState<MemberInterface>({});

    const [eqm, setEquipmentname] = React.useState<EquipmentNameInterface[]>([]);

    const [runn, setRunnumber] = React.useState<RunNumberInterface[]>([]);

    const [success, setSuccess] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [message, setAlertMessage] = React.useState("");

    const [notifies_Member, setNotifies_Member] = React.useState<NotifyInterface[]>([]);

    const [ar, setAletDelete] = React.useState(false);

    const listNotifybyMember = async (id: any) => {
        let res = await ListNotifybyMember(id);
        if (res) {
            setNotifies_Member(res);
            console.log(res)
        }
    };

    async function setAlDelete() {
        setAletDelete(true)
    };

    async function DeleteNotify() {

        window.location.href = "/notify_show";
        const apiUrl = "http://localhost:8080";
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notify.ID),
        };

        let res = await fetch(`${apiUrl}/notify/${JSON.stringify(notify.ID)}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {

                    return { status: true, message: res.data };
                } else {
                    return { status: false, message: res.error };
                }
            });

        return res;
    }

    const getRunnumber = async () => {
        let res = await GetRunnumber();
        if (res) {
            setRunnumber(res);
        }
    };

    const getEquipmentname = async () => {
        let res = await GetEquipmentname();
        if (res) {
            setEquipmentname(res);
        }
    };

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            const x = JSON.parse(localStorage.getItem("lid") || "")
            setMember(x);
            listNotifybyMember(x.ID);
        }
        getRunnumber();
        getEquipmentname();
        //listNotifybyMember(member.ID);
    }, []);
    // console.log("member")
    // console.log(member);
    // console.log("notifies_Member");
    // console.log(notifies_Member);

    const handleChange = (
        event: SelectChangeEvent<number>
    ) => {
        const name = event.target.name as keyof typeof notify;
        const value = event.target.value
        setNotify({
            ...notify,
            [name]: value,
        });
        console.log(`[${name}]: ${value}`)
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
        setAletDelete(false);
        setError(false);

    };

    const onChange = async (event: SelectChangeEvent) => {
        const id = event.target.value
        let res = await GetNotifyID(id);
        if (res) {
            let data = {

                ID: res.ID,

                Problem: res.Problem,

                MemberID: res.ID,

                RunNumberID: res.RunNumberID,
                EquipmentNameID: res.EquipmentNameID,
                Ddate: new Date(),

            };
            setNotify(data);
        }
    };


    const handleInputChange = (

        event: React.ChangeEvent<{ id?: string; value: any }>

    ) => {

        const id = event.target.id as keyof typeof NotifyEdit;

        const { value } = event.target;

        setNotify({ ...notify, [id]: value });
        console.log(`[${id}]: ${value}`)

    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {

            ID: notify.ID,

            Problem: notify.Problem ?? "",

            MemberID: member?.ID,

            RunNumberID: convertType(notify.RunNumberID),

            EquipmentNameID: convertType(notify.EquipmentNameID),

            Ddate: Ddate,

        };
        console.log("submit")
        console.log(data)
        let res = await UpdateNotify(data);
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
            window.location.href = "/notify_show";
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
                <ThemeProvider theme={theme}>

                    <Snackbar open={ar} autoHideDuration={8000} onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>

                        <Alert onClose={handleClose} severity="warning" >

                            คุณต้องการลบข้อมูล ID นี้?

                            <Stack direction="column" spacing={4}>
                                <Button onClick={DeleteNotify} variant="outlined" >
                                    <CheckIcon color="secondary" />
                                </Button>
                            </Stack>
                        </Alert>

                    </Snackbar>

                </ThemeProvider>



                <Paper sx={{ marginLeft: 0, padding: 1, marginTop:-1 }}>
                    <ThemeProvider theme={theme}>
                        <Typography sx={{ marginLeft: 0, padding: 1, marginTop: 0 }}

                            component="h2"

                            variant="h4"

                            color="primary"

                            gutterBottom

                        >

                            แก้ไขข้อมูล

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
                        <Grid item xs={6}>

                            <p>ID</p>

                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={notify.ID + ""}
                                    onChange={onChange}
                                    inputProps={{
                                        name: "ID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกIDที่ต้องการแก้ไข
                                    </option>
                                    {notifies_Member?.map((item: NotifyInterface) => (
                                        <option value={item.ID} key={item.ID} >
                                            {item.ID}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <p>ชื่อผู้ใช้</p>

                        <FormControl fullWidth variant="outlined" >

                            <TextField

                                disabled

                                id="MemberID"

                                color="secondary" variant="outlined"

                                type="string"

                                size="medium"

                                value={member?.Name}

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
                                    value={notify.RunNumberID}
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

                                        value={notify.Ddate}

                                        onChange={(newValue) => {
                                            setNotify({
                                                ...notify,
                                                Ddate: newValue,
                                            });
                                        }}

                                        renderInput={(params) => <TextField {...params} />}

                                    />

                                </LocalizationProvider>

                            </FormControl>

                        </Grid>
                    </Grid>
                    
                        <Grid item xs={12}>
                            <ThemeProvider theme={theme}>
                                <Button component={RouterLink} to="/notify_show" variant="contained" color="primary"
                                 sx={{ marginTop: 0 }}>
                                    <Typography color="secondary">

                                        ย้อนกลับ

                                    </Typography>
                                </Button>
                            </ThemeProvider>

                            <ThemeProvider theme={theme}>
                                <Stack direction="row-reverse" spacing={2} sx={{ marginTop: -4.5 }}>
                                    <Button style={{ float: "right" }} onClick={submit} variant="contained" color="primary"

                                    >
                                        <Typography color="secondary">

                                            ยืนยันการแก้ไข

                                        </Typography>
                                    </Button>

                                    <Button endIcon={<DeleteIcon color="secondary" />} variant="contained" color="primary" onClick={setAlDelete} style={{ float: "right" }}>
                                        <Typography color="secondary">
                                            ยกเลิกการแจ้งชำรุด
                                        </Typography>

                                    </Button>
                                </Stack>
                            </ThemeProvider>

                        </Grid>
                    
                </Paper>

            </Container >
        </ div >

    );

}


export default NotifyEdit;