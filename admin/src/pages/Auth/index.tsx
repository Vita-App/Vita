import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Auth = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h4" mb={3}>
        Sign in
      </Typography>
      <Card elevation={6} sx={{ mt: "auto" }}>
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Email" />
            <TextField label="Password" />
          </Stack>
          <CardActions>
            <Button variant="contained" color="error">
              Sign in
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Auth;
