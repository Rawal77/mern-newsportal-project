import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { imgUrl } from "../../lib";

export const List = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("cms/posts")
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = id => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this item",
      buttons: [
        {
          label: "Yes",
          style: { backgroundColor: "var(--bs-danger)" },
          onClick: () => {
            setLoading(true);
            http
              .delete(`cms/posts/${id}`)
              .then(() => http.get("cms/posts"))
              .then(({ data }) => setPosts(data))
              .catch(err => {})
              .finally(() => setLoading(false));
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Posts</h1>
            </Col>
            <Col xs="auto">
              <Link className="btn btn-dark" to="/posts/create">
                <i className="fa-solid fa-plus me-2"></i>Add Post
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <Loading></Loading>
              ) : (
                <DataTable
                  searchable={[
                    "Title",
                    "Category",
                    "Featured",
                    "Status",
                    "Created At",
                    "Updated At",
                  ]}
                  sortable={[
                    "Title",
                    "Category",
                    "Featured",
                    "Status",
                    "Created At",
                    "Updated At",
                  ]}
                  data={posts.map(post => {
                    return {
                      Title: post.title,
                      Image: (
                        <a href={imgUrl(post.images[0])} target="_blank">
                          <img
                            src={imgUrl(post.images[0])}
                            className="img-sm"></img>
                        </a>
                      ),

                      Category: post.category.name,

                      Featured: post.featured ? "Yes" : "No",
                      Status: post.status ? "Active" : "Inactive",
                      "Created At": moment(post.createdAt).format("lll"),
                      "Updated At": moment(post.updatedAt).format("lll"),
                      Actions: (
                        <>
                          <Link
                            to={`${post._id}/edit`}
                            className="btn btn-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={ev => handleDelete(post._id)}>
                            <i className="fa-solid fa-trash me-2"></i>Delete
                          </Button>
                        </>
                      ),
                    };
                  })}></DataTable>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
