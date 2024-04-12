import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FormField, Loading, SubmitBtn } from "../../components";
import { imgUrl, setInForm } from "../../lib";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { confirmAlert } from "react-confirm-alert";

export const Edit = () => {
  const [post, setPost] = useState({});
  const [form, setForm] = useState({ status: true, featured: false });
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingPage(true);
    http
      .get("cms/categories")
      .then(({ data }) => {
        setCategories(data);
        return http.get(`cms/posts/${params.id}`);
      })
      .then(({ data }) => setPost(data))
      .catch(err => {})
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(post).length) {
      setForm({
        title: post.title,
        description: post.description,
        category_id: post.category_id,
        status: post.status,
        featured: post.featured,
      });
    }
  }, [post]);

  useEffect(() => {
    if (form.images && form.images.length) {
      let list = [];
      let i = 0;
      for (let image of form.images) {
        list.push(
          <Col lg={4} key={i++} className="mt-3">
            <img src={URL.createObjectURL(image)} className="img-fluid" />
          </Col>
        );
      }
      setImgPreview(list);
    }
  }, [form.images]);

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);

    const fd = new FormData();

    for (let k in form) {
      if (k == "images") {
        for (let image of form.images) {
          fd.append(k, image);
        }
      } else {
        fd.append(k, form[k]);
      }
    }
    http
      .patch(`cms/posts/${params.id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => navigate("/posts"))
      .catch(err => {})
      .finally(() => setLoading(false));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleDelete = filename => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this item",
      buttons: [
        {
          label: "Yes",
          style: { backgroundColor: "var(--bs-danger)" },
          onClick: () => {
            setLoadingPage(true);
            http
              .delete(`cms/posts/${params.id}/image/${filename}`)
              .then(() => http.get(`cms/posts/${params.id}`))
              .then(({ data }) => setPost(data))
              .catch(err => {})
              .finally(() => setLoadingPage(false));
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
            <Col lg={5} className="mx-auto">
              <h1>Edit Post</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mx-auto">
              {loadingPage ? (
                <Loading></Loading>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <FormField title="title" label="Title">
                    <Form.Control
                      type="text"
                      name="title"
                      id="name"
                      required
                      defaultValue={form.title}
                      onChange={ev =>
                        setInForm(ev, form, setForm)
                      }></Form.Control>
                  </FormField>

                  <FormField title="description" label="Description">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={form.description}
                      onChange={data =>
                        setForm({
                          ...form,
                          description: data,
                        })
                      }></ReactQuill>
                  </FormField>

                  <FormField title="images" label="Images">
                    <Form.Control
                      type="file"
                      name="images"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={ev =>
                        setForm({
                          ...form,
                          images: ev.target.files,
                        })
                      }></Form.Control>

                    {imgPreview.length ? (
                      <Row> {imgPreview.map(image => image)} </Row>
                    ) : null}
                    <Row>
                      {post.images &&
                        post.images.map((image, i) => (
                          <Col lg={4} key={i} className="mt-3">
                            <Row>
                              <Col xs={12}>
                                <img
                                  src={imgUrl(image)}
                                  className="img-fluid"
                                />
                              </Col>
                              <Col xs={12} className="mt-3 text-center">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(image)}>
                                  <i className="fa-solid fa-trash me-2"></i>
                                  Delete
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                    </Row>
                  </FormField>
                  <FormField title="category_id" label="Category">
                    <Form.Select
                      name="category_id"
                      id="category_id"
                      required
                      value={form.category_id}
                      onChange={ev => setInForm(ev, form, setForm)}>
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FormField>

                  <FormField title="status" label="Status">
                    <br />
                    <Switch
                      name="status"
                      id="status"
                      checked={form.status}
                      onChange={ev => {
                        setForm({
                          ...form,
                          status: !form.status,
                        });
                      }}></Switch>
                  </FormField>

                  <FormField title="featured" label="Featured">
                    <br />
                    <Switch
                      name="featured"
                      id="featured"
                      checked={form.featured}
                      onChange={ev => {
                        setForm({
                          ...form,
                          featured: !form.featured,
                        });
                      }}></Switch>
                  </FormField>
                  <div className="mb-3">
                    <SubmitBtn loading={loading}></SubmitBtn>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
