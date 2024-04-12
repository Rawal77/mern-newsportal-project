import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FormField, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { useSelector } from "react-redux";

export const Create = () => {
  const user = useSelector(state => state.user.value);
  const [form, setForm] = useState({ status: true });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .post("cms/categories", form)
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
              <h1>Add Category</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={5} className="mx-auto">
              <Form onSubmit={handleSubmit}>
                <FormField title="name" label="Name">
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <Form.Control
                  type="text"
                  name="user_id"
                  value={user._id}
                  required
                  hidden
                  onChange={ev => setInForm(ev, form, setForm)}></Form.Control>
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
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
