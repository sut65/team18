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
import { createTheme, Divider, Grid, Stack, ThemeProvider } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { EmployeeInterface } from "../../models/IEmployee";
import {
    GetEquipmentName,
    GetRunNumber,

    GetEquipmentListID,
    ListEquipmentListShow,
    UpdateEquipmentList

} from "../../services/EquipmentHttpClientService";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { EquipmentNameInterface } from "../../models/EquipmentList/IEquipmentName";
import { RunNumberInterface } from "../../models/EquipmentList/IRunNumber";
import { EquipmentListInterface } from "../../models/EquipmentList/IEquipmentList";
import { DateTimePicker } from "@mui/x-date-pickers";

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

function EquipmentListEdit() {
    const [equipmentList, setEquipmentList] = React.useState<Partial<EquipmentListInterface>>({
        RunNumberID: 0,
        EquipmentNameID: 0,
        EmployeeID: 0,
        DateTime: new Date(),

    });
    const [DateTime, setDateTime] = React.useState<Date | null>(null);
    const [equipmentName, setEquipmentName] = useState<EquipmentNameInterface[]>([]);
    const [runNumber, setRunNumer] = useState<RunNumberInterface[]>([]);

    const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({});

    const [success, setSuccess] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [message, setAlertMessage] = React.useState("");

    const [ar, setAletDelete] = React.useState(false);
    const [equipmentListShow, setEquipmentListShow] = React.useState<EquipmentListInterface[]>([]);
    
    const listEquipmentListShow = async (id: any) => {
        let res = await ListEquipmentListShow(id);
        if (res) {
            setEquipmentListShow(res);
            console.log(res)
        }
    };
    async function setAlDelete() {
        setAletDelete(true)
    };

    async function DeleteEquipmentList() {
        //localStorage.clear();
        window.location.href = "/equipment_shows"; //หน้าขาว
        const apiUrl = "http://localhost:8080";
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(equipmentList.ID),
        };

        let res = await fetch(
            `${apiUrl}/equipmentLists/${JSON.stringify(equipmentList.ID)}`,
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
    const getEquipmentName = async () => {
        let res = await GetEquipmentName();
        if (res) {
            setEquipmentName(res);
        }
    };

    const getRunNumber = async () => {
        let res = await GetRunNumber();
        if (res) {
            setRunNumer(res);
        }
    };
    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            const x = JSON.parse(localStorage.getItem("lid") || "");
            setEmployee(x);
            listEquipmentListShow(x.ID);
        }
        getEquipmentName();
        getRunNumber();
    }, []);
    console.log(equipmentList);
    const handleChange = (
        event: SelectChangeEvent<number>
    ) => {
        const name = event.target.name as keyof typeof equipmentList;
        const value = event.target.value
        setEquipmentList({
            ...equipmentList,
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
        const id = event.target.value;
        let res = await GetEquipmentListID(id);
        if (res) {
            let data = {

                ID: res.ID,
                Detail: res.Detail,

                EmployeeID: res.ID,

                RunNumberID: res.RunNumberID,
                EquipmentNameID: res.EquipmentNameID,
                DateTime: new Date(),

            };

            setEquipmentList(res);
        }
    };
    const handleInputChange = (

        event: React.ChangeEvent<{ id?: string; value: any }>

    ) => {

        const id = event.target.id as keyof typeof EquipmentListEdit;

        const { value } = event.target;

        setEquipmentList({ ...equipmentList, [id]: value });
        console.log(`[${id}]: ${value}`)

    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            ID: equipmentList.ID,
            Detail: equipmentList.Detail ?? "",
            RunNumberID: convertType(equipmentList.RunNumberID),
            EquipmentNameID: convertType(equipmentList.EquipmentNameID),
            EmployeeID: employee?.ID,
            DateTime: DateTime,
        };
        console.log("submit")
        console.log(data)
        let res = await UpdateEquipmentList(data);
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
            window.location.href = "/equipment_shows";
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
                                <Button onClick={DeleteEquipmentList} variant="outlined" >
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
                                    value={equipmentList.ID + ""}
                                    onChange={onChange}
                                    inputProps={{
                                        name: "ID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกIDที่ต้องการแก้ไข
                                    </option>
                                    {equipmentListShow?.map((item: EquipmentListInterface) => (
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

                                id="employeeID"

                                color="secondary" variant="outlined"

                                type="string"

                                size="medium"

                                value={employee?.Name}

                            />
                        </FormControl>
                    </Grid>

                    <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }}>

                        <Grid item xs={6}>
                            <p>ชนิดของอุปกรณ์</p>

                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={equipmentList.EquipmentNameID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "EquipmentNameID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกชนิดอุปกรณ์
                                    </option>
                                    {equipmentName.map((item: EquipmentNameInterface) => (
                                        <option value={item.ID}>{item.Name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* ประเภทสมาชิก */}
                        <Grid item xs={6}>
                            <p>หมายเลขของอุปกรณ์</p>

                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={equipmentList.RunNumberID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "RunNumberID",
                                    }}

                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกหมายเลข
                                    </option>
                                    {runNumber.map((item: RunNumberInterface) => (
                                        <option value={item.ID}>{item.Number}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ padding: 2, marginTop: -3, }}>

                        <p>รายละเอียด</p>

                        <FormControl fullWidth variant="outlined">

                            <TextField

                                id="Detail" label="รายละเอียด"

                                variant="outlined"

                                type="string"

                                size="medium"

                                value={equipmentList.Detail || ""}

                                onChange={handleInputChange}

                            />

                        </FormControl>

                    </Grid>

                    <Grid container spacing={3} sx={{ padding: 2, marginTop: -7, }}>
                        {/* birth */}
                        <Grid item xs={6} >

                            <FormControl fullWidth variant="outlined">

                                <p>วันที่บันทึก</p>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DateTimePicker

                                        value={equipmentList.DateTime}

                                        onChange={(newValue) => {
                                            setEquipmentList({
                                                ...equipmentList,
                                                DateTime: newValue,
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
                            <Button component={RouterLink} to="/equipment_shows" variant="contained" color="primary"
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
                                        ยกเลิกการบันทึก
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
export default EquipmentListEdit