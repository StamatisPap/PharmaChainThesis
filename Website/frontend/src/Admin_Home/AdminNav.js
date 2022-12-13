import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import "./Admin_Home.css";
import AuthService from "../AuthService/AuthService.js";
import web3 from "../web3";
import swal from "sweetalert";
// import withAuthAdmin from "../withAuthAdmin";

const logo = require("../Assets/Pharmachain-Logo.png");
const vector = require("../Assets/Vector.png");
const user = require("../Assets/user.png");
const notification = require("../Assets/notification.png");

class AdminNav extends Component {
  constructor(props) {
    super();
    this.Auth = new AuthService();
    this.state = {
      user: null,
      notif: []
    };
  }

  UNSAFE_componentWillMount() {
    const Auth = new AuthService();
   
   

    if (Auth.loggedIn()) {
      const user = Auth.getProfile();
      this.state = { user: user };
      Auth.fetch("http://localhost:5000/api/getuser", {
        method: "POST",
        body: JSON.stringify({}),
      })
        .then((res) => {
          
          this.setState({
            typeofuser: res.typeofuser,
            name: res.userName,
            addrs: res.address,
            accepted: res.accepted,
            accountName: res.name,
          });
          this.getNotifs(res.userName)
          web3.eth.getAccounts((err, accounts) => {
            console.log(err, accounts)
            if (err) {
              console.log('An error occurred ' + err);
            } else if (accounts[0] !== res.address) {
             
              swal({
                title: "Please Note",
                text: "Please login into MetaMask with your registered account..!",
                icon: "warning",
                dangerMode: true,
              }).then((willD) => {
                this.logout();
                this.props.history.replace("/Login");
              });

            }
          });
        })
        .catch((err) => {
          // console.log('view own Question error', err)
        });

    
    }
  }

  getNotifs = (name) => {
    web3.eth
      .getAccounts()
      .then((r) => {
        console.log(this.state.name);
        this.Auth.fetch("http://localhost:5000/api/getnotifs", {
          method: "POST",
          body: JSON.stringify({
            acc: r[0],
            name: name? name: this.state.name
          }),
        })
          .then((res) => {
            this.setState({ notif: res.length });
            console.log(res.length);
          })
          .catch((err) => {
            // console.log(err)
          });
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  logout = () => {
    const Auth = new AuthService();
    Auth.logout();
    this.setState({ user: null});
    this.props.history.replace("/");
  };

  showLogout = () => {
    return (
      <div>
        <div className="logout-popup-top"></div>
        <div className="logout-popup">
          <div className="modal-body">
            <img src={user} alt="user" />
            <span
              className="ml-3"
              style={{ fontWeight: 400, fontSize: "14px", color: "#015F4B" }}
            >
              {this.state.user.userName}
            </span>
            <hr />
            <div onClick={this.logout}>
              <span
                href="#"
                className="mr-3"
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#015F4B",
                  cursor: "pointer",
                }}
              >
                Logout
              </span>
              <FiLogOut
                style={{ fontSize: 20, marginBottom: 3, color: "#015F4B" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  handleMouseOver = () => {
    return this.setState({ showPopup: this.showLogout() });
  };

  handleMouseOut = () => {
    return this.setState({ showPopup: "" });
  };

  render() {
    return (
      <div className="nav-container">
        <Navbar collapseOnSelect className="container h-100">
          <Navbar.Brand href={this.props.homeUrl}>
            <img src={logo} alt="logo" width="246px" height="40px" />
          </Navbar.Brand>

          {this.state.user ? (
            <>
              <Nav className="mr-auto"></Nav>
              <Nav>
                {/* <Nav.Link eventKey={1} href="" onClick={this.myUserHandler}>
                Home
              </Nav.Link> */}
                {/* <Nav.Link eventKey={2} href="" onClick={this.myMedHandler}>
                                            Expired Med
                                        </Nav.Link> */}
                {/* <Nav.Link eventKey={4} href="" onClick={this.displayUserHandler}>
                Users
              </Nav.Link> */}
                <Nav.Link eventKey={2} href={this.props.notifUrl} style={{ position: "relative"}}>
                  <span style={{ position: "absolute",top: "-5px",right: "20px",color: "red", fontWeight: 600}}>{this.state.notif}</span>
                  <img
                    src={notification}
                    alt="notification"
                    className="notification"
                  />
                </Nav.Link>
                <Nav.Link
                  eventKey={3}
                  href="#"
                  style={{ color: "white", fontWeight: 400 }}
                  onClick={this.handleMouseOver}
                >
                  <img src={vector} alt="logo" />
                  <span className="ml-3">{this.state.user.userName}</span>
                  {this.state.showPopup}
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="mr-auto"></Nav>
              <Nav>
                <Nav.Link href="Login">
                  <button className="sign-in-btn">SIGN IN</button>
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar>
      </div>
    );
  }
}
export default AdminNav;
