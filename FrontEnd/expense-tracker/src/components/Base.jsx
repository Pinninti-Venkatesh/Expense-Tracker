import React from "react";
import NavBar from "./NavBar";
import './dashboard.scss'
const Base = ({
  children
}) => (
    <div className="dashboard-container">
    <NavBar />
    {children}
</div>
);

export default Base;
