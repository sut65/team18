import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { MemberInterface } from "../../models/IMember";
import { NotifyInterface } from "../../models/INotify";
import { ListNotifybyMember } from "../../services/NotifyHttpCS";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';




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
function NotifyShow() {
    const [member, setMember] = React.useState<MemberInterface>({});
    const [notifies_Member, setNotifies_Member] = React.useState<NotifyInterface[]>([]);


    const listNotifybyMember = async (id: any) => {
        let res = await ListNotifybyMember(id);
        if (res) {
            setNotifies_Member(res);
            console.log(res)
        }
    };



    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            const x = JSON.parse(localStorage.getItem("lid") || "")
            setMember(x);
            listNotifybyMember(x.ID);
        }

    }, []);


    return (

        <div>

            <Container maxWidth="xl" sx={{ width: "100%", marginRight: "20" }}>

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
                                variant="h4"
                                color="primary"
                                fontFamily= 'Prompt'
                                gutterBottom
                            >

                                ประวัติข้อมูลการแจ้งอุปกรณ์ที่ชำรุด

                            </Typography>
                        </ThemeProvider>
                    </Box>
                    <Box>
                        <ThemeProvider theme={theme}>
                            <Stack direction="column-reverse" spacing={2}>
                                <Button component={RouterLink} to="/notify_edit"
                                    size="small"  color="primary"
                                    startIcon={<BuildCircleIcon color="primary" />}
                                >

                                    <Typography
                                        color="primary"
                                        variant="h6"
                                        component="div"
                                        fontFamily= 'Prompt'
                                        sx={{ flexGrow: 1 }}
                                    >
                                        แก้ไขข้อมูลที่เคยแจ้ง

                                    </Typography>
                                </Button>
                                <Button component={RouterLink} to="/notify_create"
                                     size="small" color="primary"
                                     startIcon={<AddCircleIcon color="primary" />}
                                >
                                    <Typography
                                        color="primary"
                                        variant="h6"
                                        component="div"
                                        fontFamily= 'Prompt'
                                        sx={{ flexGrow: 1 }}
                                    >
                                        แจ้งอุปกรณ์ที่ชำรุด

                                    </Typography>
                                </Button>
                            </Stack>
                        </ThemeProvider>
                    </Box>
                </Box>
                <div>
                    <Container maxWidth="lg" sx={{ bgcolor: '#ffecb3' }}>
                        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
                            <TableContainer >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        {/* หัวข้อตาราง */}
                                        <TableRow>
                                            <TableCell align="center" width="5%"> ID </TableCell>
                                            <TableCell align="center" width="20%"> ชื่อผู้แจ้งข้อมูล </TableCell>
                                            <TableCell align="center" width="20%"> ชนิดของอุปกรณ์ </TableCell>
                                            <TableCell align="center" width="20%"> รหัสของอุปกรณ์ </TableCell>
                                            <TableCell align="center" width="20%"> วันที่แจ้ง </TableCell>
                                            <TableCell align="center" width="50%"> ปัญหาที่พบ </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {notifies_Member.map((item: NotifyInterface) => (
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


export default NotifyShow;