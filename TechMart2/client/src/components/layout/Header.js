import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../style/Header.css";
import { useAuth } from "../../Context/auth";
import { useCart } from "../../Context/cart";
import { Badge } from "antd";
import toast from "react-hot-toast";
import SearchForm from "../Form/SearchForm";
import useCategory from "./../../hooks/useCategory";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    toast.success("Logout Successfully!");
  };
  return (
    <>
      <nav className="navbar poppins navbar-expand-lg bg-light ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand logo-name ms-2">
              {/* <img src="Union.png" alt="logo" className="logo-img me-2" /> */}
              TECHMART
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              {(auth?.user?.role === 0 || auth?.user === null) && (
                <SearchForm />
              )}
              {auth?.user?.role === 0 && (
                <li className="nav-item">
                  <NavLink to="/" className="nav-link ">
                    Home
                  </NavLink>
                </li>
              )}
              {/* <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}{" "}
                </ul>
              </li> */}

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {(auth?.user?.role === 0 || auth?.user === null) && (
                <li className="nav-item">
                  <Badge count={cart?.length} showZero>
                    <NavLink to="/cart" className="nav-link">
                      <BsCart4 className="mt-1" size={30} color="3a174f" />
                    </NavLink>
                  </Badge>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
