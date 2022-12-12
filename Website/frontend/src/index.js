import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
// import Home from "./Home/Home.js";
import login from "./login.js";
import Admin_Home from "./Admin_Home/Admin_Home.js";
import RequestCard from "./Admin_Home/RequestCard";
import Register from "./Register";
import Manufacturer from "./Manufacturer/ManufacturerHome";
import RetailerHome from "./Retailer/RetailerHome";
import DistributerHome from "./Distributor/DistributorHome";
import ManufacturerNotification from "./Manufacturer/ManufacturerNotification";
import RetailerNotification from "./Retailer/RetailerNotification";
import DistributerNotification from "./Distributor/DistributorNotification";
import HomePage from "./Home/HomePage";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/login" component={login} exact />
    <Route path="/signup" component={Register} exact />
    <Route path="/" component={HomePage} exact />
    <Route path="/manufacturer" component={Manufacturer} exact />
    <Route
      path="/manufacturer/notifications"
      component={ManufacturerNotification}
      exact
    />
    <Route path="/retailer" component={RetailerHome} exact />
    <Route
      path="/retailer/notifications"
      component={RetailerNotification}
      exact
    />
    <Route path="/distributer" component={DistributerHome} exact />
    <Route
      path="/distributer/notifications"
      component={DistributerNotification}
      exact
    />
    <Route path="/Admin" component={Admin_Home} exact />
    <Route path="/Admin/request" component={RequestCard} exact />
  </BrowserRouter>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
