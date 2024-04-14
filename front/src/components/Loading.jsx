import { Col, Row } from "react-bootstrap";

export const Loading = () => {
  return (
    <Row>
      <Col className="my-3">
        <h5 className="text-center display-4">
          <i className="fa-solid fa-spinner fa-spin me-2"></i>loading
        </h5>
      </Col>
    </Row>
  );
};
