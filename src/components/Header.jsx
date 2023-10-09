import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="header-navbar">
      <Link to="/">Home</Link>
      <Link to="/post" style={{ paddingLeft: "80px" }}>
        Add Post
      </Link>
      <Link to="/users" style={{ paddingLeft: "80px" }}>
        Users
      </Link>
    </section>
  );
};

export default Header;
