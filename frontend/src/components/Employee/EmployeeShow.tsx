import React, { useState, useEffect } from "react";
import { EmployeeInterface } from "../../models/IEmployee";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import moment from "moment";

//import { GetEmployee } from "../../services/HttpClientService";
import { Grid , Stack} from "@mui/material";
import { spacing } from "@mui/system";

function EmployeeShow() {
  //const classes = useStyles();
  //const [foodSicknesses, setFoodSicknesses] = useState<FoodSicknessInterface[]>([]);
  const [employees, setEmployees] = React.useState<EmployeeInterface[]>([]);
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };



  //get from list 
  const getEmployees = async () => {
    fetch(`${apiUrl}/employees`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          //console.log(res.data);
          setEmployees(res.data);
        } else {
          console.log("else");
        }
        
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
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
              ข้อมูลพนักงาน
            </Typography>
          </Box>
  
          
          <Box margin={2} sx={{padding: '2'}}>
          <Stack direction="row-reverse" spacing={2}>
            <Button
              component={RouterLink}
              to="/employee_edit"
              variant="contained"
              color="primary"
            >
              แก้ไขข้อมูลพนักงาน
            </Button>
            <Button
              component={RouterLink}
              to="/employee_create"
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูลพนักงาน
            </Button>
          </Stack>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="1%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="3%">
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="5%">
                  เบอร์โทร
                </TableCell>
                <TableCell align="center" width="5%">
                  อีเมลล์
                </TableCell>
                <TableCell align="center" width="1%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="5%">
                  ประเภทพนักงาน
                </TableCell>
                <TableCell align="center" width="5%">
                  ระดับการศึกษา
                </TableCell>
                <TableCell align="center" width="5%">
                  วันเกิด
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee: EmployeeInterface) => (
                <TableRow key={employee.ID}>
                  <TableCell align="center">{employee.ID}</TableCell>
                  <TableCell align="center">{employee.Name}</TableCell>
                  <TableCell align="center">{employee.Tel}</TableCell>
                  <TableCell align="center">{employee.Email}</TableCell>
                  <TableCell align="center">{employee.Gender?.Gtype}</TableCell>
                  <TableCell align="center">{employee.Role?.Name}</TableCell>
                  <TableCell align="center">{employee.Education?.Education}</TableCell>
                  {/* <TableCell align="center">{format(new Date(employee.DOB), "dd MMMM yyyy ")}</TableCell> */}
                  <TableCell align="center">{moment(employee.DOB).format("DD/MM/YYYY")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
export default EmployeeShow;

//status 404: เชื่อม url หรือ apiurl ไม่ได้
//status 400: Bad request การร้องขอผิดพลาด เกิดขึ้นได้หลายกรณี
//status 204: ได้รับการตอบรับแล้วแต่ยังไม่เสร็จ
//status 200: status ถูกต้อง ได้รับ req และทำเสร็จแล้ว
