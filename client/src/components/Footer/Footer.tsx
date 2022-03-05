import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Footering = () => (
    <footer>
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}></Grid>
            </Grid>
        </Container>
    </footer>
);

export default Footering;