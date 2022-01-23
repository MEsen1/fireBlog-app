import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SignUp from "../assets/sing-up.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../contexts/AuthContext";
import { useBlog } from "../contexts/BlogContext";
import BlogForm from "../components/BlogForm";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

const NewBlog = () => {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addBlog } = useBlog();
  //!react-hook-forms we passed the rules to react hhok form using yupresolver
  const handler = (newBlog) => {
    try {
      addBlog(newBlog);
      navigate("/");
    } catch (error) {}
  };

  const blog = {
    author: currentUser.email,
    title: "",
    content: "",
    get_like_count: 0,
    get_share_count: 0,
    image: "",
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
          New Blog
        </Typography>
        <BlogForm blog={blog} handleBlog={handler} />
      </Box>
    </Container>
  );
};

export default NewBlog;
