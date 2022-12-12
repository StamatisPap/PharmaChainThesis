import React, { Component } from "react";
import { Card, Col, Button, Row } from "react-bootstrap";
import AdminNav from "../Admin_Home/AdminNav";
import web3 from "../web3";
import AuthService from "../AuthService/AuthService";
import swal from "sweetalert";
import supplychain from "../supplychain";
// import { GoSearch } from "react-icons/go";
// import supplychain from "../supplychain";
// import Modal from "react-bootstrap/Modal";
// import Transactions from "./Transactions";
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
