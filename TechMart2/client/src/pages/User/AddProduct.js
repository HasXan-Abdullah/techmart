import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const AddProduct = () => {
    const navigate = useNavigate();
    let userInfo = localStorage.getItem("auth");
    userInfo = JSON.parse(userInfo);
    console.log(
      "🚀 ~ file: CreateProduct.js:13 ~ CreateProduct ~ user:",
      userInfo?.user?.id
    );
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
  
    // get all categories
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting category.");
      }
    };
    useEffect(() => {
      getAllCategory();
    }, []);
  
    //create product function
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("photo", photo);
        productData.append("category", category);
        productData.append("seller_id", userInfo?.user?.id);
  
        const { data } = axios.post(
          "/api/v1/product/create-product",
          productData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Product Created Successfully.");
          if (userInfo?.user?.role == "1") {
            navigate("/dashboard/admin/products");
          }else{
            navigate("/dashboard/user/my-products");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
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
          <div className="row " >
            <div className=" col-md-6 form-container">
              <div className="">
                <h2 className="nunito-b gernalHeadingtext">Add Product</h2>
           
               
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Product description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="form-control"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Delivery Status"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Post Product
                </button>
              </div>
            </div>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default AddProduct