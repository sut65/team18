import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//สี
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';

import { GetPayment} from "../../services/PaymentHttpClientService";
import { PaymentInterface } from "../../models/IPayment/IPayment";

const theme = createTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: '#e8f5e9',
    },
  },
});
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentShow() {

  const [payments, setPayments] = React.useState<PaymentInterface[]>([]);
  const [payment, setPayment] = React.useState<Partial<PaymentInterface>>({
    ID: 0,
  });
 
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  //-----------------------------get----------

  const getPayments = async () => {
    let res = await GetPayment();
    if (res) {
      setPayments(res);
    }
  };
  //------------------------handle-------------------
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
    const name = event.target.name as keyof typeof payment;
    setPayment({
      ...payment,
      [name]: event.target.value,
    });
  };
  //----------------------

  function Delete() {
    
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment.ID),
  };
  fetch(`${apiUrl}/payment/${JSON.stringify(payment.ID)}`,requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setSuccess(true);
      } else {
        setError(true);
      }
    });
  }


  const columns: GridColDef[] = [

    { field: "ID", headerName: "Payment_ID", width: 100 },
    { field: "Bill", headerName: "รายการชำระเงิน", width: 300, valueFormatter: (params) => params.value.ID },
    { field: "PaymentMethod", headerName: "วิธีการชำระเงิน", width: 200 , valueFormatter: (params) => params.value.Method},
    { field: "PayDate", headerName: "วัน-เวลาทำรายการ", width: 200 },

  ];

  useEffect(() => {
    getPayments();
  },[]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          {/* ----------------------------alert-------------------- */}
          <Snackbar
            open={success}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={6000}
          >
            <Alert onClose={handleClose} severity="success">
              ลบรายการชำระสำเร็จ 
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              ยังไม่เลือกรายการชำระเงิน กรุณาเลือกรายการชำระเงิน
            </Alert>
          </Snackbar>
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                ประวัติรายการชำระเงิน
              </Typography>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
            <DataGrid
              rows={payments}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <Typography component="h2" variant="h6" color="primary" gutterBottom
                >
                  <p>รายการเงินที่ต้องการลบ: </p>
                </Typography>
                <Select
                  value={payment?.ID}
                  onChange={handleChange}
                  inputProps={{
                    name: "ID",
                  }} >
                  <MenuItem aria-label="None" value={0}>
                    กรุณาเลือกรายการที่ต้องการลบ
                  </MenuItem>
                  {payments.map((item: PaymentInterface) => (
                    <MenuItem value={item.ID}>
                      {item.ID}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ marginTop: 10, width: 170, float: "right" }}
                onClick={Delete}
                variant="contained"
                color="primary"
              >
                <Typography
                  color="secondary"
                >
                  ลบ
                </Typography>
              </Button>
            </Grid>

          </Grid>
        </Container>

      </ThemeProvider>
    </div>

  );
}
export default PaymentShow;