import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { MemberInterface } from "../../models/IMember";
import { EquipmentBookingListInterface } from "../../models/EquipmentBooking/IEquipmentBookingList";
import { GetEquipmentBookingList }from "../../services/HttpClientService";
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
function EquipmentBookingShow() {
    const [member, setMember] = React.useState<MemberInterface>({});
    const [booking, setBooking] = React.useState<EquipmentBookingListInterface[]>([]);


    const getEquipmentBookingList = async (id:any) => {
        let res = await GetEquipmentBookingList(id);
        if (res) {
            setBooking(res);
            console.log(res)
        }
    };

    useEffect(() => {
const getToken = localStorage.getItem("token");
        if (getToken) {
            const x = JSON.parse(localStorage.getItem("lid") || "")
            setMember(x);
            getEquipmentBookingList(x.ID);
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

                                ประวัติการจองอุปกรณ์กีฬา

                            </Typography>
                        </ThemeProvider>
                    </Box>
                    <Box>
                        <ThemeProvider theme={theme}>
                        <Stack direction="column-reverse" spacing={2}>
                            <Button component={RouterLink} to="/equipment_booking"
                                variant="outlined" size="medium" color="primary"
                            >
                                <Typography
                                    color="pimary"
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1 }}
                                >
                                    จองอุปกรณ์กีฬา

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
                                            <TableCell align="center" width="20%"> ชื่อผู้จอง </TableCell>
                                            <TableCell align="center" width="20%"> รายละเอียด </TableCell>
                                            <TableCell align="center" width="20%"> วันที่รับอุปกรณ์ </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {booking.map((item: EquipmentBookingListInterface) => (
                                            <TableRow key={item.ID}>
                                                <TableCell align="center">{item.ID}</TableCell>
                                                <TableCell align="center">{item.Member?.Name}</TableCell>
                                                <TableCell align="center">{item.EquipmentList?.Detail}</TableCell>
                                                <TableCell align="center">{moment(item.DateBooking).format("DD/MM/YYYY")}</TableCell>

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


export default EquipmentBookingShow;