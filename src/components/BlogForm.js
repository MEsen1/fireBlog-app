import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const BlogForm = (props) => {
  const { blog, handleBlog } = props;
  //!blog ile gelen bilgiyi yeni newBlog state map ettik
  const [newBlog, setNewBlog] = useState(blog);
  //!same principle in update blog to get the data every render
  useEffect(() => {
    setNewBlog(blog);
  }, [blog]);
  return (
    <form onSubmit={() => handleBlog(newBlog)}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <TextField
            variant="outlined"
            fullWidth
            required
            id="title"
            label="Title"
            name="title"
            value={newBlog.title}
            autoFocus
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-multiline-flexible"
            label="Image URL"
            maxRows={2}
            autoFocus
            value={newBlog.image}
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={8}
            label="Content"
            value={newBlog.content}
            id="outlined-multiline-static"
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
