import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../Auth/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import picture from "../Auth/Images/vectorsignup.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [seller, setSeller] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${'http://localhost:8080'}/api/v1/auth/register`,
        { name, email, password, phone, address, answer, role: 0 }
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

  // const handleButtonClick = (type) => {
  //   if (type === "Seller") {
  //     setSeller(true);
  //   } else {
  //     setSeller(false);
  //   }
  //   setButtonClicked(true);
  // };

  return (
    <Layout title={"Sign Up - TechMart"}>
      <div className="row mt-5 mb-5">
        <div className="col-md-6 bg-purple-reg register">
          <img src={picture} alt="signup vector" width={380} height={380} />
        </div>
        <div className=" col-md-6 form-container">
          {/* {!buttonClicked ? (
            <div className="button-container">
              <button
                onClick={() => handleButtonClick("Seller")}
                className="btn btn-primary"
              >
                Sign Up as Seller
              </button>
              <button
                onClick={() => handleButtonClick("Buyer")}
                className="btn btn-primary"
              >
                Sign Up as Buyer
              </button>
            </div>
          ) : ( */}
            <div className="register">
              <h2 className="nunito-b">SIGN UP</h2>
              <p>Get started with a free account.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Name"
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="exampleInputAnswer"
                    placeholder="What is your favourite subject?"
                    required
                  />
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          {/* )} */}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
