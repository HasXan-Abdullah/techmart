import React, { useEffect, useState } from "react";
import Layout from "./../components/layout/Layout.js";
import { useAuth } from "../Context/auth.js";
import { useCart } from "../Context/cart.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "./../components/Prices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useCategory from "../hooks/useCategory.js";
import "./Homepage.css";
import { Carousel } from "antd";
import slider1 from "./Auth/Images/slider.gif";
import { FaCartPlus } from "react-icons/fa";

const HomePage = () => {
  const category = useCategory();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best Offers"}>
      {/* banner */}
      <div className="row  p-5 bg-img text-center text-light">
        <h3 className="mt-5 poppins">
          Welcome to <b>TECHMART</b>
        </h3>
        <p className="poppins" style={{ fontSize: "13px" }}>
          A place where you can buy or sell your digital assets.
        </p>
        <h6 className="poppins mt-3">
          Sign In for free to continue your journey.
        </h6>
        <div className="d-flex justify-content-center ">
          <button
            type="button"
            onClick={() => {
              navigate("/register");
            }}
            className="btn btn-primary me-3 btn-auth"
          >
            Signup
          </button>
          <p className="poppins pt-2"> or </p>
          <button
            className="btn btn-primary ms-3 btn-auth"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Categories */}
      <div
        className="d-flex justify-content-start ps-3 pe-3 mt-2 mb-1"
        style={{ borderBottom: "1px solid #9e9e9e" }}
      >
        {category.map((c) => (
          <>
            <Link
              className=" cats text-secondary poppins me-3 pt-1"
              to={`/category/${c.slug}`}
            >
              {c.name}
            </Link>
            <p className="me-3">|</p>
          </>
        ))}
      </div>

      <div className="row mt-3 mb-4">
        {/* Filters */}
        {/* category filter */}
        <div
          className="col-md-3 bg-light  ms-5 "
          style={{ border: "1px solid #bababa" }}
        >
          <h6 className="poppins mt-3 text-secondary">
            Apply filters by your choice.
          </h6>
          <p className="poppins bg-light-purple p-2 text-center">
            Filter By Category
          </p>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
              >
                <div className="poppins">{c.name}</div>
              </Checkbox>
            ))}
          </div>

          {/* price filter */}
          <p className="poppins bg-light-purple p-2 text-center mt-4">
            Filter By Price
          </p>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>
                    <div className="poppins">{p.name}</div>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-reset poppins"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-8">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height="200px"
                />
                <div className="card-body">
                  <div className="d-flex">
                    <h5 className="card-title me-2">{p.name}</h5>
                    <h5 className="ms-4 text-purple card-text">${p.price}</h5>
                  </div>

                  <p className="card-text text-secondary">
                    {p.description.substring(0, 30)}...
                  </p>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-details "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      <FaCartPlus size={25} color="#3a174f" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load  more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
