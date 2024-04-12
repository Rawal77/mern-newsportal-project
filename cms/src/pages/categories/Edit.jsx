import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FormField, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";

export const Edit = () => {
  const [form, setForm] = useState({ status: false });
  const [loading, setLoading] = useState(false);
  const [laodingpage, setLoadingPage] = useState(false);
  const [user, setUser] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingPage(true);
    http
      .get(`cms/categories/${params.id}`)
      .then(({ data }) => setUser(data))
      .catch(err => {})
      .finally(() => setLoadingPage(false));
  }, []);

  useEffect(() => {
    if (Object.keys(user).length) {
      setForm({
        name: user.name,
        status: user.status,
      });
    }
  }, [user]);

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .patch(`cms/categories/${params.id}`, form)
      .then(() => navigate("/categories"))
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col lg={5} className="mx-auto">
              <h1>Edit Category</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={5} className="mx-auto">
              {laodingpage ? (
                <Loading></Loading>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <FormField title="name" label="Name">
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      required
                      defaultValue={form.name}
                      onChange={ev =>
                        setInForm(ev, form, setForm)
                      }></Form.Control>
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
