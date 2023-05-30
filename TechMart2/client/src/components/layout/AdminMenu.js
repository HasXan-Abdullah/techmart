import React from "react";
import { NavLink } from "react-router-dom";
import "../style/AdminMenu.css";
import { useAuth } from "../../Context/auth";

const AdminMenu = () => {
  const auth = useAuth();

  return (
    <>
      <div className="text-center ">
        <div className="list-group ">
          <h4>Admin Panel</h4>
          {auth[0]?.user?.email?.includes("admin@admin.com") && (
            <>
              <NavLink
                to="/dashboard/admin/create-category"
                className="list-group-item list-group-item-action bg-menu"
              >
                Create Category
              </NavLink>
              <NavLink
                to="/dashboard/admin/users"
                className="list-group-item list-group-item-action"
              >
                Users
              </NavLink>
            </>
          )}
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>

          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
