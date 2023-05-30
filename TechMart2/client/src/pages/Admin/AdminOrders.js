import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import moment from "moment";

import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  console.log("🚀 ~ file: AdminOrders.js:23 ~ AdminOrders ~ auth:", auth);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/all-orders?${auth?.user?.id}`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders -TechMart"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
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
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
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
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
