import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "60vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "TechMart",
  description: "An online platform for buying and selling of digital assets",
  keywords: "react, mern, mongodb, e-commerce, digital products",
  author: "Maheen Sabir",
};

export default Layout;
