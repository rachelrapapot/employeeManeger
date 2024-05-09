import React from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, watch } = useForm(); // Use watch for field state
  const nav = useNavigate();

  const onSubmit = (data) => {
    const { firstName, lastName, password } = data;
    axios.post("https://localhost:7103/api/Auth", { firstName, lastName, password })
      .then((response) => {
        console.log("Login successful");
        sessionStorage.setItem('token', response.data.token);
        nav('All'); // Redirect to 'All' page after successful login
      })
      .catch((error) => {
        console.error("Error logging in: ", error);
        alert("The username or password is incorrect");
        nav('All');// רק בשביל בדיקה
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: 50 }}>
      <Paper elevation={3} style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" align="center" gutterBottom style={{ color: '#333333' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                {...register("firstName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                {...register("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                type="password"
                {...register("password")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20, backgroundColor: 'red', color: '#ffffff' }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
