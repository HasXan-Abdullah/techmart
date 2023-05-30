import React from 'react'
import Layout from './../components/layout/Layout.js'
import "../pages/Contact.css"
import {MdLocationOn} from "react-icons/md"
import {BsFillTelephoneFill} from "react-icons/bs"
import {MdEmail} from "react-icons/md"
import {AiFillMessage} from "react-icons/ai"

const Contact = () => {
  return (
    <Layout title={"Contact Us - TechMart"}>
      <div className='contact-heading mt-5 text-center'>
        LET'S GET IN TOUCH!
      </div>
      <div className="row mt-5">
        <div className="col-md-4 contact">
          <div className='icon-address'><MdLocationOn size={40}/></div>
          <h5 className='mt-3 poppins icon-heading'>Address</h5>
          <p className='details'>quis, vestibulum vel justo. Ut non <br/><p><i>quis, vestibulum vel justo. Ut non</i></p></p>
        </div>
        <div className="col-md-4 contact">
        <div className='icon-phone'><BsFillTelephoneFill size={30}/></div>
        <h5 className='mt-3 poppins icon-heading'>Phone</h5>
        <p className='details'>quis, vestibulum vel justo. Ut non <br/><p><i>quis, vestibulum vel justo. Ut non</i></p></p>
        </div>
        <div className="col-md-4 contact">
        <div className='icon-email'><MdEmail size={36}/></div>
        <h5 className='mt-3 poppins icon-heading'>Email</h5>
        <p className='details'>quis, vestibulum vel justo. Ut non <br/><p><i>quis, vestibulum vel justo. Ut non</i></p></p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 message">
        <div className='d-flex justify-content-start' ><AiFillMessage size={70} color="#3a174f"/> <h5 className='mt-3 poppins message-heading ms-3'>Let's Chat!</h5></div>
         <p className='details mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat convallis cursus. Suspendisse leo magna, suscipit et sagittis quis, vestibulum vel justo. Ut non eleifend mauris, non luctus lacus. Etiam interdum malesuada augue vitae semper. Morbi felis purus, eleifend ac eleifend non, maximus faucibus odio. Praesent ut nulla pharetra, suscipit leo at, viverra orci. Pellentesque diam odio, gravida vitae augue ac, malesuada finibus nibh. Aliquam semper lectus malesuada posuere rutrum. Pellentesque sagittis leo nec diam congue, in imperdiet mi tincidunt. Integer luctus ligula ac metus aliquam sollicitudin. Etiam at porta lacus, a gravida lacus. Aenean leo sapien, vestibulum sed augue vitae, placerat accumsan enim. Vivamus ac justo neque</p>
        </div>
        <div className="col-md-6 message">
        Message Form
      </div>
    </div>
    </Layout>
  )
}

export default Contact
