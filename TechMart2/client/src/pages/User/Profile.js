import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, oldPassword, newPassword, phone, address }
      );
      console.log("🚀 ~ file: Profile.js:32 ~ handleSubmit ~ data:", data);
      if (data?.error) {
        toast.error(data?.error);
      } else if (data.message.includes("To update new")) {
        toast.error("Please Enter correct Old Password");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <Layout title={"Profile - TechMart"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="row ">
              <div className=" col-md-6 form-container">
                <div className="register">
                  <h2 className="nunito-b">User Profile</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="exampleInputName"
                        placeholder="Name"
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
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="form-control"
                        placeholder="Old Password"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="form-control"
                        placeholder="New Password"
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
                      />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
