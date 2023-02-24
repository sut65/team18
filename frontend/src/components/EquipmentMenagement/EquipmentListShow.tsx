import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { EmployeeInterface } from "../../models/IEmployee";
import { EquipmentListInterface } from "../../models/EquipmentList/IEquipmentList";
import { ListEquipmentListShow } from "../../services/EquipmentHttpClientService";
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
function EquipmentListShow() {
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    const [equipmentListShow, setEquipmentListShow] = React.useState<EquipmentListInterface[]>([]);


    const getEquipmentListShow= async (id:any) => {
        let res = await ListEquipmentListShow(id);
        if (res) {
            setEquipmentListShow(res);
            console.log(res)
        }
    };

    useEffect(() => {
const getToken = localStorage.getItem("token");
        if (getToken) {
            const x = JSON.parse(localStorage.getItem("lid") || "")
            setEmployee(x);
            getEquipmentListShow(x.ID);
        }

    }, []);


    return (

        <div>

            <Container maxWidth="md" sx={{width: "100%",marginRight: "20" }}>

                <Box

                    display="flex"

                    sx={{

                        marginTop: 2,

                    }}

                >

                    <Box flexGrow={1}>
                        <ThemeProvider theme={theme}>
                            <Typography
                                component="h2"
                                variant="h5"
                                color="primary"
                                gutterBottom
                            >

                                ประวัติการเพิ่มอุปกรณ์

                            </Typography>
                        </ThemeProvider>
                    </Box>
                    <Box>
                        <ThemeProvider theme={theme}>
                        <Stack direction="column-reverse" spacing={2}>
                            <Button component={RouterLink} to="/equipment_create"
                                variant="outlined" size="medium" color="primary"
                            >
                                <Typography
                                    color="pimary"
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1 }}
                                >
                                    เพิ่มอุปกรณ์

                                </Typography>
                            </Button>
                            <Button component={RouterLink} to="/equipment_edit"
                                size="medium" variant="outlined" color="primary"
                            >

                                <Typography
                                    color="pimary"
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1 }}
                                >
                                    แก้ไขข้อมูลที่เคยบันทึก

                                </Typography>
                            </Button>
                            </Stack>
                        </ThemeProvider>
                    </Box>
                </Box>
                <div>
                    <Container maxWidth="md" >
                        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
                            <TableContainer >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        {/* หัวข้อตาราง */}
                                        <TableRow>
                                            <TableCell align="center" width="5%"> ID </TableCell>
                                            <TableCell align="center" width="20%"> รายละเอียดอุปกรณ์ </TableCell>
                                            <TableCell align="center" width="20%"> ผู้บันทึก </TableCell>
                                            <TableCell align="center" width="20%"> วันที่บันทึก </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {equipmentListShow.map((item: EquipmentListInterface) => (
                                            <TableRow key={item.ID}>
                                                <TableCell align="center">{item.ID}</TableCell>
                                                <TableCell align="center">{item.Detail}</TableCell>
                                                <TableCell align="center">{item.EquipmentName?.Name}</TableCell>
                                                <TableCell align="center">{item.Employee?.Name}</TableCell>
                                                <TableCell align="center">{moment(item.DateTime).format("DD/MM/YYYY")}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Container>
                </div>

            </Container>

        </div>

    );

}


export default EquipmentListShow;