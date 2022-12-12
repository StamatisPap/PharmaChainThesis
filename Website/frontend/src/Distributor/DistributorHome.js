import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import web3 from "../web3";
import swal from "sweetalert";
import AuthService from "../AuthService/AuthService";
import { GoSearch } from "react-icons/go";
import supplychain from "../supplychain";
import Transactions from "./Transactions";
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
