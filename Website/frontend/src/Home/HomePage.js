import React, { Component } from "react";
import AdminNav from "../Admin_Home/AdminNav";
import "./Home.css";

const loginBackground = require("../Assets/loginBackground.png");
const pharmacist = require("../Assets/pharmacist.png");

class HomePage extends Component {
  render() {
    return (
      <div className="index-background">
        <AdminNav homeUrl="/" notifUrl="/" history={this.props.history} />
        <div>
          <div className="container">
            <div className="row d-none d-lg-flex d-xl-flex align-items-center"
            style={{ height: "calc(100vh - 90px)" }}
            
            >
              {/* <div className="col-3 d-flex align-items-center" style={{ height: "calc(100vh - 90px)" }}>
                <img src={pharmacist} alt="pharmacist" className="pharmacist" />
              </div> */}
            <div className="col-9 mt-4" 
            // style={{ height: "calc(100vh - 90px)" }}
            >
                <div className="text-container">
                  <h1
                    style={{
                      fontWeight: 600,
                      fontSize: "55px",
                      color: "#FFF",
                      marginBottom: "40px",
                      // left: "40px",
                      // position: "relative"
                    }}
                  >
                    Welcome to our{" "}
                    <span style={{ color: "#4AE8C7" }}>Pharmachain</span>
                  </h1>
                  <div
                  //  style={{ marginLeft: "100px" }}
                   >
                    <h2
                      style={{
                        fontWeight: 400,
                        fontSize: "45px",
                        color: "#FFF",
                        marginBottom: "40px",
                      }}
                    >
                      We Provide Best <br /> Security for Our Chain!
                    </h2>
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#FFF",
                        // padding: "0 120px",
                      }}
                    >
                      {" "}
                      Welcome on board, User. This app provides traceability of medicine products across
                      stakeholders and security of transactions between them. Login either as administrator 
                      to supervise all the users of the chain or as one of these types: manufacturer to
                      create the medicine, distributor to distribute the product in the shops
                      or retailer to sell to the end customer. Have a nice journey!
                    </p>
                  </div>
                </div>
              </div>
                <div className="col-3 d-flex align-items-end"
                style={{minHeight:'100%'}}
                //  style={{ height: "calc(100vh - 90px)" }}
                 >
                <img src={pharmacist} alt="pharmacist" className="pharmacist" />
              </div>
            </div>

            <div className="row d-block d-lg-none d-xl-none ">
              <div className="col-12 mt-5">
                <img
                  src={loginBackground}
                  alt="loginBackground"
                  style={{
                    width: "100%",
                    height: "500px",
                    border: "1px solid rgba(255, 255, 255, 0.7)",
                    boxShadow: "0px 20px 10px rgba(64, 64, 64, 0.15)",
                    borderRadius: "6px",
                  }}
                />
                <img
                  src={pharmacist}
                  alt="pharmacist"
                  style={{
                    width: "50%",
                    height: "auto",
                    position: "absolute",
                    left: "50%",
                    bottom: "0",
                    transform: "translate(-50%, -0%)",
                  }}
                />
              </div>
              <div className="col-12">
                <div className="text-center mt-5">
                  <h1
                    style={{
                      fontWeight: 600,
                      fontSize: "55px",
                      color: "#FFF",
                    }}
                    className="mb-5"
                  >
                    Welcome to our{" "}
                    <span style={{ color: "#4AE8C7" }}>Pharmachain</span>
                  </h1>
                  <div className="pb-5">
                    <h2
                      style={{
                        fontWeight: 400,
                        fontSize: "45px",
                        color: "#FFF",
                      }}
                      className="mb-3"
                    >
                      We Provide Best <br /> Security for Our Chain!
                    </h2>
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#FFF",
                      }}
                    >
                      {" "}
                      Welcome on board, User. This app provides traceability of medicine products across
                      stakeholders and security of transactions between them. Login either as administrator 
                      to supervise all the users of the chain or as one of these types: manufacturer to
                      create the medicine, distributor to distribute the product in the shops
                      or retailer to sell to the end customer. Have a nice journey!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
