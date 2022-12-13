import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import UserHome from "../Home/UserHome";

class RetailerHome extends Component {

  render() {
    return (
      <>
        <AdminNav
          homeUrl="/retailer"
          notifUrl="/retailer/notifications"
          history={this.props.history}
        />
       <UserHome history={this.props.history}/>
      </>
    );
  }
  
}
export default RetailerHome;
