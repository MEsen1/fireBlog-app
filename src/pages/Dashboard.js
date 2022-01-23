import { Container, Col, Row } from "react-bootstrap";

import { useBlog } from "../contexts/BlogContext";
import Loading from "../assets/loading.gif";

import BlogCard from "../components/BlogCard";

const DashBoard = () => {
  const { currentBlogs } = useBlog();
  //currentBlogs.map((item, id) => console.log(`item = ${item.id} and id ${id}`));
  return (
    <Container>
      <Row className="mx-5 d-flex justify-content-center">
        {currentBlogs === undefined ? (
          <img src={Loading} alt="loading"></img>
        ) : currentBlogs ? (
          currentBlogs?.map((item, id) => (
            <Col
              className="d-flex mb-3 mt-3 justify-content-center align-items-center"
              sm={12}
              lg={6}
              xl={4}
              key={id}
            >
              <BlogCard post={item} />
            </Col>
          ))
        ) : (
          <h3>No data available</h3>
        )}
      </Row>
    </Container>
  );
};

export default DashBoard;
