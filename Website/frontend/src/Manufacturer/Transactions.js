import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";
import AuthService from "../AuthService/AuthService";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resdate: "",
    };
    this.Auth = new AuthService();
    var res = this.props.transaction.dot.split("T");
    this.resdate = res[0];

    var res1 = res[1].split(".");
    this.restime = res1[0];
  }

  render() {
    return (
      <>
        <Col xs={12} md={6} className="transaction-container">
          <Card style={{ marginBottom: 50 }} className="detailbox">
            <Card.Header
              style={{
                fontWeight: 300,
                fontSize: "12px",
                color: "#1D1D1D",
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #DCDCFF 161.63%)",
                border: "none",
              }}
            >
              {this.props.transaction.transid}
            </Card.Header>
            <Card.Body style={{ background: "#F8F8FF" }}>
              {/* <Card.Title>{this.props.transactiontransid}</Card.Title> */}
              {this.props.transaction.medname !== undefined ? (
                <div className="mb-4">
                  <p className="CardTitle transaction-title">
                    Medicine Name :{" "}
                  </p>

                  {this.props.transaction.medname !== "" ? (
                    <p className="CardContent transaction-value">
                      {this.props.transaction.medname}
                    </p>
                  ) : (
                    <p className="CardContent transaction-value">undefined</p>
                  )}
                </div>
              ) : (
                <p></p>
              )}
              <p className="CardTitle transaction-title">From : </p>
              <p className="CardContent transaction-value">
                {this.props.transaction.name}
              </p>
              <p className="CardTitle transaction-title">Address : </p>
              <p className="CardContent transaction-value">
                {this.props.transaction.from}
              </p>
              <p className="CardTitle transaction-title">To : </p>
              {this.props.transaction.Toname ? (
                <p className="CardContent transaction-value">
                  {this.props.transaction.Toname}
                </p>
              ) : (
                <p className="CardContent transaction-value">Customer</p>
              )}
              {this.props.transaction.to !== undefined ? (
                <div>
                  <p className="CardTitle transaction-title">Address : </p>
                  <p className="CardContent transaction-value">
                    {this.props.transaction.to}
                  </p>
                </div>
              ) : null}
              <p className="CardTitle transaction-title">Sid : </p>
              <p className="CardContent transaction-value">
                {" "}
                {this.props.transaction.sid}
              </p>

              {this.props.transaction.eid !== undefined ? (
                <div>
                  {" "}
                  <p className="CardTitle transaction-title">Eid : </p>
                  <p className="CardContent transaction-value">
                    {this.props.transaction.eid}
                  </p>
                </div>
              ) : null}
              <p className="CardTitle transaction-title">Number Of Meds : </p>
              <p className="CardContent transaction-value">
                {this.props.transaction.meds}
              </p>
            </Card.Body>
            <Card.Footer style={{ background: "#FFF" }}>
              <small className="text-center transaction-date">
                <p className="CardTitle">Trancastion date & time:</p>
                <p className="CardContent">
                  {this.resdate} {this.restime}
                </p>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </>
    );
  }
}
export default Transactions;
