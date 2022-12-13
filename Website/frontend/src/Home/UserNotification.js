import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";
import web3 from "../web3";
import swal from "sweetalert";
import AuthService from "../AuthService/AuthService";
import supplychain from "../supplychain";
import Modal from "react-bootstrap/Modal";

class UserNotification extends Component {
  UNSAFE_componentWillMount() {
    this.updateLoginAccountStatus();

    //this.getNotifs();
    //this.getTrans();
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
      addmediDist: false,
      name: "",
      notifi: false,
      showForward: false,
      typeofuser: "",
      Name: "",
      results: [],
      notif: [],
      finalResults: [],
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
      errorMsg: null,
    };
  }

  handleChange = (e) => {
    this.setState({ errorMsg: null });
    let x = e.target.name;
    if (x === "eid") {
      if (e.target.value < this.state.sid) {
        this.setState({ errorMsg: "Must be greater than start id" });
      }
    }
    this.setState({
      [x]: e.target.value,
    });
    this.getTrans();
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
  };

  getMaxId = () => {
    this.Auth.fetch("http://localhost:5000/api/givemaxeid", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => {
        console.log(res);
        let a = Math.max(...res);
        if (a === "-Infinity") {
          this.setState({ maxeid: 100 });
        } else {
          this.setState({ maxeid: a + 1 });
        }
        // console.log("HHHHHHHHHHHHHHHHHHHHHH", this.state)
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  getNotifs = (name) => {
    web3.eth
      .getAccounts()
      .then((r) => {
        // console.log(r[0]);
        this.Auth.fetch("http://localhost:5000/api/getnotifs", {
          method: "POST",
          body: JSON.stringify({
            acc: r[0],
            name: name? name: this.state.name
            
          }),
        })
          .then((res) => {
            this.setState({ notif: res });
            this.setState({ finalResults: res });
            console.log(res);

            // let resultDeclined = [];

            // for (let i = 0; i < res.length; i++) {
            //   console.log(res[i].sid);

            //   const val = supplychain.methods
            //     .isValidCall(res[i].sid)
            //     .call()
            //     .then((re) => {
            //       console.log(re);
            //       if (re === true) {
            //         resultDeclined.push(res[i]);
            //       }

            //       this.setState({ finalResults: resultDeclined });
            //     })
            //     .catch((err) => {
            //       this.setState({ loading: false });
            //     });
            //   console.log(val);
            // }
          })
          .catch((err) => {
            // console.log(err)
          });
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
    this.setState({ addmedi: false });
    this.setState({ addmediDist: false });
  };

  acceptDeclined = (sid, eid, from, to, id, medname, expire) => {
    this.setState({ id: id, sid: sid,eid, medname: medname, expire: 5, maxeid: sid, to: to });
    if(this.state.typeofuser === "Distributer")
    {
      this.setState({ addmedi: true})
    } 
    if(this.state.typeofuser === "Manufacturer")
    {
      this.setState({ addmediDist: true})
    }  
   // this.acceptHandler(sid, eid, from, id)
    // swal({
    //   title: "Please Note",
    //   text: "Please accept the transaction in metamask and reject if any error",
    //   icon: "success",
    //   dangerMode: true,
    // }).then((willDe) => {
    //   this.setState({ loading: true });
    //   web3.eth
    //     .getAccounts()
    //     .then((r) => {
    //       supplychain.methods
    //         .acceptDeclined(sid, eid, from, to)
    //         .send({
    //           from: r[0],
    //         })

    //         .then((re) => {
    //           this.setState({ showForward: true });
    //           this.getNotifs();
    //           this.setState({ loading: false });
    //           this.setState({});
    //         })
    //         .catch((err) => {
    //           this.setState({ loading: false });
    //         });
    //     })
    //     .catch((err) => {});
    // });


  };

  fillRange = (start, end) => {
    var a = new Array(end - start + 1);
    var i = 0;
    for (i = 0; i <= end - start; i++) a[i] = Number(start) + i;

    return a;
  };

  forwardHandler = (id, medlist, sid, passmedname) => {
    this.setState({ id: id, sid: sid });
    let a = medlist.length;
    var b = "Max " + medlist[a - 1];
    this.setState({ showeid: b });
    // console.log(medlist)
    this.setState({ medlist: medlist });

    if (this.state.typeofuser === "Distributer") {
      this.setState({ addmedi: true });
    }
    if (this.state.typeofuser === "Retailer") {
      this.setState({ addMedicineShow: true });
    }

    this.setState({ notifi: false, passmedname: passmedname });
  };

  acceptHandler = (sid, eid, from, id) => {
    // alert("Please accept the transaction in metamask and reject if any error")
    swal({
      title: "Please Note",
      text: "Please accept the transaction in metamask and reject if any error",
      icon: "success",
      dangerMode: true,
    }).then((willDe) => {
      this.setState({ loading: true });
      web3.eth
        .getAccounts()
        .then((r) => {
          // console.log(from)
          if (this.state.typeofuser === "Distributer") {
            supplychain.methods
              .acceptdist(sid, eid, from)
              .send({
                from: r[0]
              })
              .then((re) => {
                this.setState({ showForward: true, loading: false });
                this.Auth.fetch("http://localhost:5000/api/acceptmeds", {
                  method: "POST",
                  body: JSON.stringify({
                    //send id
                    Id: id,
                  }),
                })
                  .then((res) => {
                    this.getNotifs();
                    this.setState({ results: res });
                    // console.log(this.state)
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
            supplychain.methods
              .setretaildetails(sid, eid, from)
              .send({
                from: r[0],
              })
              .then((re) => {
                this.setState({ showForward: true, loading: false });
                this.Auth.fetch("http://localhost:5000/api/acceptmeds", {
                  method: "POST",
                  body: JSON.stringify({
                    //send id
                    Id: id,
                  }),
                })
                  .then((res) => {
                    this.getNotifs();
                    this.setState({ results: res });
                    // console.log(this.state)
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
        });
    });
  };

  declineHandler = (sid, eid, from, id, medname) => {
    const allLine = this.fillRange(sid, eid);
    // console.log("this is med name", medname);
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
            .decline(sid, eid, from)
            .send({
              from: r[0],
            })
            .then((re) => {
              this.setState({ showForward: true });
              this.Auth.fetch("http://localhost:5000/api/rejectmeds", {
                method: "POST",
                body: JSON.stringify({
                  //send id
                  Id: id,
                  sid: sid,
                  eid: eid,
                  medlist: allLine,
                  medname: medname,
                  tid: re.transactionHash,
                }),
              })
                .then((res) => {
                  this.getNotifs();
                  this.setState({ loading: false });
                  this.getNotifs();
                  this.setState({});
                  // console.log(this.state)
                })
                .catch((err) => {
                  // console.log(err)
                });
            })
            .catch((err) => {
              // console.log(err)
              this.setState({ loading: false });
            });
        })
        .catch((err) => {
          // console.log(err)
        });
    });
    // alert("Please accept the transaction in metamask and reject if any error")
  };

  getTrans = (name) => {
    web3.eth
      .getAccounts()
      .then((r) => {
        // console.log(r[0] + " This is current account address");
        // console.log(this.state.Name)
        console.log(name, "username")
        this.Auth.fetch("http://localhost:5000/api/gettrans", {
          method: "POST",
          body: JSON.stringify({
            acc: r[0],
            name: name? name: this.state.name
          }),
        })
          .then((res) => {
            this.setState({ results: res });
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

  addmed = () => {
    this.getTrans();
    this.hideMedicine();
    // alert("Please accept the transaction in metamask and reject if any error")
    swal({
      title: "Please Note",
      text: "Please accept the transaction in metamask and reject if any error",
      icon: "success",
      dangerMode: true,
    }).then((willDelete) => {
      this.setState({ loading: true });
      web3.eth
        .getAccounts()
        .then((r) => {
          console.log(r[0]);
          // console.log(this.state.typeofuser)
          if (this.state.typeofuser === "Manufacturer") {
            var date = new Date();
            // console.log(Number(this.state.expire))
            date.setDate(date.getDate() + Number(this.state.expire));
            // console.log(date);
            var dst = date.toString();
            supplychain.methods
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
                    this.setState({ results: res, loading: false });
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
            console.log(id);
            supplychain.methods
              .setdistdetails(this.state.to, this.state.sid, this.state.eid)
              .send({
                from: r[0],
              })
              .then((re) => {
                // console.log("this is very good", re);
                // console.log(re.transactionHash);
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
                        console.log(res);
                        this.setState({ results: res, id: "" });
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
            supplychain.methods
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
                    this.setState({ results: res, loading: false });
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
                        this.setState({ results: res, id: "" });
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

  acceptDeclined2 = () => {
    this.getTrans();
    this.hideMedicine();
    swal({
      title: "Please Note",
      text: "Please accept the transaction in metamask and reject if any error",
      icon: "success",
      dangerMode: true,
    }).then((willDelete) => {
      this.setState({ loading: true });
      web3.eth
        .getAccounts()
        .then((r) => {
          console.log(r[0]);
          if (this.state.typeofuser === "Manufacturer") {
            var date = new Date();
            date.setDate(date.getDate() + Number(this.state.expire));
            supplychain.methods
              .sendmedtodistributor(
                this.state.sid, this.state.eid, this.state.to
                )
              .send({
                from: r[0]
              })
          }
        })
      }
  )}

  destroyHandler = (sid, eid) => {
    this.getTrans();
    this.hideMedicine();
    swal({
      title: "Please Note",
      text: "Please accept the transaction in metamask and reject if any error",
      icon: "success",
      dangerMode: true,
    }).then((willDelete) => {
      this.setState({ loading: true });
      web3.eth
        .getAccounts()
        .then((r) => {
          console.log(r[0]);
          
            var date = new Date();
            date.setDate(date.getDate() + Number(this.state.expire));
            supplychain.methods.destroymed(sid, eid)
              .send({from: r[0]})
              .then((re) => {
            
                this.Auth.fetch("http://localhost:5000/api/destroymed", {
                  method: "POST",
                  body: JSON.stringify({
                 
                    sid,
                    eid
                    
                  }),
                })
                  .then((res) => {
                    this.getNotifs();
                    this.setState({ loading: false });
                    this.getNotifs();
                    this.setState({});
                  })
                  .catch((err) => {
                    console.log(err)
                  });
              })
        })
    })
  }
  
  render() {
    return (
      <>
        <div className="container mt-5">
          {this.state.finalResults.length <= 0 && (
            <div style={{ marginTop: "200px" }}></div>
          )}
          <div className="row">
            {this.state.finalResults.map((r, index) => (
              <Col xs={12} md={6} className="transaction-container" key={index}>
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
                    {r.transid}
                  </Card.Header>
                  <Card.Body style={{ background: "#F8F8FF" }}>
                    {/* <Card.Title>{r.transid}</Card.Title> */}
                    {
                      // console.log(r)
                    }
                    {r.medname !== undefined ? (
                      <div>
                        <p className="CardTitle transaction-title">
                          Medicine Name :{" "}
                        </p>
                        <p
                          className="CardContent"
                          style={{ color: "blue", fontWeight: 500 }}
                        >
                          {r.medname}
                        </p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                    <p className="CardTitle transaction-title">From : </p>
                    <p className="CardContent transaction-value">{r.name}</p>
                    <p className="CardTitle transaction-title">Address : </p>
                    <p className="CardContent transaction-value">{r.from}</p>
                    <p className="CardTitle transaction-title">To : </p>
                    <p className="CardContent transaction-value">{r.Toname}</p>

                    <p className="CardTitle transaction-title">Address: </p>
                    <p className="CardContent transaction-value">{r.to}</p>

                    <p className="CardTitle transaction-title">Sid : </p>
                    <p className="CardContent transaction-value">{r.sid}</p>
                    <p className="CardTitle transaction-title">Eid : </p>
                    <p className="CardContent transaction-value">{r.eid}</p>
                    <p className="CardTitle transaction-title">
                      Number Of Meds :{" "}
                    </p>
                    <p className="CardContent transaction-value">{r.meds}</p>
                  </Card.Body>
                  {this.state.typeofuser === "Retailer" && (
                    <Card.Footer style={{ background: "#FFF" }}>
                      {r.accepted === false ? (
                        <div>
                          <Button
                            variant="outline-success"
                            className="accept--button mr-3"
                            onClick={() =>
                              this.acceptHandler(r.sid, r.eid, r.from, r._id)
                            }
                            value={r}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="cancel--button"
                            style={{
                              background: "rgba(239, 0, 0, 0.05)",
                              color: "#D12020",
                              border: "1px solid #D12020",
                            }}
                            onClick={() =>
                              this.declineHandler(
                                r.sid,
                                r.eid,
                                r.from,
                                r._id,
                                r.medname
                              )
                            }
                            value={r}
                          >
                            Decline
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline-primary"
                          className="accept--button"
                          onClick={() => {
                            this.forwardHandler(
                              r._id,
                              r.medlist,
                              r.sid,
                              r.medname
                            );
                          }}
                        >
                          Forward
                        </Button>
                      )}
                    </Card.Footer>
                  )}

                  {this.state.typeofuser === "Manufacturer" && (
                    <Card.Footer style={{ background: "#FFF" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="outline-success"
                        className="abut text-white"
                        onClick={() => {
                          console.log(this.state.eid)
                          this.acceptDeclined(r.sid, r.eid, r.from, r.to, r._id, r.medname, r.exp);

                        }}

                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        FORWARD
                      </Button>
                      <Button
                            variant="outline-danger"
                            className="cancel--button"
                            style={{
                              background: "rgba(239, 0, 0, 0.05)",
                              color: "#D12020",
                              border: "1px solid #D12020",
                            }}
                            onClick={() =>
                              this.destroyHandler(
                                r.sid,
                                r.eid
                              )
                            }
                            value={r}
                          >
                            DESTROY
                      </Button>
                      </div>
                    </Card.Footer>
                  )}
                  {this.state.typeofuser === "Distributer" && (
                    <Card.Footer>
                      {r.accepted === false ? (
                        <div>
                          {r.msg ? (
                            <Button
                              variant="outline-success"
                              className="abut text-white"
                              onClick={() =>
                                this.acceptDeclined(r.sid, r.eid, r.from, r.to, r._id)
                              }
                              value={r}
                            >
                              FORWARD
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="outline-success"
                                className="abut text-white"
                                onClick={() =>
                                  this.acceptHandler(
                                    r.sid,
                                    r.eid,
                                    r.from,
                                    r._id
                                  )
                                }
                                value={r}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline-danger"
                                className="rejectBut abut"
                                onClick={() =>
                                  this.declineHandler(
                                    r.sid,
                                    r.eid,
                                    r.from,
                                    r._id,
                                    r.medname
                                  )
                                }
                                value={r}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <Button
                          variant="outline-success"
                          className="abut text-white"
                          onClick={() => {
                            this.forwardHandler(
                              r._id,
                              r.medlist,
                              r.sid,
                              r.medname
                            );
                          }}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Forward
                        </Button>
                      )}
                    </Card.Footer>
                  )}
                </Card>
              </Col>
            ))}
          </div>
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
        <Modal show={this.state.addmedi} onHide={this.hideMedicine}>
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
            {/*}  <div className="row mb-3">
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
            </div> */}

            <div className="row mb-3">
              <div className="col-md-6 col-12">
                <fieldset>
                  <legend>START ID</legend>
                  <input
                    type="text"
                    name="sid"
                    readOnly
                    required
                    value={this.state.sid}
                    className="sign-in-field"
                    style={{ textIndent: 10 }}
                  />
                </fieldset>
              </div>
              <div className="col-md-6 col-12">
                <fieldset>
                  <legend>END ID</legend>
                  <input
                    type="text"
                    name="eid"
                    readOnly
                    required
                    value={this.state.eid}
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
                  <legend>RETAILER ADDRESS</legend>
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
                  <legend>RETAILER NAME</legend>
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
        <Modal show={this.state.addmediDist} onHide={this.hideMedicine}>
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
            {/*}  <div className="row mb-3">
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
            </div> */}

            <div className="row mb-3">
              <div className="col-md-6 col-12">
                <fieldset>
                  <legend>START ID</legend>
                  <input
                    type="text"
                    name="sid"
                    required
                    readOnly
                    value={this.state.sid}
                    className="sign-in-field"
                    style={{ textIndent: 10 }}
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
                    readOnly
                    value={this.state.eid}
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
              onClick={this.acceptDeclined2}
            >
              Add Medicine
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.loading && (
          <div className="spinner-border spinner-position" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </>
    );
  }
}
export default UserNotification;
