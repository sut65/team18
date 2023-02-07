import * as React from "react";

import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import { green } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: green[400],
//     },
//     secondary: {
//       main: '#e8f5e9',
//     },
//   },
// });
const theme = createTheme({
  palette: {
    primary: {
      main: "#FEAC3F",
    },
    secondary: {
      main: "#ffebee",
    },
    text: {
      primary: "#1B2420",
      secondary: "#1B2420",
    },
  },
});

const signout = () => {
  localStorage.clear();
  window.location.href = "/";
};

function NavbarEmployee() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              color="secondary"
              sx={{ flexGrow: 1 }}
            >
              ระบบบันทึกข้อมูลพนักงาน
            </Typography>

            <Button color="inherit" onClick={signout}>
              <Typography
                variant="h6"
                component="div"
                color="secondary"
                sx={{ flexGrow: 1 }}
              >
                ออกจากระบบ
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}

export default NavbarEmployee;
