import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fromStorage, removeStorage } from "../lib";
import { clearUser, setUser } from "../store";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import http from "../http";

export const TopNav = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length == 0) {
      const token = fromStorage("fronttoken");
      if (token) {
        http
          .get("profile/detail")
          .then(({ data }) => {
            dispatch(setUser(data));
          })
          .catch(err => {
            removeStorage("fronttoken");
            navigate("/");
          });
      } else {
        navigate("/");
      }
    }
  }, [user]);
  const handleLogout = () => {
    removeStorage("fronttoken");
    dispatch(clearUser());
  };
  return (
    <ul className="top-nav display-5 d-flex text-dark">
      {Object.keys(user).length ? (
        <>
          <li className="py-2" style={{ marginTop: 0.8 }}>
            <Link to="/profile" style={{ fontSize: 18 }} className="text-dark">
              <i className="fas fa-user-circle me-2"></i>
              {user.name}
            </Link>
          </li>
          <h4 className="my-1 m-0 p-0">|</h4>
          <li style={{ marginTop: 0 }}>
            <Button
              style={{ fontSize: 18 }}
              variant="link"
              className="link-dark text-decoration-none"
              onClick={handleLogout}>
              <small>
                <i className="fa-solid fa-sign-out-alt me-2"></i>LogOut
              </small>
            </Button>
          </li>
        </>
      ) : (
        <ul className="text-dark d-flex">
          <li className="p-2">
            <Link to="register" style={{ fontSize: 16 }} className="text-dark">
              <i className="fas fa-user-edit me-2 text-dark"></i>Register
            </Link>
          </li>
          <h4 className="my-1 m-0 p-0">|</h4>
          <li className="p-2">
            <Link to="login" style={{ fontSize: 16 }} className="text-dark">
              <i className="fas fa-sign-in-alt me-2 text-dark"></i>Login
            </Link>
          </li>
        </ul>
      )}
    </ul>
  );
};
