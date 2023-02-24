import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { MemberInterface } from "../../models/IMember";
import { NotifyInterface } from "../../models/INotify";
import ConstructionIcon from '@mui/icons-material/Construction';



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
function NotifyShowad() {

    const [notifys, setNotifys] = React.useState<NotifyInterface[]>([]);


    const getNotifys = async () => {

        const apiUrl = "http://localhost:8080/notifys";

        const requestOptions = {

            method: "GET",

            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },

        };


        fetch(apiUrl, requestOptions)

            .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

            .then((res) => {

                console.log(res.data);

                if (res.data) {

                    setNotifys(res.data);

                }

            });

    };

    useEffect(() => {

        getNotifys();

    }, []);


    return (

        <div>

            <Container maxWidth="xl">

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

                                align="center"

                                color="primary"
                                
                                fontFamily= 'Prompt'
                                

                                gutterBottom

                            >

                                ข้อมูลการแจ้งอุปกรณ์ที่ชำรุด

                            </Typography>
                        </ThemeProvider>
                    </Box>
                </Box>
                <div>
                    <Container maxWidth="lg" sx={{ bgcolor: '#ffecb3' }}>
                        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
                            <TableContainer >
                                <Table aria-label="simple table" >
                                    <TableHead >
                                        {/* หัวข้อตาราง */}
                                        <TableRow >
                                            <TableCell align="center" width="5%"> ID </TableCell>
                                            <TableCell align="center" width="20%"> ชื่อผู้แจ้งข้อมูล </TableCell>
                                            <TableCell align="center" width="15%"> ชนิดของอุปกรณ์ </TableCell>
                                            <TableCell align="center" width="15%"> รหัสของอุปกรณ์ </TableCell>
                                            <TableCell align="center" width="20%"> วันที่แจ้ง </TableCell>
                                            <TableCell align="center" width="30%"> ปัญหาพบ </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {notifys.map((item: NotifyInterface) => (
                                            <TableRow key={item.ID}>
                                                <TableCell align="center">{item.ID}</TableCell>
                                                <TableCell align="center">{item.Member?.Name}</TableCell>
                                                <TableCell align="center">{item.RunNumber?.Number}</TableCell>
                                                <TableCell align="center">{item.EquipmentName?.Name}</TableCell>
                                                <TableCell align="center">{moment(item.Ddate).format("DD/MM/YYYY")}</TableCell>
                                                <TableCell align="center">{item.Problem}</TableCell>

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


export default NotifyShowad;