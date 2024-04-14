import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Layout.css";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { FrontNav } from "./FrontNav";
import { useEffect, useState } from "react";
import http from "../http";
import { TopNav } from "./TopNav";
export const Layout = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (term.length) {
      navigate(`/search?term=${term}`, {
        replace: true,
      });
    }
  }, [term]);
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-12">
          <header className="row">
            <div className="col-12 bg-white pt-4">
              <div className="row">
                <div className="col-lg-auto">
                  <div className="site-logo text-center text-lg-left">
                    <Link to="/">News Buzz</Link>
                  </div>
                </div>
                <div className="col-lg-5 mx-auto mt-4 mt-lg-0">
                  <form action="#">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control border-dark"
                          placeholder="Search..."
                          onChange={ev => setTerm(ev.target.value)}
                          required
                        />
                        <button className="btn btn-outline-dark">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-auto text-center text-lg-left header-item-holder">
                  {/*   <ul className="top-nav bg-secondary text-dark"></ul> */}
                  <TopNav></TopNav>
                </div>
              </div>

              <FrontNav></FrontNav>
            </div>
          </header>
        </div>

        <Outlet></Outlet>

        <div className="col-12 align-self-end">
          <footer className="row">
            <div className="col-12 bg-white text-dark pb-3 pt-5">
              <div className="col-12 text-center  m-0 p-0">
                <p className=" fst-bold" style={{ fontSize: 25 }}>
                  The Daily Buzz <br />
                  Copyright &copy; 2024
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
