import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

export default function Home({role} : any) {
  return (
    <Container>
        <Grid container spacing={3}>
            <Grid item xs={12} textAlign="center">
                <h1>
                    ยินดีต้อนรับเข้าสู่ระบบในฐานะ {role}
                </h1>
                
            </Grid>
        </Grid>
    </Container>
  )
}