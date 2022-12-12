import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";
import AdminNav from "../Admin_Home/AdminNav";
import web3 from "../web3";
import swal from "sweetalert";
import AuthService from "../AuthService/AuthService";
import supplychain from "../supplychain";
import Modal from "react-bootstrap/Modal";
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
