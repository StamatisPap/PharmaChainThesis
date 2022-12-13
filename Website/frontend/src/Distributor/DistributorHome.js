import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import "./Distributor.css";
import UserHome from "../Home/UserHome";

class DistributorHome extends Component {
 

  render() {
    return (
      <>
        <AdminNav
          homeUrl="/distributer"
          notifUrl="/distributer/notifications"
          history={this.props.history}
        />
        <UserHome history={this.props.history}/>
      </>
    );
  }
}
export default DistributorHome;
