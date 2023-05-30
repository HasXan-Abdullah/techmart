import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../Auth/Login.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import picture from "../Auth/Images/loginvector.png";
import { useAuth } from "../../Context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${'http://localhost:8080'}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        console.log(
          "🚀 ~ file: Login.js:34 ~ handleSubmit ~ res.data.user.role:",
          res.data.user.role
        );
        if (res?.data?.user?.role === 1) {
          navigate("/dashboard/admin");
        } else {
          navigate(location.state || "/");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout title={"Login - TechMart"}>
      <div className="row mt-5 mb-5">
        <div className=" col-md-6 form-container">
          <div className="register">
            <h2 className="nunito-b">LOGIN</h2>
            <p>Welcome Back.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <button
                  type="button"
                  className="btn ms-4 btn-primary"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 bg-purple register">
          <img src={picture} alt="signup vector" width={380} height={380} />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
