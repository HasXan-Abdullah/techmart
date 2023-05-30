import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../Auth/ForgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import picture from "../Auth/Images/forgotpass.png"
 
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
            {  email, newPassword, answer }
          );
          if (res && res.data.success) {
            toast.success(res.data.message);
            navigate("/login");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong.");
        }
      };


  return (
    <Layout title={"Forgot Password - TechMart"}>
        <div className="row mt-5 mb-5">
        <div className=" col-md-6 form-container">
          <div className="register">
            <h2 className="nunito-b">Forgot Your Password?</h2>
            <p>No problem. Reset it with a new one.</p>
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder="What is your favourite subject?"
                  required
                />
              </div>
              <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary">
                RESET PASSWORD
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
  )
}

export default ForgotPassword
