import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { toastSuccessNotify } from "../helpers/toastNotify";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";

//!match coming from the router
const Details = () => {
  const { currentUser } = useAuth();
  const { getOneBlog, deleteOneBlog } = useBlog();
  const navigate = useNavigate();
  //!useparams react router v6
  //!match react router v5
  const { id } = useParams();
  const currentBlog = getOneBlog(id);
  console.log(id);
  const handleUpdate = () => {
    navigate(`/update-blog/${id}`);
  };

  const handleDelete = () => {
    deleteOneBlog(id);
    toastSuccessNotify("Deleted Succesfully");
    navigate("/");
  };

  return (
    <Container>
      <Row className="mx-5 justify-content-md-center">
        <Col
          className="d-flex mb-3 mt-3 justify-content-center align-items-center"
          sm={12}
        >
          <Card sx={{ maxWidth: 800 }}>
            <CardMedia
              component="img"
              image={currentBlog[0].image}
              alt="green iguana"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {currentBlog[0].title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentBlog[0].content}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Col>
      </Row>
      {currentUser?.email && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Details;
