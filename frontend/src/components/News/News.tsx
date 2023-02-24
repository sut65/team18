import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import moment from "moment";
import React, { useEffect } from "react";
import { NewsInterface } from "../../models/INews/INews";
import { GetNewsbys } from "../../services/NewsHttpClientService";
import Link from '@mui/material/Link';
import './News.css';

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

function News() {
    const [news, setNews] = React.useState<Partial<NewsInterface>>({});

    const getNews = async (id: any) => {
        let res = await GetNewsbys(id);
        if (res) {
            setNews(res);
            console.log(res)
        }
    };


    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            getNews(JSON.parse(localStorage.getItem("news") || ""));
        }

    }, []);

    return (

        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" style={{ marginTop: 0 }}>
                <Grid item xs={12} >
                    <Typography
                        fontFamily= 'Prompt'
                        component="h2"
                        variant="h3"
                    >
                        {news.Headline}
                    </Typography >
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={6} >
                            <Typography
                                fontFamily= 'Prompt'
                                component="h2"
                                variant="h6"
                                style={{ color: "#757575" }}
                            >
                                {moment(news.SDate).format("DD/MM/YYYY hh:mm")} - {moment(news.DDate).format("DD/MM/YYYY hh:mm")}
                            </Typography >
                        </Grid>
                        <Grid item xs={6} >
                            <Typography
                                fontFamily= 'Prompt'
                                component="h2"
                                variant="h6"
                                style={{ color: "#757575", float: "right" }}
                            >
                                ผู้เขียน: {news.Employee?.Name}
                            </Typography >
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
            </Container>
            <Container maxWidth="lg" style={{ marginTop: 50 }}>
                <Box sx={{ bgcolor: '#fff8e1', height: '50vh', padding: 2 }}>
                    <Typography
                        fontFamily= 'Prompt'
                        component="h2"
                        variant="h6"
                        style={{ color: "#212121", marginLeft: 25 }}
                    >
                        {news.Body}
                    </Typography >
                </Box>
                <Link
                    component="button"
                    underline="hover"
                    variant="body2"
                    onClick={() => {
                        window.location.href = "/login";
                    }}
                >
                    <Typography
                        fontFamily= 'Prompt'
                        component="h2"
                        variant="h6"
                    >
                        ย้อนกลับ
                    </Typography>
                </Link>
            </Container>
        </ThemeProvider>
    );

}
export default News;
