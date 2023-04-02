/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = "https://sbstock.co.kr";

const login = localStorage.getItem("admin");

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/login">
        <Login />
      </Route>

      {login == 1 ? (
        <Redirect from="/" to="/admin/dashboard" />
      ) : (
        <Redirect from="/" to="/login" />
      )}
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>
);
