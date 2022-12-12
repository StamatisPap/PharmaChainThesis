import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AdminNav from "../Admin_Home/AdminNav";
import web3 from "../web3";
import swal from "sweetalert";
import { GoPlus, GoSearch } from "react-icons/go";
import supplychain from "../supplychain";
import Modal from "react-bootstrap/Modal";
import AuthService from "../AuthService/AuthService";
import Transactions from "../Manufacturer/Transactions";

class UserHome extends Component {
  UNSAFE_componentWillMount() {
    this.updateLoginAccountStatus();

    //this.getTrans();
    //this.getNotifs();
    this.getMaxId();
    this.Auth.fetch("http://localhost:5000/api/getuser", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => {
        console.log(res);
        this.setState({
          typeofuser: res.typeofuser,
          name: res.userName,
          addrs: res.address,
          accepted: res.accepted,
          accountName: res.name,
        });
        this.getTrans(res.userName);
        this.getNotifs(res.userName);
        web3.eth.getAccounts((err, accounts) => {
          // console.log(err, accounts)
          if (err) {
            // console.log('An error occurred ' + err);
          } else if (accounts[0] !== res.address) {
            // alert( 'Please login into MetaMask with your registered account..!');
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

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      mytry: true,
      id: "",
      loading: false,
      addmedi: false,
      name: "",
      notifi: false,
      showForward: false,
      typeofuser: "",
      Name: "",
      results: [],
      notif: [],
      medname: "",
      manuname: "",
      sid: "",
      eid: "",
      to: "",
      toname: "",
      medlist: [],
      color: ["rgba(252, 222, 251,0.1)"],
      accountName: "",
      showeid: "",
      maxeid: "",
      passmedname: "",
      addMedicineShow: false,
      sellMedicineShow: false,
      errorMsg: null,
    };
  }

  logout = () => {
    this.Auth.logout();
    this.setState();
  };

  updateLoginAccountStatus = () => {
    web3.eth.getAccounts((err, accounts) => {
      // console.log(err, accounts)
      if (err) {
        // console.log('An error occurred ' + err);
      } else if (accounts.length === 0) {
        // alert( 'Please login to MetaMask..!');

        swal({
          title: "Please Note",
          text: "Please login to MetaMask..!",
          icon: "warning",
          dangerMode: true,
        }).then((a) => {
          this.logout();
          window.location.reload();
        });
      }
    });

    this.Auth.fetch("http://localhost:5000/api/getuser", {
      method: "POST",
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.accepted === false) {
        swal({
          title: "Please Note",
          text: "Admin Not Approve you yet Please Wait",
          icon: "warning",
          dangerMode: true,
        }).then((a) => {
          this.logout();
          this.props.history.replace("/Login");
        });
      }
    });
  };

  fillRange = (start, end) => {
    var a = new Array(end - start + 1);
    var i = 0;
    for (i = 0; i <= end - start; i++) a[i] = Number(start) + i;

    return a;
  };

  handleChange = (e) => {
    this.setState({ errorMsg: null });
    let x = e.target.name;
    if (x === "eid") {
      if (e.target.value < this.state.maxeid) {
        this.setState({ errorMsg: "Must be greater than start id" });
      }
    }
    this.setState({
      [x]: e.target.value,
    });
    this.getTrans();
  };

  getTrans = (name) => {
    web3.eth
      .getAccounts()
      .then((r) => {
        // console.log(r[0] + " This is current account address");
        // console.log(this.state.Name)
        console.log(name, "name")
        this.Auth.fetch("http://localhost:5000/api/gettrans", {
          method: "POST",
          body: JSON.stringify({
            acc: r[0],
            name: name? name: this.state.name
          }),
        })
          .then((res) => {
            console.log(res);
            this.setState({ results: res });
            console.log(res);
            // console.log("This is Transaction ", this.state.results)
          })
          .catch((err) => {
            // console.log(err)
          });
      })
      .catch((err) => {
        //  console.log(err)
      });
  };

  getNotifs = (name) => {
    web3.eth
      .getAccounts()
      .then((r) => {
        // console.log(r[0]);
        console.log(name, "name")
        this.Auth.fetch("http://localhost:5000/api/getnotifs", {
          method: "POST",
          body: JSON.stringify({
            acc: r[0],
            name: name? name: this.state.name
          }),
        })
          .then((res) => {
            this.setState({ notif: res });
            console.log(res);
          })
          .catch((err) => {
            // console.log(err)
          });
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  getMaxId = () => {
    this.Auth.fetch("http://localhost:5000/api/givemaxeid", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => {
        console.log(res);
        if(res.length)
        {
          let a = Math.max(...res);
          if (a === "-Infinity") {
            this.setState({ maxeid: 100 });
          } else {
            this.setState({ maxeid: a + 1 });
          }
          // console.log("HHHHHHHHHHHHHHHHHHHHHH", this.state)
        }
        else {
          this.setState({ maxeid: 1 });
        }  
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  addMedicine = () => {
    this.setState({ addMedicineShow: true });
  };

  hideMedicine = () => {
    this.setState({ addMedicineShow: false });
  };

  sellMedicine = () => {
    this.setState({ sellMedicineShow: true });
  };

  hideSellMedicine = () => {
    this.setState({ sellMedicineShow: false });
  };

  addmed = () => {
    this.getTrans();
    this.hideSellMedicine();
    this.hideMedicine();
    // alert("Please accept the transaction in metamask and reject if any error")
    swal({
      title: "Please Note",
      text: "Please accept the transaction in metamask and reject if any error",
      icon: "success",
      dangerMode: true,
    }).then((willDelete) => {
      this.setState({ loading: true });
      const a = web3.eth
        .getAccounts()
        .then((r) => {
          // console.log(r[0]);
          // console.log(this.state.typeofuser)
          if (this.state.typeofuser === "Manufacturer") {
            var date = new Date();
            // console.log(Number(this.state.expire))
            date.setDate(date.getDate() + Number(this.state.expire));
            // console.log(date);
            var dst = date.toString();
           
              const am = supplychain.methods
                .setmed(
                  this.state.medname,
                  this.state.maxeid,
                  this.state.eid,
                  this.state.to,
                  this.state.expire,
                  dst
                )
                .send({
                  from: r[0],
                })
                .then((re) => {
                  const allLines = this.fillRange(
                    this.state.maxeid,
                    this.state.eid
                  );

                  // console.log(re.transactionHash)
                  this.Auth.fetch("http://localhost:5000/api/addmed", {
                    method: "POST",
                    body: JSON.stringify({
                      tid: re.transactionHash,
                      name: this.state.medname,
                      Mname: this.state.name,
                      sid: this.state.maxeid,
                      eid: this.state.eid,
                      medlist: allLines,
                      to: this.state.to,
                      toname: this.state.toname,
                      acc: r[0],
                      exp: date,
                    }),
                  })
                    .then((res) => {
                      // console.log(res)
                      this.setState({ loading: false });
                      // console.log(this.state)
                      window.location.reload();
                    })
                    .catch((err) => {
                      // console.log(err)
                    });
                })
                .catch((err) => {
                  // console.log(err)
                  this.setState({ loading: false });
                });
            
         

            // I'm deliberately missing gas option here
            // const data = await contract.methods.myMethod().send({ from: account, gasPrice });
          }
          if (this.state.typeofuser === "Distributer") {
            let id = this.state.id;
            // console.log(id)
            const am = supplychain.methods
              .setdistdetails(this.state.to, this.state.sid, this.state.eid)
              .send({
                from: r[0],
              })
              .then((re) => {
                // console.log("this is very good", re)
                // console.log(re.transactionHash)
                this.Auth.fetch("http://localhost:5000/api/setdist", {
                  method: "POST",
                  body: JSON.stringify({
                    tid: re.transactionHash,
                    medname: this.state.passmedname,
                    sid: this.state.sid,
                    eid: this.state.eid,
                    to: this.state.to,
                    toname: this.state.toname,
                    acc: r[0],
                  }),
                })
                  .then((res) => {
                    this.setState({ results: res, loading: false });
                    // console.log(this.state)
                    this.Auth.fetch("http://localhost:5000/api/updatenot", {
                      method: "POST",
                      body: JSON.stringify({
                        Id: id,
                        med: this.state.eid - this.state.sid + 1,
                        //send id and remove from notifs
                      }),
                    })
                      .then((res) => {
                        this.setState({ id: "" });
                        // console.log(this.state)
                        window.location.reload();
                      })
                      .catch((err) => {
                        // console.log(err)
                      });
                  })
                  .catch((err) => {
                    // console.log(err)
                  });
              })
              .catch((err) => {
                // console.log(err)
                this.setState({ loading: false });
              });
          }
          if (this.state.typeofuser === "Retailer") {
            let id = this.state.id;
            const am = supplychain.methods
              .sell(this.state.sid)
              .send({
                from: r[0],
              })
              .then((re) => {
                // console.log(re.transactionHash)
                this.Auth.fetch("http://localhost:5000/api/sell", {
                  method: "POST",
                  body: JSON.stringify({
                    tid: re.transactionHash,
                    medname: this.state.passmedname,
                    sid: this.state.sid,

                    acc: r[0],
                  }),
                })
                  .then((res) => {
                    this.setState({ loading: false });
                    // console.log(this.state)
                    this.Auth.fetch("http://localhost:5000/api/updatenot", {
                      method: "POST",
                      body: JSON.stringify({
                        Id: id,
                        med: 1,
                        //send id and remove from notifs
                      }),
                    })
                      .then((res) => {
                        this.setState({ loading: false });
                        // console.log(this.state)
                        window.location.reload();
                      })
                      .catch((err) => {
                        // console.log(err)
                      });
                  })
                  .catch((err) => {
                    // console.log(err)
                  });
              })
              .catch((err) => {
                // console.log(err)
                this.setState({ loading: false });
              });
          }
        })
        .catch((err) => {
          // console.log(err)
          this.setState({ loading: false });
        });
      this.setState();
    });
  };

  render() {
    if (this.state.results.length > 0) {
      this.state.results = this.state.results.filter((send) => {
        return send.transid.indexOf(this.state.Name) !== -1;
      });
    }
    return (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-5 col-xs-12">
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "rgba(0, 0, 0, 0.7)",
                }}
              >
                Welcome
              </h2>
            </div>
            <div className="col-md-7 col-xs-12">
              <div>
                <input
                  type="text"
                  name="Name"
                  className="searchinput speclassi"
                  placeholder="Enter Transaction Id"
                  onChange={this.handleChange}
                  style={{ float: "left", textIndent: 8 }}
                ></input>
                <GoSearch
                  style={{
                    float: "left",
                    marginTop: 5,
                    marginLeft: -30,
                    fontSize: 22,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          </div>
          <div>
          <h2
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "rgba(0, 0, 0, 0.7)",
                }}
              >{this.state.name}, {this.state.typeofuser}
              </h2>
          </div>
          <hr />
          <div className="row justify-content-end">

            {this.state.typeofuser === "Manufacturer" && (
              <>
              <GoPlus
              style={{
                float: "left",
                marginTop: 5,
                marginRight: -22,
                fontSize: 22,
                opacity: 0.8,
                color: "#1A957B",
              }}
            />
              <button
                onClick={this.addMedicine}
                className="medicine--button mb-5"
              >
                Add Medicine
              </button>
              </>
            )}
            {this.state.typeofuser === "Retailer" && (
              <button
                onClick={this.sellMedicine}
                className="medicine--button mb-5"
              >
                Sell Medicine
              </button>
            )}
          </div>
          <div className="row">
            {this.state.results.map((r, index) => (
              <Transactions transaction={r} index={index} key={index} />
            ))}
          </div>

          <Modal show={this.state.addMedicineShow} onHide={this.hideMedicine}>
            <Modal.Header
              closeButton
              className="modal--header"
              style={{ height: "auto" }}
            >
              <Modal.Title
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#015F4B",
                }}
              >
                ADD MEDICINE
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <fieldset>
                    <legend>MEDICINE NAME</legend>
                    <input
                      type="text"
                      name="medname"
                      required
                      onChange={this.handleChange}
                      className="sign-in-field"
                      style={{ textIndent: 10 }}
                    />
                  </fieldset>
                </div>
                <div className="col-md-6 col-12">
                  <fieldset>
                    <legend>EXPIRY DATE(in days)</legend>
                    <input
                      type="text"
                      name="expire"
                      required
                      onChange={this.handleChange}
                      className="sign-in-field"
                      style={{ textIndent: 10 }}
                    />
                  </fieldset>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <fieldset>
                    <legend>START ID</legend>
                   
                      <input
                        type="text"
                        name="maxeid"
                        readOnly
                        required
                        value={this.state.maxeid}
                        className="sign-in-field"
                        style={{ textIndent: 10 }}
                        placeholder="Fetching id for you..........."
                      />
                   
                  </fieldset>
                </div>
                <div className="col-md-6 col-12">
                  <fieldset>
                    <legend>END ID</legend>
                    <input
                      type="text"
                      name="eid"
                      required
                      placeholder="Must be greater than Start id"
                      onChange={this.handleChange}
                      className="sign-in-field"
                      style={{ textIndent: 10 }}
                    />
                  </fieldset>
                  <span className="text-danger">{this.state.errorMsg}</span>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-6 col-12">
                  <fieldset>
                    <legend>DISTRIBUTER ADDRESS</legend>
                    <input
                      type="text"
                      name="to"
                      required
                      onChange={this.handleChange}
                      className="sign-in-field"
                      style={{ textIndent: 10 }}
                    />
                  </fieldset>
                </div>
                <div className="col-md-6 col-12">
                  <fieldset>
                    <legend>DISTRIBUTER NAME</legend>
                    <input
                      type="text"
                      name="toname"
                      required
                      onChange={this.handleChange}
                      className="sign-in-field"
                      style={{ textIndent: 10 }}
                    />
                  </fieldset>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ border: "none" }}>
              <Button
                variant="secondary"
                onClick={this.hideMedicine}
                className="cancel--button"
              >
                Cancel
              </Button>
              <Button
                variant="outline-primary"
                className="accept--button"
                onClick={this.addmed}
              >
                Add Medicine
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={this.state.sellMedicineShow}
            onHide={this.hideSellMedicine}
          >
            <Modal.Header
              closeButton
              className="modal--header"
              style={{ height: "auto" }}
            >
              <Modal.Title
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#015F4B",
                }}
              >
                Sell Medicine
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <fieldset>
                <legend>MEDICINE ID</legend>
                <input
                  type="text"
                  name="sid"
                  required
                  value={this.state.sid}
                  onChange={this.handleChange}
                  className="sign-in-field"
                  style={{ textIndent: 10 }}
                  placeholder="Click on Forward From Notification to sell"
                />
              </fieldset>
            </Modal.Body>
            <Modal.Footer style={{ border: "none" }}>
              <Button
                variant="secondary"
                onClick={this.hideMedicine}
                className="cancel--button"
              >
                Cancel
              </Button>
              <Button
                variant="outline-primary"
                className="accept--button"
                onClick={this.addmed}
              >
                Sell Medicine
              </Button>
            </Modal.Footer>
          </Modal>
          {this.state.loading && (
            <div className="spinner-border spinner-position" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default UserHome;
