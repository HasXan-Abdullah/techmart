import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
       <div className="text-center ">
     <div className="list-group ">
        <h4 >User Panel</h4>
   <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action bg-menu">Profile</NavLink>
  <NavLink to="/dashboard/user/my-products" className="list-group-item list-group-item-action">My Products</NavLink>
  <NavLink to="/dashboard/user/add-product" className="list-group-item list-group-item-action">Add Product</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
</div>
</div>
    </>
  )
}

export default UserMenu
