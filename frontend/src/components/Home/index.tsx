import { Grid, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import NewsShow from '../News/NewsShow'
import sportscenter from './../../image/sportscenter.png';
export default function Home({ role }: any) {
  return (
    <div>
      <Grid item xs={12} textAlign="center">
        <Typography
          fontFamily='Anton'
          component="h2"
          variant="h1"
        >
     
            Welcome {role} To Sport Center
        
        </Typography>
      </Grid>
      <Box component="img"
        sx={{

          width: '100%',
          height: '700',
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
        }}
        src={sportscenter}
      />
      <Container sx={{ width: "100%", marginTop: 10, alignItems: "center" }}>

        <NewsShow />
      </Container>
    </div>
  )
}