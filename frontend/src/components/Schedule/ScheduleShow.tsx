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

import { Grid, Stack } from "@mui/material";
import { spacing } from "@mui/system";
import { ScheduleInterface } from "../../models/Schedule/ISchedule";
import { GetSchedule } from "../../services/HttpClientService";
import { ListEmployeeID } from "../../services/HttpClientService";

function ScheduleShow() {
  //const [employee, setEmployee] = React.useState<EmployeeInterface>({});
  const [schedules, setSchedules] = React.useState<ScheduleInterface[]>([]);

  //get from list
  const getSchedules = async () => {
    const apiUrl = "http://localhost:8080/schedules";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    // fetch(`${apiUrl}/schedules`, requestOptions)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     if (res.data) {
    //       //console.log(res.data);
    //       setSchedules(res.data);
    //     }
    //   });

    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setSchedules(res.data);
        }
      });
  };

  useEffect(() => {
    getSchedules();
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

          <Box margin={2} sx={{ padding: "2" }}>
            <Stack direction="row-reverse" spacing={2}>
              <Button
                component={RouterLink}
                to="/schedule_edit"
                variant="contained"
                color="primary"
              >
                แก้ไขข้อมูลตารางงาน
              </Button>
              <Button
                component={RouterLink}
                to="/schedule_create"
                variant="contained"
                color="primary"
              >
                บันทึกตารางงาน
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
                <TableCell align="center" width="5%">
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="3%">
                  ประเภทพนักงาน
                </TableCell>
                <TableCell align="center" width="2%">
                  หน้าที่รับผิดชอบ
                </TableCell>
                <TableCell align="center" width="3%">
                  เวลา
                </TableCell>
                <TableCell align="center" width="2%">
                  สถานที่
                </TableCell>
                <TableCell align="center" width="1%">
                  วัน
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule: ScheduleInterface) => (
                <TableRow key={schedule.ID}>
                  <TableCell align="center">{schedule.ID}</TableCell>
                  <TableCell align="center">
                    {schedule.Employee?.Name}
                  </TableCell>
                  <TableCell align="center">{schedule.Role?.Name}</TableCell>
                  <TableCell align="center">{schedule.Duty?.Name}</TableCell>
                  <TableCell align="center">{schedule.Time?.Range}</TableCell>
                  <TableCell align="center">{schedule.Place?.Locate}</TableCell>
                  <TableCell align="center">{schedule.Ocd?.Days}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
export default ScheduleShow;

//status 404: เชื่อม url หรือ apiurl ไม่ได้
//status 400: Bad request การร้องขอผิดพลาด เกิดขึ้นได้หลายกรณี
//status 204: ได้รับการตอบรับแล้วแต่ยังไม่เสร็จ
//status 200: status ถูกต้อง ได้รับ req และทำเสร็จแล้ว
