import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import "./Manufacturer.css";
import UserHome from "../Home/UserHome";

class ManufacturerHome extends Component {
  render() {
    return (
      <>
        <AdminNav
          homeUrl="/manufacturer"
          notifUrl="/manufacturer/notifications"
          history={this.props.history}
        />
        <UserHome history={this.props.history}/>
      </>
    );
  }
}
export default ManufacturerHome;
