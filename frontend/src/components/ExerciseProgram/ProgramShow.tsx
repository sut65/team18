import { Box, Button, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function ProgramShow() {
  return (
    <Box sx={{display: 'flex', m:3}}>
      <Paper elevation={2} style={{width:"100%", textAlign: "center", fontSize:36}}>
        Exercise Program Home
      </Paper>
      <Button
                component={RouterLink}
                size="large"
                to="/program_create"
                variant="contained"
                color="primary"
              >
                <Typography
                  color="secondary"
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  สร้างโปรแกรม
                </Typography>
              </Button>
    </Box>
  )
}
export default ProgramShow;