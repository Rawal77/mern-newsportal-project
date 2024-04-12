import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Layout.css";
import { Container, Row } from "react-bootstrap";
import { CmsMenu } from "./CmsMenu";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <>
      <CmsMenu></CmsMenu>
      <Container>
        <Row>
          <Outlet></Outlet>
        </Row>
      </Container>
    </>
  );
};
