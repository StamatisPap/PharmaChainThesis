import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import AuthService from "../AuthService/AuthService.js";
import UserInfo from "./UserInfo.js";
import "./Admin_Home.css";
import { FaTruck, FaIndustry, FaStore, FaUserCircle} from "react-icons/fa";


class UserCard extends Component {
  UNSAFE_componentWillMount() {
    this.getUsers();
  }

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      userList: [],
      manuc: null,
      distc: null,
      retac: null,
    };
  }
  getUsers = () => {
    let manuc = 0;
    let distc = 0;
    let retac = 0;
    let displayCount, displayUser;
    this.Auth.fetch("http://localhost:5000/api/displayallusers", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => {
        const displayUser = res.filter((user) => {
          return !user.isAdmin && user.accepted === true;
        });
        this.setState({ userList: displayUser });

        displayCount = res.filter((user) => {
          if (user.typeofuser === "Manufacturer" && !user.isAdmin) {
            manuc = manuc + 1;
          }
          this.setState({ manuc: manuc });

          if (user.typeofuser === "Distributer" && !user.isAdmin) {
            distc = distc + 1;
          }
          this.setState({ distc: distc });

          if (user.typeofuser === "Retailer" && !user.isAdmin) {
            retac = retac + 1;
          }
          this.setState({ retac: retac });
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  getTypeOfUser = (type) => {
    console.log(this.state.userList);
    let displayUser;
    if (type !== "All") {
      displayUser = this.state.userList.filter((user) => {
        return user.typeofuser === type;
      });
    } else {
      displayUser = this.state.userList;
    }
    console.log(displayUser);
    this.setState({ displayUserList: displayUser });
  };

  render() {
    if (this.state.displayUserList >=0) {
      return (
        <div className="container mt-5 tabs-container">
          <a 
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("All")}
          >
            <FaUserCircle className="mr-5"/>
            <span className="mr-5">ALL</span> {this.state.userList.length}
          </a>
          <a
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("Manufacturer")}
          >
            <FaIndustry className="mr-5"/>
            <span className="mr-5">Manufacturer</span> {this.state.manuc}
          </a>
          <a
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("Distributer")}
          >
            <FaTruck className="mr-5" />
            <span className="mr-5">Distributers</span> {this.state.distc}
          </a>
          <a
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("Retailer")}
          >
            <FaStore className="mr-5"/>
            <span className="mr-5">Retailers</span> {this.state.retac}
          </a>

          <Container style={{ marginTop: 50 }}>
            <Row>
              {this.state.displayUserList.map((user, index) => (
                <UserInfo user={user} index={index} key={index} />
              ))}
            </Row>
          </Container>
        </div>
      );
    }
     if (this.state.userList.length >=0) {
      return (
        <div className="container mt-5 tabs-container">
          <a
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("All")}
          >
            <FaUserCircle className="mr-5"/>
            <span className="mr-5">ALL</span> {this.state.userList.length}
          </a>
          <a
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("Manufacturer")}
          >
            <FaIndustry className="mr-5"/>
            <span className="mr-5">Manufacturer</span> {this.state.manuc}
          </a>
          <a
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("Distributer")}
          >
            <FaTruck className="mr-5" />
            <span className="mr-5">Distributers</span> {this.state.distc}
          </a>
          <a
            href="!#"
            className="type-container"
            onClick={(event) => this.getTypeOfUser("Retailer")}
          >
            <FaStore className="mr-5"/>
            <span className="mr-5">Retailers</span>{this.state.retac}
          </a>

          <Container style={{ marginTop: 50 }}>
            <Row>
              {this.state.userList.map((user, index) => (
                <UserInfo user={user} index={index} key={index} />
              ))}
            </Row>
          </Container>
        </div>
      );
    }
  }
}
export default UserCard;
