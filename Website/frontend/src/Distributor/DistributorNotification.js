import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import "./Distributor.css";
import UserNotification from "../Home/UserNotification";

class DistributorNotification extends Component {

  render() {
    return (
      <>
        <AdminNav
          homeUrl="/distributer"
          notifUrl="/distributer/notifications"
          history={this.props.history}
        />
        <UserNotification />
      </>
    );
  }
}
export default DistributorNotification;
