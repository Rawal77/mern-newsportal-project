import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FormField, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

export const Create = () => {
  const [form, setForm] = useState({ status: true });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .post("cms/visitors", form)
      .then(() => navigate("/visitors"))
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
              <h1>Add Visitor</h1>
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
                <FormField title="email" label="Email">
                  <Form.Control
                    type="text"
                    name="email"
                    id="email"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="password" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="confirm_password" label="Confirm Password">
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="phone" label="Phone">
                  <Form.Control
                    type="text"
                    name="phone"
                    id="phone"
                    required
                    onChange={ev =>
                      setInForm(ev, form, setForm)
                    }></Form.Control>
                </FormField>
                <FormField title="address" label="Address">
                  <Form.Control
                    as="textarea"
                    name="address"
                    id="address"
                    required
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
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
