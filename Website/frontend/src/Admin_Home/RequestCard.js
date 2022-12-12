import React, { Component } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import AuthService from "../AuthService/AuthService.js";
import AdminNav from "./AdminNav.js";
import "./Admin_Home.css";
import web3 from "../web3";
import swal from "sweetalert";
import supplychain from "../supplychain";


class RequestCard extends Component {
  UNSAFE_componentWillMount() {
    this.getUsers();
  }

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      userList: [],
      finalList: [],
      showInput: false,
    };
  }

  getUsers = () => {
    this.Auth.fetch("http://localhost:5000/api/getalluser", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => {
        this.setState({ userList: res });
        this.setState({ finalList: res });
        if (res.length > 0) {
          this.setState({
            showInput: true,
          });
        } else {
          this.setState({
            showInput: false,
          });
        }
        this.setState({ userListP: res });
        // console.log(this.state)
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  handleChange = (e) => {
    this.setState({
      errorMsg: "",
    });
    const displayUser = this.state.finalList.filter((user) => {
      return user.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    console.log(this.state.userList);

    console.log(displayUser);
    if (displayUser.length) {
      this.setState({
        userList: displayUser,
      });
    } else {
      this.setState({
        errorMsg: "No user found",
      });
    }
  };

  acceptHandler = (id, userName, typeofuser, address) => {
    // console.log("accept")

    swal({
      title: "Please Note",
      text: "Please accept the transaction in metamask and reject if any error",
      icon: "success",
      dangerMode: true,
    }).then((willde) => {
      this.setState({ loading: true });
      web3.eth
        .getAccounts()
        .then((r) => {
          supplychain.methods
            .setuser(typeofuser, address, userName)
            .send({
              from: r[0],
            })
            .then((re) => {
              this.Auth.fetch("http://localhost:5000/api/accept", {
                method: "POST",
                body: JSON.stringify({
                  Id: id,
                  //send id and remove from notifs
                }),
              })
                .then((res) => {
                  this.setState({ loading: false });
                  this.getUsers();

                  // console.log(this.state)
                })
                .catch((err) => {
                  //  console.log(err)
                });
            })
            .catch((err) => {
              // console.log(err);
              this.setState({ loading: false });
            });
        })
        .catch((err) => {
          // console.log(err)
        });
    });
  };

  declineHandler = (id) => {
    this.Auth.fetch("http://localhost:5000/api/reject", {
      method: "POST",
      body: JSON.stringify({
        Id: id,
        //send id and remove from notifs
      }),
    })
      .then((res) => {
        this.setState({});
        this.getUsers();
        this.getDisplayUsers();
        // console.log(this.state)
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  render() {
    if (this.state.userList.length || this.state.errorMsg && this.state.isAdmin != "") {
      return (
        <div>
          <AdminNav homeUrl="/Admin" notifUrl="/admin/request" history={this.props.history}/>
          <Container style={{ marginTop: 50 }}>
            <h2 className="mb-3">{this.state.errorMsg}</h2>
            <Row>
              <Col sm>
                <input
                  type="text"
                  name="Name"
                  className="searchinput mb-5"
                  placeholder="Enter Name"
                  onChange={this.handleChange}
                  style={{ textIndent: 12 }}
                />
              </Col>
            </Row>
            <Row>
              {this.state.userList.map((user, index) => (
                <Col sm={6} key={index}>
                  <Card
                    style={{ marginBottom: 50 }}
                    border="secondary"
                    className="DisCard"
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#23466A",
                        }}
                        className="mb-3"
                      >
                        {user.name}
                      </Card.Title>
                      <p
                        className="CardTitle"
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#23466A",
                        }}
                      >
                        Address :
                      </p>{" "}
                      <p
                        className="CardContent mb-2"
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#1D1D1D",
                        }}
                      >
                        {user.address}
                      </p>
                      <p style={{ float: "left" }} className="mr-4">
                        <p
                          className="CardTitle"
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#23466A",
                          }}
                        >
                          Username :
                        </p>{" "}
                        <p
                          className="CardContent"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#1D1D1D",
                            float: "right",
                          }}
                        >
                          {user.userName}
                        </p>
                      </p>
                      <p style={{ float: "left" }}>
                        <p
                          className="CardTitle"
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#23466A",
                          }}
                        >
                          Account Type :
                        </p>{" "}
                        <p
                          className="CardContent"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#1D1D1D",
                            float: "right",
                          }}
                        >
                          {user.typeofuser}
                        </p>
                      </p>
                    </Card.Body>
                    <Card.Footer
                      style={{ background: "transparent", border: "none" }}
                    >
                      <div className="float-right">
                        <Button
                          variant="outline-danger"
                          className="rejectBut abut mr-3"
                          onClick={() => this.declineHandler(user._id)}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              color: "#D12020",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Reject
                          </span>
                        </Button>
                        <Button
                          variant="outline-success"
                          className="abut"
                          onClick={() =>
                            this.acceptHandler(
                              user._id,
                              user.userName,
                              user.typeofuser,
                              user.address
                            )
                          }
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              color: "#FFFFFF",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Accept
                          </span>
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          {this.state.loading && (
            <div className="spinner-border spinner-position" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <AdminNav homeUrl="/Admin" notifUrl="/admin/request" history={this.props.history}/>
          <div className="container mt-5">
            <Row>
              <Col sm>
                <input
                  type="text"
                  name="Name"
                  className="searchinput mb-5"
                  placeholder="Enter Name"
                  onChange={this.handleChange}
                  style={{ textIndent: 12 }}
                />
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }
}
export default RequestCard;
