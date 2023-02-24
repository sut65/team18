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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import MenuItem from "@mui/material/MenuItem";
//สี
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';

import { CreatePayment } from "../../services/PaymentHttpClientService";
import { GetBill, GetMethod, GetPayee, GetBillByID } from "../../services/PaymentHttpClientService";
import { PayeeInterface } from "../../models/IPayment/IPayee";
import { PaymentMethodInterface } from "../../models/IPayment/IMethod";

import { PaymentInterface } from "../../models/IPayment/IPayment";
import { BillInterface } from "../../models/IPayment/IBill";
import { red } from '@mui/material/colors';

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
const redd = red[500];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentCreate() {
  const [payee, setPayee] = React.useState<PayeeInterface[]>([]);
  const [method, setMethod] = React.useState<PaymentMethodInterface[]>([]);
  const [bills, setBills] = React.useState<Partial<BillInterface>>({});


  const [payment, setPayment] = React.useState<Partial<PaymentInterface>>({
    BillID: 0,
    PaymentMethodID: 0,
    PayeeID: 0,
    PayDate: new Date(),
  });
  const [time, setTime] = React.useState<Date | null>();
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");
  const [er, setEr] = React.useState(false);

  //-----------------------getPayee

  const getPayee = async () => {
    let res = await GetPayee();
    if (res) {
      setPayee(res);
    }
  };
  const getMethod = async () => {
    let res = await GetMethod();
    if (res) {
      setMethod(res);
    }
  };

 
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setBills(JSON.parse(localStorage.getItem("bills") || ""));
    }
    getPayee();
    getMethod();
  }, []);

  console.log(payment)

  //-----------------------------------------handle------------------------------

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {

    const id = event.target.id as keyof typeof PaymentCreate;

    const { value } = event.target;

    setPayment({ ...payment, [id]: value });

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
    setEr(false);
  };

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof payment;
    setPayment({
      ...payment,
      [name]: event.target.value,
    });
  };
  async function cancle() {
    setEr(true);
  }


  //--------------------------submit--------------------
  async function submit() {
    console.log(bills)
    let data = {
      PayeeID: payment.PayeeID,
      // PayeeID: typeof payment?.PayeeID === "string" ? parseInt(payment.PayeeID) : 0,
      PaymentMethodID: payment.PaymentMethodID,
      // PaymentMethodID: typeof payment.PaymentMethodID === "string" ? parseInt(payment.PaymentMethodID) : 0,
      BillID: bills.ID,
      // BillID: typeof payment.BillID === "string" ? parseInt(payment.BillID) : 0,
      PayDate: payment.PayDate,
      Note: payment.Note,
    };
    console.log(data)
    let res = await CreatePayment(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
      BillUpdate();
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }

  function BillUpdate() {
    let data = {
      ID: bills?.ID,
      MemberID: bills?.MemberID,
      StatusID: 1,
    };

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/bill`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
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
        <Snackbar
          id="error"
          open={er}
          autoHideDuration={8000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ต้องการยกเลิกรายการชำระเงิน
            <Button
              style={{ marginLeft: 10, width: 250, float: "right" }}
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/bill_create"
            >
              <Typography
              style={{ color: "#f5f5f5" }}
              >
                คลิกทีนี้ เพื่อตกลง
              </Typography>
            </Button>
          </Alert>
        </Snackbar>
        <Paper>
          {/* ---------------------------------------------------------------------------------------------------- */}
          <Box
            display="flex"
            sx={{
              marginTop: 2,backgroundColor: "#ffca28"
            }}
          >
            <Box sx={{ paddingX: 2, paddingY: 1 }} >
              <Typography component="h2" variant="h4" color="primary" gutterBottom
              style={{ color: "#424242"}}
              >
                ระบบชำระเงิน
              </Typography>
            </Box>
          </Box>
          {/* ------------------------------------------------------------------------------------------------------- */}
          <Divider />
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box sx={{ paddingX: 2, paddingY: 1 }} >
              <Typography component="h2" variant="h6" color="primary" gutterBottom
               style={{ color: "#424242"}}
              >
                รายการชำระเงิน
              </Typography>
            </Box>
          </Box>
          {/* -------------------------------- */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                  <p>N0:</p>
                  <Select
                    value={payment.BillID}
                    fullWidth
                    disabled
                  >
                    <MenuItem value={0}>
                      BillNo: {bills?.ID}
                      <Button
                        style={{ marginLeft: 100, width: 170, }}
                        variant="contained"
                      >DEPT:{bills?.PayableAM}
                      </Button>
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>

            {/* ---------------- -------------------------------------------- */}
            <Grid item xs={4}>
              <Grid container spacing={1}  >
                <Grid item xs={12} >
                  <AccountBoxTwoToneIcon style={{ color: "#424242", fontSize: '100px', marginLeft: 80, marginTop: 0, }} />
                  <Typography
                    variant="h5"
                    style={{ color: "#424242", marginLeft: 85, }}
                    gutterBottom>Member </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          {/* ------------------------------------------------- */}
          <Grid container spacing={3} sx={{ padding: 2 }} >
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>Payment Method</p>
                <Select
                  value={payment.PaymentMethodID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PaymentMethodID",
                  }}
                >
                  <MenuItem aria-label="None" value={0} key={0}>
                    กรุณาเลือกช่องทางชำระเงิน
                  </MenuItem>
                  {method.map((item: PaymentMethodInterface) => (
                    <MenuItem value={item.ID}>
                      {item.Method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* ---------------- โรค-------------------------------------------- */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>Payee:</p>
                <Select
                  value={payment.PayeeID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PayeeID",
                  }}
                >
                  <MenuItem aria-label="None" value={0} key={0}>
                    กรุณาเลือกธนาคารปลายทาง
                  </MenuItem>
                  {payee.map((item: PayeeInterface) => (
                    <MenuItem value={item.ID}>
                      AccountNo: {item.AccountNo}  AccountName: {item.AccountName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={10} sx={{ padding: 3 }}>
              <Grid item xs={1}>
                หมายเหตุ:
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth variant="outlined">
                  <TextField

                    id="Note"

                    variant="outlined"

                    type="string"

                    size="medium"

                    value={payment?.Note || ""}

                    onChange={handleInputChange}

                  />

                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: 4 }}>
              <Grid item xs={3}>
                <p>วันที่ทำการชำระเงิน:</p>
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DateTimePicker

                      renderInput={(params) => <TextField {...params} />}

                      label="Time"

                      value={payment.PayDate}

                      onChange={(newValue) => {
                        setPayment({
                          ...payment,
                          PayDate: newValue,
                        });
                      }}
                    />

                  </LocalizationProvider>

                </FormControl>
              </Grid>
            </Grid>


            <Grid item xs={6} >
              <Button
                style={{ marginLeft: 0, marginTop: 10, width: 170, }}
                variant="contained"
                color = "secondary"
                onClick={cancle}
              >
                <Typography
                  style={{ color: "#f5f5f5" }}
                >
                  Cancle
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ color: "#f5f5f5" ,marginTop: 10, width: 170, float: "right" }}
                onClick={submit}
                variant="contained"
                color = "primary"
              >
                <Typography
                  style={{ color: "#f5f5f5" }}
                >
                  ชำระเงิน
                </Typography>
              </Button>
            </Grid>

          </Grid>
        </Paper>

      </Container>
    </ThemeProvider>
  );

}


export default PaymentCreate;