import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import "./Manufacturer.css";
import UserNotification from "../Home/UserNotification";

class ManufacturerNotification extends Component {
  
  render() {
    return (
      <>
        <AdminNav
          homeUrl="/manufacturer"
          notifUrl="/manufacturer/notifications"
          history={this.props.history}
        />
        <UserNotification />
      </>
    );
  }

}
export default ManufacturerNotification;
