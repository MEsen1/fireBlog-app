import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { CardActionArea } from "@mui/material";
import { toastErrorNotify } from "../helpers/toastNotify";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";

export default function BlogCard({ post }) {
  //!props will come from firebase we created

  const {
    id,
    author,
    content,
    get_comment_count,
    get_like_count,
    image,
    published_date,
    title,
  } = post;

  const { currentUser } = useAuth();
  const { currentBlogs } = useBlog();

  const navigate = useNavigate();
  const openDetails = () => {
    if (!currentUser) {
      toastErrorNotify("Please login to get the details");
    }
    console.log(`current id is ${id}`);
    navigate(`/details/${id}`);
  };

  return (
    <Container>
      <Row className="mx-5 justify-content-md-center">
        <Col
          className="d-flex mb-3 mt-3 justify-content-center align-items-center"
          sm={12}
        >
          <Card sx={{ maxWidth: 800 }}>
            <CardActionArea onClick={openDetails}>
              <CardMedia component="img" image={image} title={title} />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content}
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
    </Container>
  );
}
