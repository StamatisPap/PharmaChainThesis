import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";
import AdminNav from "../Admin_Home/AdminNav";
import web3 from "../web3";
import AuthService from "../AuthService/AuthService";
import "./Distributor.css";
import swal from "sweetalert";
import supplychain from "../supplychain";
import Modal from "react-bootstrap/Modal";
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
