import { Box, Button, Container, createTheme, Divider, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

import React, { useEffect } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RecipientInterface } from "../../models/INews/IRecipient";
import { NewsTypeInterface } from "../../models/INews/INewsType";
import { NewsInterface } from "../../models/INews/INews";
import { CreateNews, GetNews, GetNewsbys, GetNewstype, GetRecipient, UpdateNews } from "../../services/NewsHttpClientService";
import { EmployeeInterface } from "../../models/IEmployee";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link as RouterLink } from "react-router-dom";



//สี


const theme = createTheme({
    palette: {
        primary: {
            main: "#FEAC3F",
        },
        secondary: {
            main: "#ff3d00"
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

function NewsUpdate() {

    const [recipient, setRecipient] = React.useState<RecipientInterface[]>([]);
    const [type, setType] = React.useState<NewsTypeInterface[]>([]);
    const [news, setNews] = React.useState<NewsInterface[]>([]);
    const [ddate, setDdate] = React.useState<Date | null>(
        new Date()
    );
    const [sdate, setSdate] = React.useState<Date | null>(
        new Date()
    );
    const [em, setEm] = React.useState<EmployeeInterface>();
    const [nnews, setNnews] = React.useState<Partial<NewsInterface>>({
        EmployeeID: 0
    });

    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");

    //-----------------------get------------------------------------

    const getRecipient = async () => {
        let res = await GetRecipient();
        if (res) {
            setRecipient(res);
        }
    };
    const getNewstype = async () => {
        let res = await GetNewstype();
        if (res) {
            setType(res);
        }
    };

    const getNews = async () => {
        let res = await GetNews();
        if (res) {
            setNews(res);
        }
    };



    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setEm(JSON.parse(localStorage.getItem("lid") || ""));
        }
        getRecipient();
        getNewstype();
        getNews();
    }, []);



    //-----------------------------------------handle------------------------------

    const onChange = async (event: SelectChangeEvent) => {
        const id = event.target.value
        let res = await GetNewsbys(id);
        if (res) {
            setNnews(res);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof NewsUpdate;
        const { value } = event.target;
        setNnews({ ...nnews, [id]: value });
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

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof nnews;
        setNnews({
            ...nnews,
            [name]: event.target.value,
        });
    };

    function Delete() {

        const apiUrl = "http://localhost:8080";
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nnews.ID),
        };
        fetch(`${apiUrl}/news/${JSON.stringify(nnews.ID)}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                    window.location.reload()
                } else {
                    setError(true);
                }
            });
    }



    //-------------------------submid----------------------------------
    async function submit() {

        let data = {
            ID: nnews.ID,
            Headline: nnews.Headline,
            Body: nnews.Body,
            RecipientID: nnews.RecipientID,
            // PayeeID: typeof payment?.PayeeID === "string" ? parseInt(payment.PayeeID) : 0,
            NewsTypeID: nnews.NewsTypeID,
            // PaymentMethodID: typeof payment.PaymentMethodID === "string" ? parseInt(payment.PaymentMethodID) : 0,
            EmployeeID: em?.ID,
            // BillID: typeof payment.BillID === "string" ? parseInt(payment.BillID) : 0,
            SDate: nnews.SDate,
            DDate: nnews.DDate,

        };
        console.log(data)
        let res = await UpdateNews(data);
        if (res) {
            setSuccess(true);
        } else {
            setError(true);
        }
    }



    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ marginTop: 0 }}>
                {/* ----------------------------Alert------------------------ */}
                <Snackbar
                    id="success"
                    open={success}
                    autoHideDuration={8000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="success">
                        ทำรายการเสร็จสิน
                    </Alert>
                </Snackbar>
                <Snackbar
                    id="error"
                    open={error}
                    autoHideDuration={8000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="error">
                        ไม่สามารถทำได้ กรุณาลองใหม่
                    </Alert>
                </Snackbar>

                {/* ---------------------------------------------------------------------------------------------------- */}
                <Paper>
                    <Box
                        display="flex"
                        sx={{
                            marginTop: 2,
                            bgcolor: "#ff9100",
                        }}
                    >
                        <Box sx={{ paddingX: 2, paddingY: 1 }}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom
                                style={{ color: "#f5f5f5" }}
                            >
                                ข่าวสารทั้งหมด
                            </Typography>
                        </Box>
                        <Button
                            sx={{ marginTop: 0, width: 170, float: "right", bgcolor: "#ffa000", }}
                            variant="contained"
                            component={RouterLink} to="/news_create"
                        >
                            <PostAddIcon style={{ color: "#f5f5f5" }}/>
                            <Typography
                                style={{ color: "#f5f5f5" }}
                            >
                                เพิ่มข่าวสาร
                            </Typography>
                        </Button>
                    </Box>

                    <Divider color="primary" />

                    {/* ------------------------------หัวข้อ------------------------------------------- */}
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={2}>
                            ID:
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    value={nnews.ID + ""}
                                    onChange={onChange}
                                    inputProps={{
                                        name: "ID",
                                    }}
                                >
                                    <MenuItem aria-label="None" value={""}>
                                        กรุณาเลือกข่าวสาร
                                    </MenuItem>
                                    {news.map((item: NewsInterface) => (
                                        <MenuItem value={item.ID} key={item.ID}>
                                            {item.ID}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={2}>
                            หัวเรื่องข่าว:
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth variant="outlined">
                                <TextField

                                    id="Headline"

                                    variant="outlined"

                                    type="string"

                                    size="medium"

                                    value={nnews?.Headline || ""}

                                    onChange={handleInputChange}

                                />

                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* ------------------------------ข่าว------------------------------------------- */}
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={2}>
                            เนื้อหาข่าว:
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth variant="outlined">
                                <TextField

                                    id="Body"

                                    variant="outlined"

                                    type="string"

                                    size="medium"

                                    value={nnews?.Body || ""}

                                    onChange={handleInputChange}

                                />

                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">

                                <p>วันที่แสดง</p>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DateTimePicker

                                        renderInput={(props) => <TextField {...props} />}

                                        label="Time"

                                        value={nnews.SDate}

                                        onChange={(newValue) => {
                                            setNnews({
                                                ...nnews,
                                                SDate: newValue,
                                            });
                                        }}
                                    />

                                </LocalizationProvider>

                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">

                                <p>วันที่ยกเลิกแสดง</p>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DateTimePicker

                                        renderInput={(props) => <TextField {...props} />}

                                        label="Time"

                                        value={nnews.DDate}

                                        onChange={(newValue) => {
                                            setNnews({
                                                ...nnews,
                                                DDate: newValue,
                                            });
                                        }}
                                    />

                                </LocalizationProvider>

                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <p>ผู้รับสาร:</p>
                                <Select
                                    value={nnews.RecipientID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "RecipientID",
                                    }}
                                >
                                    <MenuItem aria-label="None" value={""} >
                                        {nnews.RecipientID}
                                    </MenuItem>
                                    {recipient.map((item: RecipientInterface) => (
                                        <MenuItem value={item.ID}>
                                            {item.Recipient}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <p>ประเภท:</p>
                                <Select
                                    value={nnews.NewsTypeID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "NewsTypeID",
                                    }}
                                >
                                    <MenuItem aria-label="None" value={""}>
                                        {nnews.NewsTypeID}
                                    </MenuItem>
                                    {type.map((item: NewsTypeInterface) => (
                                        <MenuItem value={item.ID}>
                                            {item.Type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <p>ผู้เขียน:</p>
                                <TextField

                                    id="id"

                                    variant="outlined"

                                    type="string"

                                    size="medium"

                                    value={em?.Name || ""}

                                />

                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={6} >
                            <Button
                                sx={{ marginLeft: 0, marginTop: 5, width: 170, bgcolor: "#eeeeee" }}
                                onClick={() => {
                                    window.location.href = "/news_update";
                                }}
                                variant="contained"
                            >
                                <Typography
                                    style={{ color: "#424242" }}
                                >
                                    Cancle
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                sx={{ marginTop: 5, width: 170, float: "right", bgcolor: "#2196f3" }}
                                onClick={submit}
                                variant="contained"

                            >
                                <Typography
                                    style={{ color: "#f5f5f5" }}
                                >
                                    Save
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ padding: 2 }}>
                        <Grid item xs={12}>
                            <Button
                                sx={{ marginTop: 0, width: 170, float: "right", bgcolor: "#e53935", }}
                                onClick={Delete}
                                variant="contained"

                            >
                                <Typography
                                    style={{ color: "#f5f5f5" }}
                                >
                                    Delete
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>


                </Paper>
            </Container>
        </ThemeProvider>

    );
}
export default NewsUpdate;


