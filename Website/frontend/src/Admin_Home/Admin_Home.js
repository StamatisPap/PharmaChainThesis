import React, { Component } from "react";
import "./Admin_Home.css";
import AdminNav from "./AdminNav";
import UserCard from "./UserCard";

class Admin_Home extends Component {
  render() {
      return (
        <div className="maindiv" onClick={this.handleMouseOut}>
          <AdminNav
           homeUrl="/Admin"
           notifUrl="/admin/request"
           history= {this.props.history}
          />
          <UserCard/>
        </div>
      );
    }
  }

export default Admin_Home;
