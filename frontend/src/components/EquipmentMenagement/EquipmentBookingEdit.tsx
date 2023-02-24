import { MemberInterface } from "../../models/IMember";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { Link as RouterLink } from "react-router-dom";
import { Alert, createTheme, Divider, Grid, Stack, ThemeProvider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { EquipmentBookingListInterface } from "../../models/EquipmentBooking/IEquipmentBookingList";
import { EquipmentListInterface } from "../../models/EquipmentList/IEquipmentList";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    GetEquipmentList,

    GetEquipmentBookingListID,
    UpdateEquipmentBooking,
    ListEquipmentBookingMember
} from "../../services/EquipmentHttpClientService";
import { PlaceInterface } from "../../models/IPlace";
import { GetPlace } from "../../services/HttpClientService";
const theme = createTheme({
    palette: {
        primary: {
            main: "#0065B9",
        },
        secondary: {
            main: "#3BC7FF"
        },
        text: {
            primary: "#1B2420",
            secondary: "#1B2420"
        }
    },
})
function EquipmentBookingEdit() {
    const [DateBooking, setDateBooking] = React.useState<Date | null>(null);
    const [equipmentBookingList, setEquipmentBookingList] = React.useState<Partial<EquipmentBookingListInterface>>({
        EquipmentListID: 0,
        MemberID: 0,
        PlaceID: 0,
        DateBooking: new Date(),

    });
    const [equipmentList, setEquipmentList] = useState<EquipmentListInterface[]>([]);
    const [place, setPlace] = useState<PlaceInterface[]>([]);

    const [member, setMember] = React.useState<MemberInterface>({});

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState(false);

    const [message, setAlertMessage] = React.useState("");

    const [ar, setAletDelete] = React.useState(false);
    const [booking_member, setBooking_member] = React.useState<EquipmentBookingListInterface[]>([]);

    const listEquipmentBookingMember = async (id: any) => {
        let res = await ListEquipmentBookingMember(id);
        if (res) {
            setBooking_member(res);
            console.log(res)
        }
    };
    async function setAlDelete() {
        setAletDelete(true)
    };
    async function DeleteEquipmentBookingList() {
        //localStorage.clear();
        window.location.href = "/equipment_booking_show"; //หน้าขาว
        const apiUrl = "http://localhost:8080";
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(equipmentBookingList.ID),
        };

        let res = await fetch(
            `${apiUrl}/equipmentBookingLists/${JSON.stringify(equipmentBookingList.ID)}`,
            requestOptions
        )
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

    const getEquipmentList = async () => {
        let res = await GetEquipmentList();
        if (res) {
            setEquipmentList(res);
        }
    };

    const getPlace = async () => {
        let res = await GetPlace();
        if (res) {
            setPlace(res);
        }
    };

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            const x = JSON.parse(localStorage.getItem("lid") || "");
            setMember(x);
            listEquipmentBookingMember(x.ID);
        }
        getPlace();
        getEquipmentList();
    }, []);

    console.log(equipmentBookingList);
    const handleChange = (
        event: SelectChangeEvent<number>
    ) => {
        const name = event.target.name as keyof typeof equipmentBookingList;
        const value = event.target.value
        setEquipmentBookingList({
            ...equipmentBookingList,
            [name]: value,
        });
        console.log(`[${name}]: ${value}`)
    };

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
        const id = event.target.value;
        let res = await GetEquipmentBookingListID(id);
        if (res) {
            let data = {

                ID: res.ID,


                MemberID: res.ID,


                EquipmentListID: res.ID,
                PlaceID: res.PlaceID,
                DateBooking: new Date(),

            };

            setEquipmentBookingList(res);
        }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    async function submit() {
        let data = {
            ID: equipmentBookingList.ID,
            EquipmentListID: convertType(equipmentBookingList.EquipmentListID),
            PlaceID: convertType(equipmentBookingList.PlaceID),
            MemberID: member?.ID,
            DateBooking: DateBooking,
        };
        console.log("submit")
        console.log(data)
        let res = await UpdateEquipmentBooking(data);
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
            window.location.href = "/equipment_booking_show";
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
                                <Button onClick={DeleteEquipmentBookingList} variant="outlined" >
                                    <CheckIcon color="secondary" />
                                </Button>
                            </Stack>
                        </Alert>

                    </Snackbar>

                </ThemeProvider>



                <Paper sx={{ marginLeft: 0, padding: 1, marginTop: -1 }}>
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
                                    value={equipmentBookingList.ID + ""}
                                    onChange={onChange}
                                    inputProps={{
                                        name: "ID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกIDที่ต้องการแก้ไข
                                    </option>
                                    {booking_member?.map((item: EquipmentBookingListInterface) => (
                                        <option value={item.ID} key={item.ID} >
                                            {item.ID}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <p>ชื่อผู้บันทึก</p>

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
                            <p>อุปกรณ์</p>

                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={equipmentBookingList.EquipmentListID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "EquipmentListID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกอุปกรณ์
                                    </option>
                                    {equipmentList.map((item: EquipmentListInterface) => (
                                        <option value={item.ID}>{item.Detail}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <p>สถานที่รับอุปกรณ์</p>

                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={equipmentBookingList.PlaceID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "PlaceID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกสถานที่
                                    </option>
                                    {place.map((item: PlaceInterface) => (
                                        <option value={item.ID}>{item.Locate}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }}>
                        {/* birth */}
                        <Grid item xs={6} >

                            <FormControl fullWidth variant="outlined">

                                <p>วันที่จอง</p>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DatePicker

                                        value={equipmentBookingList.DateBooking}
                                        onChange={(newValue) => {
                                            setEquipmentBookingList({
                                                ...equipmentBookingList,
                                                DateBooking: newValue,
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
                            <Button component={RouterLink} to="/equipment_booking_show" variant="contained" color="primary"
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
                                        ยกเลิกการจอง
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
export default EquipmentBookingEdit
