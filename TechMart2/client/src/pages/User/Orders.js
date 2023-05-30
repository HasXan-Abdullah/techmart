import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders - TechMart"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
        
        <h2 className="nunito-b gernalHeadingtext">My Orders</h2>

       
       <div className="row">
                <div className="">
            {orders?.map((o, i) => {
              return (
             
                  
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Orders</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>{o?.status}</th>
                        <th>{o?.buyer?.name}</th>
                        <th>{moment(o?.createAt).fromNow()}</th>
                        <th>{o?.payment.success ? "Success" : "Failed"}</th>
                        <th>{o?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row m-3 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height={"150px"}
                            style={{ width: "200px" }}
                          />
                        </div>
                        <div className="col-md-8 mt-3">
                          <h5>{p.name}</h5>
                          <p>{p.description.substring(0, 30)}</p>
                          <h6>Price: {p.price}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
               
              );
            })} </div>
                </div>
          </div>
        </div>
   </div>
    </Layout>
  );
};

export default Orders;
