import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SignUp from "../assets/sing-up.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useBlog } from "../contexts/BlogContext";
import BlogForm from "../components/BlogForm";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

const UpdateBlog = () => {
  const { updateBlog, getOneBlog } = useBlog();
  const navigate = useNavigate();

  //!usePArams react router v6
  //!match react router v5
  const { id } = useParams();

  const currentBlog = getOneBlog(id);
  
   
  const res = useMemo(() => {
    return currentBlog ? currentBlog[0] : { title: "", content: "", image: "" };
  }, [currentBlog]);
  
  //const res = currentBlog
  //  ? currentBlog[0]
  //  : { title: "", content: "", image: "" };
  
  const [updatedBlog, setUpdatedBlog] = useState(res);

  //!useeffect every time we refresh page we render, we need to get details
  useEffect(() => {
    setUpdatedBlog(res);
  }, [res]);

  const handler = (blogToUpdate) => {
    try {
      updateBlog(res?.id, blogToUpdate);
      navigate("/");
      toastSuccessNotify("Blog updated");
    } catch (error) {
      toastErrorNotify("Blog cannot be updated");
    }
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
          Update-Blog
        </Typography>
        <BlogForm blog={updatedBlog} handleBlog={handler} />
      </Box>
    </Container>
  );
};

export default UpdateBlog;
