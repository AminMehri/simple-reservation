import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.interceptors.response.use(
  (success) => {
    if (success.data.detail) {
      Swal.fire(success.data.message, success.data.detail, "success");
    } else if (success.data.message) {
      Swal.fire(success.data.message, "", "success");
    }
    return success;
  },
  (error) => {
    try {
      if (error.response.status == 500) {
        Swal.fire(
          "خطا داخلی سرور",
          "این مورد جهت بررسی به پشتیبانی ارسال شد.",
          "error"
        );
        return Promise.reject(error);
      }
      if (error.response.status == 401) {
        return Promise.reject(error);
      }
      if (error.response.data.detail) {
        Swal.fire(
          error.response.data.message,
          error.response.data.detail,
          "error"
        );
      } else {
        Swal.fire(error.response.data.message, "", "error");
      }

      return Promise.reject(error);
    } catch (error) {
      Swal.fire(
        "خطا در ارتباط با سرور",
        "لطفا از اتصال اینترنت خود اطمینان حاصل کرده و صفحه را رفرش کنید.",
        "error"
      );
    }
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
