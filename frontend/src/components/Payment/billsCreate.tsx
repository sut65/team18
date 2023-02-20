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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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

import { GetBill, GetMethod, GetPayee } from "../../services/PaymentHttpClientService";
import { PaymentInterface } from "../../models/IPayment/IPayment";
import { PayeeInterface } from "../../models/IPayment/IPayee";
import { PaymentMethodInterface } from "../../models/IPayment/IMethod";
import { BillInterface } from "../../models/IPayment/IBill";


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

function BillCreate() {

  const [payee, setPayee] = React.useState<PayeeInterface[]>([]);
  const [method, setMethod] = React.useState<PaymentMethodInterface[]>([]);
  const [bills, setBills] = React.useState<BillInterface[]>([]);
  const [bi, setBill] = React.useState<Partial<BillInterface>>({
    ID: 0,
  });
  const [payment, setPayment] = React.useState<Partial<PaymentInterface>>({
    ID: 0,
  });

  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const getBills = async (id: any) => {
    let res = await GetBill(id);
    if (res) {
      setBills(res);
    }
  };
  //------------------------handle-------------------------
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
    const name = event.target.name as keyof typeof bi;
    setBill({
      ...bi,
      [name]: event.target.value,
    });
  };
  //----------------------
  async function saveBill() {
    const apiUrl = "http://localhost:8080/bill/";
    localStorage.setItem("bill", JSON.stringify(bi));
    const b = localStorage.getItem("bill");
    if (b == '{"ID":0}' || b == '{"ID":""}') {
      setError(true);
      setSuccess(false);
    } else {
      setSuccess(true);

    }
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(
      `${apiUrl}${bi.ID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          localStorage.setItem("bills", JSON.stringify(res.data));
          return res.data;
        } else {
          return false;
        }
      });

  }
  async function signUp() {
    localStorage.setItem("token", "ppppppppppppppp");
  }

  //-------------------------------------------
  const columns: GridColDef[] = [

    { field: "ID", headerName: "Bill_ID", width: 100 },
    { field: "Member", headerName: "์ชื่อ-นามสกุล", width: 300, valueFormatter: (params) => params.value.Name },
    { field: "PayableAM", headerName: "ยอดชำระ", width: 200 },
    { field: "Status", headerName: "สถานะการชำระ", width: 200, valueFormatter: (params) => params.value.Type },

  ];

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      const x = JSON.parse(localStorage.getItem("lid") || "")
      getBills(x.ID);

    }
    localStorage.setItem("bill", JSON.stringify(bi));
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          {/* ----------------------------alert-------------------- */}
          <Snackbar
            open={success}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              เลือกรายการชำระสำเร็จ
              <Button
                style={{ marginLeft: 10, width: 250, float: "right" }}
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/payment_create"
              >
                <Typography
                  color="secondary"
                >
                  คลิกทีนี้ เพื่อทำรายการต่อ
                </Typography>
              </Button>
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
                รายการชำระเงิน
              </Typography>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
            <DataGrid
              rows={bills}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
          <Typography component="h2" variant="h6" color="primary" gutterBottom
                >
                  <p>รายการเงินที่ต้องการชำระ: </p>
                </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                
                <Select
                  value={bi?.ID}
                  onChange={handleChange}
                  inputProps={{
                    name: "ID",
                  }} >
                  <MenuItem aria-label="None" value={0}>
                    กรุณาเลือกรายการที่ต้องการชำระเงิน
                  </MenuItem>
                  {bills.map((item: BillInterface) => (
                    <MenuItem value={item.ID}>
                      {item.ID}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    style={{ marginTop: 10, width: 170, float: "right" }}
                    onClick={saveBill}
                    variant="contained"
                    color="primary"
                  >
                    <Typography
                      style={{ color: "#f5f5f5" }}
                    >
                      ชำระเงิน
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ marginTop: 10, width: 170, float: "right" }}
                    component={RouterLink}
                    to="/payment_show"
                    variant="contained"
                    color="primary"
                  >
                    <Typography
                     style={{ color: "#f5f5f5" }}
                    >
                      ประวัติชำระเงิน
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

      </ThemeProvider>
    </div>

  );
}
export default BillCreate;