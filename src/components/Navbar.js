import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(location.pathname )
  // }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Datos
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/pricing" ? "active" : ""}`} to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled">Disabled</Link>
            </li>
          </ul>
        </div>

        <div className="float-right">
          {!localStorage.getItem("token") ? (
            <>
              {" "}
              <Link className="btn btn-outline-secondary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-outline-secondary mx-2" to="/signup" role="button">
                Sign up
              </Link>{" "}
            </>
          ) : (
            <button className="btn btn-outline-secondary mx-2" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};
