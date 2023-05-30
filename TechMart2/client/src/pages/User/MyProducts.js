import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";

const MyProducts = () => {

    const [auth, setAuth] = useAuth();
    console.log(auth)
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProductsBySeller = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/get-product-by/${auth?.user?.id}`);
        setProducts(data.products);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    };
  
    //lifecycle method
    useEffect(() => {
        getAllProductsBySeller();
    }, []);
  
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
               
                  <h2 className="nunito-b gernalHeadingtext">My Products</h2>
                  
               

              </div>
            </div>
            <div className="row">
            <div className="d-flex  flex-wrap">
                    
                    {products?.map((p) => (
                      <Link
                        to={`/dashboard/user/product/${p.slug}`}
                        className="product-link"
                      >
                        <div className="card m-2 mb-5" style={{ width: "18rem" }}>
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height="200px"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  
                        </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyProducts;
