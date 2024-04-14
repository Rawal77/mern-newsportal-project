import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../http";

export const FrontNav = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    http.get("category").then(({ data }) => {
      setCategories(data);
    });
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white col-12">
      <button
        className="navbar-toggler d-lg-none border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <NavDropdown title="Categories">
              {categories.map(category => (
                <Link
                  className="dropdown-item"
                  key={category._id}
                  to={`/category/${category._id}`}>
                  {category.name}
                </Link>
              ))}
            </NavDropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};
