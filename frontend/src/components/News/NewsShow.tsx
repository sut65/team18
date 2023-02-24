import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Collapse, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { MemberInterface } from "../../models/IMember";
import { NotifyInterface } from "../../models/INotify";
import { ListNotifybyMember } from "../../services/NotifyHttpCS";
import CampaignIcon from '@mui/icons-material/Campaign';
import { GetNewsMbyDate } from "../../services/NewsHttpClientService";
import { NewsInterface } from "../../models/INews/INews";
import cen from './../../image/cen.jpg';
import Link from '@mui/material/Link';



import IconButton from '@mui/material/IconButton';


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




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
function NewsShow() {
    const [news, setNews] = React.useState<NewsInterface[]>([]);

    const getNews = async (id: any) => {
        let res = await GetNewsMbyDate(id);
        if (res) {
            setNews(res);
            console.log(res)
        }
    };



    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            const x = JSON.parse(localStorage.getItem("uid") || "")
            getNews(x);
        }
    }, []);

    const Row = (props: { row: ReturnType<typeof NewsShow> }) => {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
    }


    return (

        <div>
    

            <Container maxWidth="xl" sx={{ width: "100%", marginRight: "20" ,alignItems: "center"}}>

                <Box

                    display="flex"

                    sx={{

                        marginTop: 2,

                    }}

                >


                    <Box flexGrow={1}>
                        <ThemeProvider theme={theme}>
                            <Typography
                               fontFamily= 'Prompt'
                                component="h2"
                                variant="h4"
                                align="center"
                                gutterBottom
                            >

                                ข่าวสารประชาสัมพันธ์

                            </Typography>
                        </ThemeProvider>
                    </Box>

                </Box>
                <Divider />
                <div>
                    <Container maxWidth="lg" >
                        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
                            <TableContainer >
                                <Table aria-label="simple table">

                                    <TableBody>
                                        {news?.map((item: NewsInterface) => (
                                            <TableRow key={item.ID}>
                                                <TableCell align="center" width="20%">
                                                    <CampaignIcon style={{ color: "#ffd54f", fontSize: '70px', }} />
                                                </TableCell>
                                                <TableCell align="left" width="40%">
                                                    <Grid container spacing={3} sx={{ padding: 2 }}>
                                                        <Grid item xs={6} >
                                                            <Typography
                                                               fontFamily= 'Prompt'
                                                                component="h2"
                                                                variant="h6"
                                                            >
                                                                {item.Headline}
                                                            </Typography>
                                                            <Grid item xs={6} >

                                                                {moment(item.SDate).format("DD/MM/YYYY")}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell align="center" width="20%">
                                                    <Link
                                                        fontFamily= 'Prompt'
                                                        component="button"
                                                        underline="hover"
                                                        variant="body2"
                                                        onClick={() => {
                                                            localStorage.setItem("news", JSON.stringify(item.ID));
                                                            window.location.href = "/news_shows";

                                                        }}
                                                    >
                                                        อ่านเพิ่มเติม
                                                    </Link>
                                                </TableCell>
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


export default NewsShow;