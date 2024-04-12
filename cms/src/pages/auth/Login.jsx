import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { inStorage, setInForm } from "../../lib";
import { FormField, SubmitBtn } from "../../components";
import http from "../../http";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({});
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);

    http
      .post("auth/login", form)
      .then(({ data }) => {
        console.log(data);
        dispatch(setUser(data.user));
        inStorage("cmstoken", data.token, remember);
        navigate("/");
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        <Col
          md="5"
          lg="4"
          sm="8"
          className="bg-body my-5 py-3 mx-auto shadow-sm rounded-2">
          <Row>
            <Col>
              <h1 className="text-center">Login</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormField title="email" label="Email">
                  <Form.Control
                    type="email"
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

                <div className="mb-3 form-check">
                  <Form.Check.Input
                    value="yes"
                    id="remember"
                    defaultChecked={remember}
                    onClick={ev => setRemember(!remember)}></Form.Check.Input>
                  <Form.Check.Label htmlFor="remember">
                    Remember me
                  </Form.Check.Label>
                  <br />
                </div>

                <div className="mb-3 d-grid">
                  <SubmitBtn
                    label="Log in"
                    icon="fa-sign-in-alt"
                    loading={loading}></SubmitBtn>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
