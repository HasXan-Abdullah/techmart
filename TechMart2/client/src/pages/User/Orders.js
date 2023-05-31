import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

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

  const openReviewModal = (order) => {
    setSelectedOrder(order);
  };

  const closeReviewModal = () => {
    setSelectedOrder(null);
    setRating("");
    setComment("");
    
  };

  const submitReview = async () => {
    try {
      const response = await axios.post(
        `/api/v1/product/submit-review/${selectedOrder._id}`,
        {
          userId:auth.user.id,
          userName:auth.user.name,
          productId: selectedOrder.products[0]._id,
          rating,
          comment,
        }
      );
      const { success, message, order } = response.data;
      console.log(response.data)
      if (success) {
        // Update the orders state to reflect the updated review
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o._id === selectedOrder.products[0]._id ? { ...o, rating, comment } : o))
        );
        closeReviewModal();
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              {orders?.map((o, i) => (
                <div className="border shadow" key={o._id}>
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
                      <div className="row m-3 p-3 card flex-row" key={p._id}>
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
                  {o?.reviews && o.reviews.length > 0 ? (
                    // Show reviews if available
                    <div className="container">
                      {o.reviews.map((review) => (
                        <div key={review._id}>
                          <h5>Rating: {review.rating}</h5>
                          <p>Comment: {review.comment}</p>
                          <hr />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Show "Write a Review" button if no reviews
                    <div className="container">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => openReviewModal(o)}
                      >
                        Write a Review
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submit a Review</h5>
                <button type="button" className="close" onClick={closeReviewModal}>
                <Link to="/dashboard/user/">  <span>&times;</span></Link>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Rating:</label>
                  <select
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Comment:</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeReviewModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={submitReview}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Orders;
