import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { MemberInterface } from "../../models/IMember";




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
function MemberShow() {

  const [members, setMembers] = React.useState<MemberInterface[]>([]);


  const getMembers = async () => {

    const apiUrl = "http://localhost:8080/members";

    const requestOptions = {

      method: "GET",

      headers: { "Content-Type": "application/json" },

      //  headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },

    };


    fetch(apiUrl, requestOptions)

      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {

        console.log(res.data);

        if (res.data) {

          setMembers(res.data);

        }

      });

  };

  useEffect(() => {

    getMembers();

  }, []);


  return (

    <div>

      <Container maxWidth="md">

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

                variant="h6"

                color="primary"

                gutterBottom

              >

                ข้อมูลสมาชิก

              </Typography>
            </ThemeProvider>
          </Box>

          <Box>
            <ThemeProvider theme={theme}>
              <Button
                component={RouterLink}

                size="large"

                to="/Membercreate"

                variant="contained"

                color="primary"

              >

                <Typography

                  color="secondary"

                  variant="h6"

                  component="div"

                  sx={{ flexGrow: 1 }}
                >
                  แก้ไขข้อมูลสมาชิก

                </Typography>
              </Button>
            </ThemeProvider>
          </Box>

        </Box>
        <div>
          <Container maxWidth="md">
            <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
              <TableContainer >
                <Table aria-label="simple table">
                  <TableHead>
                    {/* หัวข้อตาราง */}
                    <TableRow>
                      <TableCell align="center" width="20%"> ID </TableCell>
                      <TableCell align="center" width="20%"> Name </TableCell>
                      <TableCell align="center" width="20%"> Email </TableCell>
                      <TableCell align="center" width="20%"> Password </TableCell>
                      <TableCell align="center" width="20%"> Birth Day </TableCell>
                      <TableCell align="center" width="20%"> Age </TableCell>
                      <TableCell align="center" width="20%"> Gender </TableCell>
					            <TableCell align="center" width="20%"> Type </TableCell>
					            <TableCell align="center" width="20%"> Evidence </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {members.map((item: MemberInterface) => (
                      <TableRow key={item.ID}>
                        <TableCell align="center">{item.ID}</TableCell>
                        <TableCell align="center">{item.Name}</TableCell>
						            <TableCell align="center">{item.Email}</TableCell>
						            <TableCell align="center">{item.Password}</TableCell>
                        <TableCell align="center">{moment(item.Bdate).format("DD/MM/YYYY")}</TableCell>
						            <TableCell align="center">{item.Age}</TableCell>
						            <TableCell align="center">{item.Gender?.Gtype}</TableCell>
                        <TableCell align="center">{item.Typem?.Ttypem}</TableCell>
                        <TableCell align="center">{item.Evidence?.Etype}</TableCell>
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


export default MemberShow;