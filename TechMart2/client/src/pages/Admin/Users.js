import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from './../../components/layout/AdminMenu';

const Users = () => {
  return (
    <Layout title={"All Users - TechMart"}>
      <div className="container-fluid m-3 p-3">
    <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
           
            <h5>All users</h5>

           
        </div>
    </div>
</div>
    </Layout>
  )
}

export default Users
