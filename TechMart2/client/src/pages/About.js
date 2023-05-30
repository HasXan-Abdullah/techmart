import React from 'react'
import Layout from './../components/layout/Layout.js'
import "../pages/About.css"
import {CgCommunity} from "react-icons/cg"
import {BsPeopleFill} from "react-icons/bs"

const About = () => {
  return (
    <Layout title={"About Us - TechMart"}>
      <div className="row">
        <div className='find poppins mt-5 text-center'>
        <p className='bg-purple' >Find out more about us</p>
        </div>
        <div className='about-heading poppins mt-1 text-center'>
       <h2><b>What is <span className='purple'>techmart?</span> </b> </h2>
        </div>
        <div className="about-line text-center  mt-1">
        <p>An online marketplace where you can trade your digital assets (e.g. <br/> Website templates, UI Design templates, Code snippets, E-books etc.)</p>
        </div>
      </div>
      <div className="row mt-5 mb-5 ">
        <div className="col-md-4  me-5 first-card ">
          <CgCommunity size={70} color='3a174f'/>
          <p className='ms-3 community-line poppins'>A community of owners, developers, designers and customers</p>
          <p className='ms-3 community-details poppins'>
          TechMart is a global online marketplace where individuals and business owners buy and sell websites templates, UI/UX templates, Code snippets,E-books etc.
          </p>
          </div>
        <div className="col-md-4 mt-2 ms-5 second-card ">
        <BsPeopleFill size={45} color='3a174f'/>
          <p className='ms-3 community-line poppins mt-3'>A peer - to - peer platform</p>
          <p className='ms-3 community-details poppins mt-3'><br/>
          On TechMart, sellers are selling their passion projects and side hustles.We make the process super easy by connecting you with these sellers.          </p>
        </div>
      </div>
    </Layout>
  )
}
 
export default About
