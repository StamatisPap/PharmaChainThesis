import React, { Component } from "react";
import "./login.css";
import swal from "sweetalert";
import { Button } from "react-bootstrap";
import AuthService from "./AuthService/AuthService";
// import datalist from "react-datalist";
const loginBackground = require("./Assets/loginBackground.png");

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      signup: false,
      userName: "",
      password: "",
      phone: "",
      email: "",
      LcNo: "",
      Location: "",
      name: "",
      data: [
        "Athens",
        "Patras",
        "Thessaloniki",
        "Larisa",
        "Volos",
        "Kastoria",
        "Lamia",
        "Kalamata",
        "Ios",
        "Mikonos",
        "Crete",
        "Zakinthos",
        "Kerkira",
      ],
      address: "",
      UserType: "Distributer",
      formErrors: { email: "", password: "", phone: "", first: "", user: "" },
      emailValid: false,
      passwordValid: false,
      phoneValid: false,
      firstValid: false,
      formValid1: false,
      formValid2: false,
      userValid: false,
      checkforusername: "",
    };
    this.Auth = new AuthService();
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let phoneValid = this.state.phoneValid;
    let firstValid = this.state.firstValid;
    let userValid = this.state.userValid;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "Email is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Password is too short";
        break;
      case "phone":
        phoneValid = value.match(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        );
        fieldValidationErrors.phone = phoneValid ? "" : "Phone No. is invalid";
        break;
      case "name":
        firstValid = value.length > 3;
        fieldValidationErrors.first = firstValid
          ? ""
          : "First name is too small";
        break;
      case "userName":
        userValid = value.length > 4;
        fieldValidationErrors.user = userValid ? "" : "Username is too small";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        phoneValid: phoneValid,
        firstValid: firstValid,
        passwordValid: passwordValid,
        userValid: userValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    // console.log(this.state)
    this.setState({
      formValid1:
        this.state.firstValid &&
        this.state.emailValid &&
        this.state.phoneValid &&
        this.state.userValid &&
        this.state.passwordValid,
    });
  }

  handleFormSubmit1 = (e) => {
    // console.log(this.state)
    e.preventDefault();
    // console.log(this.state.LcNo);
    this.Auth.fetch("http://localhost:5000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
        name: this.state.name,
        LcNo: this.state.LcNo,
        phone: this.state.phone,
        address: this.state.address,
        location: this.state.Location,
        userType: this.state.UserType,
      }),
    })
      .then((res) => {
        // console.log("signup", res)
        this.props.history.replace("/");
      })
      .catch((err) => {
        // console.log('signup', err)
      });
  };

  handleFormSubmit = (e) => {
    // e.preventDefault();

    // this.Auth.login(this.state.username, this.state.password)
    e.preventDefault();
    // console.log(this.state)
    this.Auth.login(this.state.userName, this.state.password)
      .then((res) => {
        const profile = this.Auth.getProfile();
        if (profile.isAdmin === "yes") this.props.history.replace("/Admin");
        else {
          this.Auth.fetch("http://localhost:5000/api/getuser", {
            method: "POST",
            body: JSON.stringify({}),
          }).then((res) => {
            if (res.typeofuser === "Manufacturer") {
              this.props.history.replace("/manufacturer");
            } else if (res.typeofuser === "Retailer") {
              this.props.history.replace("/retailer");
            } else {
              this.props.history.replace("/distributer");
            }
          });
        }
      })
      .catch((err) => {
        if (err === "TypeError: Cannot read property 'json' of undefined") {
          swal({
            title: "Please Note",
            text: "Wrong Username or Password",
            icon: "warning",
            dangerMode: true,
          }).then((willbe) => {
            window.location.reload();
          });
        } else if (err === "TypeError: Failed to fetch") {
        }
      });
  };

  handleChange = (e) => {
    let x = e.target.name;
    let value = e.target.value;
    this.setState(
      {
        [x]: e.target.value,
      },
      () => {
        this.validateField(x, value);
      }
    );
  };

  handleUsernameChange = (e) => {
    let x = e.target.name;
    let value = e.target.value;
    this.setState(
      {
        [x]: e.target.value,
      },
      () => {
        this.validateField(x, value);
      }
    );

    this.Auth.fetch("http://localhost:5000/api/checkforusername", {
      method: "POST",
      body: JSON.stringify({
        username: value,
      }),
    })
      .then((res) => {
        if (res.length > 0) {
          this.setState({ checkforusername: "Username already exist" });
        } else {
          this.setState({ checkforusername: "" });
        }
      })
      .catch((err) => {});
  };

  handleThisChange = (e) => {
    this.setState({
      UserType: e.target.value,
    });
  };

  UNSAFE_componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  render() {
    return (
      <div className="container">
        <div className="row row-mobile">
          <div className="col-8 col-md-6">
            <div className="login-container" style={{ height: "100vh" }}>
              <div>
                <div>
                  <h3 className="sign-in mb-5">Sign In</h3>
                </div>
                <div>
                  <form>
                    <fieldset>
                      <legend>USERNAME</legend>
                      <input
                        type="text"
                        name="userName"
                        required
                        onChange={this.handleChange}
                        className="sign-in-field"
                        style={{ textIndent: 35 }}
                      />
                    </fieldset>
                    <fieldset className="mt-4">
                      <legend>PASSWORD</legend>
                      <input
                        type="password"
                        name="password"
                        required
                        onChange={this.handleChange}
                        className="sign-in-field"
                        style={{ textIndent: 35 }}
                      />
                    </fieldset>
                    <Button
                      type="submit"
                      variant="primary"
                      className="formbut"
                      onClick={this.handleFormSubmit}
                    >
                      SIGN IN
                    </Button>
                  </form>
                </div>
                <div className="Lredirectdiv">
                  <span>Not a member?</span>
                  <a className="clickonme ml-2" href="/signup">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 col-md-6">
            <div style={{ position: "relative"}}>
              <img
                src={loginBackground}
                alt="loginBackground"
                className="login-img"
              />
              <div className="login-sidebar">
                <div className="sidebar-text">
                  <h3 className="sidebar-title">Welcome to</h3>
                  <h2 className="sidebar-subtitle">PHARMACHAIN</h2>
                  <p className="sidebar-content mt-5">
                    Pharmachain is a supply chain software helping in tracking the
                    transaction of medicine from manufacturer to distributor to
                    retailer. Increase your productivity with Pharmachain!
                  </p>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default login;
