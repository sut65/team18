import * as React from 'react';
import { Box } from "@mui/system";
import logo3 from "../image/logo3.png"
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Button, createTheme, Stack, ThemeProvider } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
// import logo3 from './../../image/logo3.png';
// import bg from "../assets/bg.png"


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


function MenuShow() {

    return (
        <ThemeProvider theme={theme}>
            <div>
                                <Box
                    sx={{
                        width: 'auto',
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: '#FEAC3F',


                    }}
                >
                    <div id='from-page' className='form-page'>
                        <div id='from-frame' className='from-frame'>
                            <div id="logo" className='logo'>
                            <Box
                                sx={{
                                    width: 400,
                                    height: 400,
                                    backgroundColor: 'primary',
                                    backgroundSize: "cover",
                                    backgroundImage: `url(${logo3})`,
                                }}
                            >
                            </Box>
                            </div>

                            <Stack direction="column" spacing={3}>
                                <Button component={RouterLink} to="/login" variant="outlined" color="secondary" size="large"
                                    startIcon={<PersonIcon />}>
                                    Sign In
                                </Button>
                                <Button component={RouterLink} to="/MemberCreate" variant="outlined" color="secondary" size="large"
                                    startIcon={<PersonAddAlt1Icon />}>
                                    Sign Up
                                </Button>
                                <Button component={RouterLink} to="/EmployeeCreate" variant="outlined" color="secondary" size="large"
                                    startIcon={<PersonAddAlt1Icon />}>
                                    Employee
                                </Button>
                                <Button component={RouterLink} to="/ScheduleCreate" variant="outlined" color="secondary" size="large"
                                    startIcon={<PersonAddAlt1Icon />}>
                                    Schedule
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default MenuShow;

