import React from "react";
import "../style/Footer.css";
import icons from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="row bg-dark-purple mt-2 pt-4 pb-5 text-center">
      <h2 className="text-light logo-name ">TECHMART</h2>
      <div className="footer-links">
        <Link to="/" className="text-light">
          Home -
        </Link>
        <Link to="/about" className="ps-1 text-light">
          About -
        </Link>
        <Link to="/contact" className="ps-1 text-light">
          Contact -
        </Link>
        <Link to="/policy" className="ps-1 text-light">
          Privacy Policy -
        </Link>
        <Link to="/login" className="ps-1 text-light">
          Sell -
        </Link>
        <Link to="/" className="ps-1 text-light">
          Buy
        </Link>
      </div>
    </div>
    // <div className="row bg-lightpurple">
    //   <div className="col-md-6 col-lg-3 footer-contact">
    //     <h2 className="text-light logo-name">TECHMART</h2>
    //     <p className="text-light">
    //       <b>Phone:</b> +92 3164125018
    //       <br />
    //       <b>Email:</b> kmaheen1129@gmail.com
    //       <br />
    //     </p>
    //   </div>
    //   <div className="col-md-6 col-lg-3 footer-links">
    //     <h5 className="Poppins text-light">Useful Links</h5>
    //     <ul>

    //       <li>
    //         <span>
    //         <Link to="/about" className="text-light">
    //           About
    //         </Link>
    //         </span>
    //       </li>
    //       <li>
    //         <span>
    //         <Link to="/contact" className="text-light">
    //           Contact
    //         </Link>
    //         </span>
    //       </li>

    //       <li>
    //         <span>
    //         <Link to="/policy" className="text-light">
    //           Privacy policy
    //         </Link>
    //         </span>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="col-md-6 col-lg-3 footer-services">
    //   <h5 className="Poppins text-light">Our Services</h5>
    //     <ul>
    //       <li>
    //       <i className="bi bi-arrow-right"></i>
    //         <a href="#" className="text-light">
    //           Sell Digital Products
    //         </a>
    //       </li>
    //       <li>
    //         <span>
    //         <a href="#" className="text-light">
    //           Buy Digital Products
    //         </a>
    //         </span>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="col-md-6 col-lg-3 footer-social">
    //   <h5 className="text-light">Our Social Networks</h5>
    //         <p className="text-light">You may follow us @</p>
    //         <div className="social-links mt-3">

    //           <a href="#" className="facebook">

    //           </a>
    //           <a href="#" className="instagram"></a>

    //           <a href="#" className="linkedin"></a>
    //         </div>
    //   </div>
    // </div>
  );
};

export default Footer;
