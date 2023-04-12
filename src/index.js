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
import BoardWrite from "views/BoardWrite";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = "https://sbstock.co.kr";
// axios.defaults.baseURL = "http://localhost:8080";
const login = localStorage.getItem("admin");

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      {/* <Route path="/admin/boards/write">
        <BoardWrite />
      </Route> */}
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
