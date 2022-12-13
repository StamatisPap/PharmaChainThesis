import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";
const userImage = require("../Assets/userImage.png");

class UserInfo extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Col sm={4} className="pl-0">
        <Card
          border="secondary"
          className="DisCard"
          style={
            this.props.index % 2 === 0
              ? { background: "#EAE9FF" }
              : { background: "#FDE9E9" }
          }
        >
          <Card.Body>
            <Card.Title
              style={{ fontSize: "20px", fontWeight: 700, color: "#23466A" }}
              className="mb-4"
            >
              {this.props.user.name}{" "}
              <img src={userImage} alt="userImage" style={{ float: "right" }} />
            </Card.Title>
            <p
              className="CardTitle"
              style={{ fontSize: "18px", fontWeight: 700, color: "#23466A" }}
            >
              Address :
            </p>{" "}
            <p style={{ fontSize: "16px", fontWeight: 400, color: " #1D1D1D" }}>
              {this.props.user.address}
            </p>
            <p
              className="CardTitle"
              style={{ fontSize: "18px", fontWeight: 700, color: "#23466A" }}
            >
              Username :
            </p>{" "}
            <p style={{ fontSize: "16px", fontWeight: 400, color: " #1D1D1D" }}>
              {this.props.user.userName}
            </p>
            <p
              className="CardTitle"
              style={{ fontSize: "18px", fontWeight: 700, color: "#23466A" }}
            >
              Account Type :
            </p>{" "}
            <p style={{ fontSize: "16px", fontWeight: 400, color: " #1D1D1D" }}>
              {this.props.user.typeofuser}
            </p>
          </Card.Body>
          {}
        </Card>
      </Col>
    );
  }
}

export default UserInfo;
