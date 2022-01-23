import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Grid, ButtonBase } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        "& > :not(style)": {
          m: 3,
          width: 300,
          height: 300,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}
      >
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={1}>
              <ButtonBase
                sx={{ width: 128, height: 128 }}
                onClick={() => navigate("/")}
              >
                <img
                  style={{
                    margin: "auto",
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  alt="complex"
                  src="https://mui.com/static/images/grid/complex.jpg"
                />
              </ButtonBase>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={1}>
              <Typography variant="h2">Profile</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={1}>
              <Typography variant="h6">{`Display Name : ${currentUser.displayName}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
