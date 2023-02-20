import { Box, Button, Container, createTheme, Divider, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

import React, { useEffect } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RecipientInterface } from "../../models/INews/IRecipient";
import { NewsTypeInterface } from "../../models/INews/INewsType";
import { NewsInterface } from "../../models/INews/INews";
import { CreateNews, GetNewstype, GetRecipient } from "../../services/NewsHttpClientService";
import { EmployeeInterface } from "../../models/IEmployee";


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

function NewsCreate() {

    const [recipient, setRecipient] = React.useState<RecipientInterface[]>([]);
    const [type, setType] = React.useState<NewsTypeInterface[]>([]);
    const [news, setNews] = React.useState<Partial<NewsInterface>>({
        ID: 0,
        EmployeeID: 0,
    });
    const [ddate, setDdate] = React.useState<Date | null>(
        new Date()
    );
    const [sdate, setSdate] = React.useState<Date | null>(
        new Date()
    );
    const [em, setEm] = React.useState<Partial<EmployeeInterface>>();
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



    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setEm(JSON.parse(localStorage.getItem("lid") || ""));
        }
        getRecipient();
        getNewstype();
    }, []);



    //-----------------------------------------handle------------------------------
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof NewsCreate;
        const { value } = event.target;
        setNews({ ...news, [id]: value });
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

    const handleChange = (
        event: SelectChangeEvent<number>
    ) => {
        const name = event.target.name as keyof typeof news;
        setNews({
            ...news,
            [name]: event.target.value,
        });
    };




    //-------------------------submid----------------------------------
    async function submit() {

        let data = {
            Headline: news.Headline,
            Body: news.Body,
            RecipientID: news.RecipientID,
            // PayeeID: typeof payment?.PayeeID === "string" ? parseInt(payment.PayeeID) : 0,
            NewsTypeID: news.NewsTypeID,
            // PaymentMethodID: typeof payment.PaymentMethodID === "string" ? parseInt(payment.PaymentMethodID) : 0,
            EmployeeID: em?.ID,
            // BillID: typeof payment.BillID === "string" ? parseInt(payment.BillID) : 0,
            SDate: sdate,
            DDate: ddate,

        };
        console.log(data)
        let res = await CreateNews(data);
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }



    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" style={{ marginTop: 0 }}>
                {/* ----------------------------Alert------------------------ */}
                <Snackbar
                    id="success"
                    open={success}
                    autoHideDuration={8000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>
               
                {/* ---------------------------------------------------------------------------------------------------- */}
                <Paper>
                    <Box
                        display="flex"
                        sx={{
                            marginTop: 2,
                        }}
                    >
                        <Box sx={{ paddingX: 2, paddingY: 1 }}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom
                            >
                                ระบบบันทึกข่าวสาร
                            </Typography>
                        </Box>
                    </Box>

                    <Divider color="primary" />

                    {/* ------------------------------หัวข้อ------------------------------------------- */}
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

                                    value={news?.Headline || ""}

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

                                    value={news?.Body || ""}

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

                                        value={sdate}

                                        onChange={setSdate}
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

                                        value={ddate}

                                        onChange={setDdate}
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
                                    value={news.RecipientID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "RecipientID",
                                    }}
                                >
                                    <MenuItem aria-label="None" value={0} key={0}>
                                        กรุณาเลือกช่องทางชำระเงิน
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
                                    value={news.NewsTypeID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "NewsTypeID",
                                    }}
                                >
                                    <MenuItem aria-label="None" value={0} key={0}>
                                        กรุณาเลือกช่องทางชำระเงิน
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
                                <Select
                                    value={news?.EmployeeID}
                                    disabled
                                >
                                    <MenuItem value={0} >
                                        {em?.Name}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={6} >
                            <Button
                                style={{ marginLeft: 0, marginTop: 10, width: 170, }}
                                variant="contained"
                                color="primary"
                            >
                                <Typography
                                    color="secondary"
                                >
                                    Cancle
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                style={{ marginTop: 10, width: 170, float: "right" }}
                                onClick={submit}
                                variant="contained"
                                color="primary"
                            >
                                <Typography
                                    color="secondary"
                                >
                                    Save
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        </ThemeProvider>

    );
}
export default NewsCreate;
