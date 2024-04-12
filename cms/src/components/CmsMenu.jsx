import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { removeStorage } from "../lib";
import { clearUser } from "../store";

export const CmsMenu = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const handleLogout = ev => {
    removeStorage("cmstoken");
    dispatch(clearUser());
  };
  return Object.keys(user).length ? (
    <Navbar variant="light" bg="light" expand="lg" xs={12}>
      <Container>
        <Link className="navbar-brand" to="/">
          E-com
        </Link>
        <Navbar.Toggle></Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="me-auto mb-2 mb-lg-0">
            {user.type == "Admin" ? (
              <Nav.Item>
                <NavLink className="nav-link" to="/journalist">
                  <i className="fa-solid fa-users me-2"></i>Journalist
                </NavLink>
              </Nav.Item>
            ) : null}
            {user.type == "Visitor" ? null : (
              <Nav.Item>
                <NavLink className="nav-link" to="/visitors">
                  <i className="fa-solid fa-user-group me-2"></i>Visitors
                </NavLink>
              </Nav.Item>
            )}
            {user.type == "Admin" ? (
              <Nav.Item>
                <NavLink className="nav-link" to="/categories">
                  <i className="fa-solid fa-th-list me-2"></i>Categories
                </NavLink>
              </Nav.Item>
            ) : null}
            {user.type == "Visitor" ? null : (
              <Nav.Item>
                <NavLink className="nav-link" to="/posts">
                  <i className="fa-solid fa-gifts me-2"></i>Posts
                </NavLink>
              </Nav.Item>
            )}
            {user.type == "Visitor" ? null : (
              <Nav.Item>
                <NavLink className="nav-link" to="/reviews">
                  <i className="fa-solid fa-comments me-2"></i>Reviews
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
          <Nav className="mb-2 mb-lg-0">
            <NavDropdown
              title={
                <>
                  <i className="fa-solid fa-user-circle me-2"></i>
                  {user.name}
                </>
              }
              id="basic-nav-dropdown"
              align="end">
              <Link to="/profile/edit" className="dropdown-item">
                <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
              </Link>
              <Link to="/profile/password" className="dropdown-item">
                <i className="fa-solid fa-asterisk me-2"></i>Change Password
              </Link>
              <NavDropdown.Divider></NavDropdown.Divider>
              <Button
                variant="link"
                className="dropdown-item rounded-0"
                onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt me-2"></i>Log Out
              </Button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : null;
};
