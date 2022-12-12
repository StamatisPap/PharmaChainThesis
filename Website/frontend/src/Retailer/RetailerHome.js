import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AdminNav from "../Admin_Home/AdminNav";
import web3 from "../web3";
import swal from "sweetalert";
import AuthService from "../AuthService/AuthService";
import { GoSearch } from "react-icons/go";
import supplychain from "../supplychain";
import Modal from "react-bootstrap/Modal";
import Transactions from "../Manufacturer/Transactions";
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
