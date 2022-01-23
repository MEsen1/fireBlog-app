import React, { useState, useEffect } from "react";
import { auth } from "../helpers/firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SignUp from "../assets/sing-up.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import googlePng from "../assets/google.png";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";
const Login = () => {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  //!react-hook-forms we passed the rules to react hhok form using yupresolver
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toastSuccessNotify("Logged in succesfully");
        console.log("succesful");
        navigate("/");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
    // let user = await signInWithEmailAndPassword(
    //   auth,
    //   data.email,
    //   data.password
    // );
    //console.log(user);

    console.log(data.email);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, bgcolor: "secondary.main", width: 300, height: 300 }}
          src={SignUp}
        ></Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete=""
              autoFocus
              {...register("email")}
              error={errors.email ? true : false}
              //onChange={(e) => setEmail(e.target.value)}
            />
            <Typography color="#d32f2f">{errors.email?.message}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={errors.password ? true : false}
              //onChange={(e) => setPassword(e.target.value)}
            />
            <Typography color="#d32f2f">{errors.password?.message}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 8, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "white",
                ":hover": { backgroundColor: "white" },
              }}
            >
              <img src={googlePng} alt="google" style={{ width: 75 }} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
