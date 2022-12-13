import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import UserNotification from "../Home/UserNotification";

class RetailerNotification extends Component {

  render() {
    return (
      <>
        <AdminNav
          homeUrl="/retailer"
          notifUrl="/retailer/notifications"
          history={this.props.history}
        />
        <UserNotification />
      </>
    );
  }
}
export default RetailerNotification;
