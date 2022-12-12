import React, { Component } from "react";
import "./login.css";
import swal from "sweetalert";
import { Form, Button } from "react-bootstrap";
import AuthService from "./AuthService/AuthService";

const loginBackground = require("./Assets/loginBackground.png");

class Register extends Component {
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
        if (this.state.userName === "admin")
          this.props.history.replace("/Admin");
        else this.props.history.replace("/");
      })
      .catch((err) => {
        if (err === "TypeError: Cannot read property 'json' of undefined") {
          // console.log("I did it")
          swal({
            title: "Please Note",
            text: "Wrong Username or Password",
            icon: "warning",
            dangerMode: true,
          }).then((willbe) => {
            window.location.reload();
          });
          // alert(err);
        } else if (err === "TypeError: Failed to fetch") {
          // console.log(err)
          // alert(err);
        }

        // console.log("This is err", err)
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
        // console.log("signup", res)
        // console.log(res.length)
        if (res.length > 0) {
          this.setState({ checkforusername: "Username already exist" });
        } else {
          this.setState({ checkforusername: "" });
        }
      })
      .catch((err) => {
        // console.log('signup', err)
      });
  };

  handleThisChange = (e) => {
    this.setState({
      UserType: e.target.value,
    });
  };

  UNSAFE_componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  loginstateHandler = () => {
    this.setState({ login: false });

    this.setState({ signup: true });
  };

  signupstateHandler = () => {
    this.setState({ login: true });

    this.setState({ signup: false });
  };

  render() {
    return (
      <div className="container">
        <div className="row row-mobile">
          <div className="col-8 col-md-7">
            <div className="login-container signup">
              <div>
                <div>
                  <h3 className="sign-in mb-5">Sign Up</h3>
                </div>
                <div>
                  <form>
                    <div className="row">
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend>NAME</legend>
                          <input
                            type="text"
                            name="name"
                            required
                            onChange={this.handleChange}
                            className="sign-in-field"
                            style={{ textIndent: 35 }}
                          />
                        </fieldset>
                        <span
                          style={{ color: "red", float: "left", fontSize: 16 }}
                        >
                          {this.state.formErrors.first}
                        </span>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend>USERNAME</legend>
                          <input
                            type="text"
                            name="userName"
                            required
                            onChange={this.handleUsernameChange}
                            className="sign-in-field"
                            style={{ textIndent: 35 }}
                          />
                        </fieldset>

                        <span
                          style={{ color: "red", float: "left", fontSize: 16 }}
                        >
                          {this.state.formErrors.user}
                        </span>
                        <span
                          style={{ color: "red", float: "left", fontSize: 16 }}
                        >
                          {this.state.checkforusername}
                        </span>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend>EMAIL</legend>
                          <input
                            type="text"
                            name="email"
                            required
                            onChange={this.handleChange}
                            className="sign-in-field"
                            style={{ textIndent: 35 }}
                          />
                        </fieldset>
                        <span
                          style={{ color: "red", float: "left", fontSize: 16 }}
                        >
                          {this.state.formErrors.email}
                        </span>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend style={{ width: "150px" }}>
                            METAMASK ADDRESS
                          </legend>
                          <input
                            type="text"
                            name="address"
                            required
                            onChange={this.handleChange}
                            className="sign-in-field"
                            style={{ textIndent: 35 }}
                          />
                        </fieldset>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend>PHONE</legend>
                          <input
                            type="text"
                            name="phone"
                            required
                            onChange={this.handleChange}
                            className="sign-in-field"
                            style={{ textIndent: 35 }}
                          />
                        </fieldset>
                        <span
                          style={{ color: "red", float: "left", fontSize: 16 }}
                        >
                          {this.state.formErrors.phone}
                        </span>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend>USER TYPE</legend>
                          <Form.Group
                            controlId="exampleForm.ControlSelect1"
                            className="mb-0"
                          >
                            <Form.Control
                              as="select"
                              style={{ border: "none" }}
                              value={this.state.UserType}
                              onChange={this.handleThisChange}
                            >
                              <option>Manufacturer</option>
                              <option>Distributer</option>
                              <option>Retailer</option>
                            </Form.Control>
                          </Form.Group>
                        </fieldset>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend>LISENCE NO</legend>
                          <input
                            type="text"
                            name="LcNo"
                            required
                            onChange={this.handleChange}
                            className="sign-in-field"
                            style={{ textIndent: 35 }}
                          />
                        </fieldset>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
                          <legend>LOCATION</legend>
                          <input
                            type="text"
                            name="Location"
                            list="data"
                            required
                            onChange={this.handleChange}
                            className="sign-in-field"
                            style={{ textIndent: 35 }}
                          />
                          <datalist id="data">
                            {this.state.data.map((k) => (
                              <option key={k} value={k} />
                            ))}
                          </datalist>
                        </fieldset>
                      </div>
                      <div className="col-6 mb-5">
                        <fieldset>
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
                        <span
                          style={{ color: "red", float: "left", fontSize: 16 }}
                        >
                          {this.state.formErrors.password}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="formbut mt-2"
                      onClick={this.handleFormSubmit1}
                    >
                      SIGN UP
                    </Button>
                  </form>
                </div>

                <div className="Lredirectdiv">
                  <span>Already a member</span>
                  <a className="clickonme ml-2" href="/Login">
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
          {}

          <div className="col-4 col-md-5">
            <div style={{ position: "relative", height: "100%"}}>
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
                    transaction of medicines from manufacturer to distributor to
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

export default Register;
