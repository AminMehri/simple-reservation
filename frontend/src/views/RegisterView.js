import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/Login.css";

function RegisterView() {
  const navigate = useNavigate();

  let [userName, setUserName] = useState("");
  let [email, setemail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");

  let [userNameE, setUserNameE] = useState(false);
  let [emailE, setemailE] = useState(false);
  let [passwordE, setPasswordE] = useState(false);
  let [passwordConfirmE, setPasswordConfirmE] = useState(false);

  let [userNameEM, setUserNameEM] = useState("");
  let [emailEM, setemailEM] = useState("");
  let [passwordEM, setPasswordEM] = useState("");
  let [passwordConfirmEM, setPasswordConfirmEM] = useState("");

  let [loading, setLoading] = useState(false);

  let access = true

  function doRegister(e) {
    e.preventDefault();

    // Check username length
    if (userName.length < 5) {
      setUserNameE(true);
      access = false
      if (userName.length == 0) {
        setUserNameEM("نام کاربری اجباری است");
      } else {
        setUserNameEM("نام کاربری باید بالای ۴ کاراکتر باشد");
      }
    } else {
      setUserNameE(false);
      setUserNameEM("");
    }

    if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
        setemailE(true)
        access = false
        if(email.length == 0){
            setemailEM('ایمیل اجباری است')
        } else{
            setemailEM('لطفا ایمیل خود را به صورت صحیح وارد کنید')
        }
    } else if(email.length < 6){
        setemailE(true)
        access = false
        setemailEM('لطفا ایمیل خود را به صورت صحیح وارد کنید')
    } else {
        setemailE(false)
        setemailEM('')
    }

    // Check password length
    if (password.length < 8) {

      setPasswordE(true);
      access = false
      if (password.length == 0) {
        setPasswordEM("رمزعبور اجباری است");
      } else {
        setPasswordEM("رمزعبور باید بیشتر از ۷ کاراکتر باشد");
      }
    } else {
      setPasswordE(false);
      setPasswordEM("");
    }

    if (passwordConfirm.length < 8) {

      setPasswordConfirmE(true);
      access = false
      if (passwordConfirm.length == 0) {
        setPasswordConfirmEM("تکرار رمزعبور اجباری است");
      } else {
        setPasswordConfirmEM("تکراررمزعبور باید بیشتر از ۷ کاراکتر باشد");
      }
    } else {
      setPasswordConfirmE(false);
      setPasswordConfirmEM("");
    }

    // Check password compatibility
    if (password != passwordConfirm) {

      access = false
      setPasswordConfirmE(true);
      setPasswordE(true);
      setPasswordEM("رمزعبور و تکرار آن با هم مطابقت ندارد");
    } else {
      if (!passwordE && passwordConfirmE) {
        access = true
      }
    }
    if (access) {
      setLoading(true);
      axios
        .post("account/signup/", {
          email: email,
          username: userName,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "You successfully registered",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/login')
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            showConfirmButton: false,
            timer: 1500,
            text: error.response.data.message,
          });
        });
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="login-container">
              {loading && <Loading />}
              {!loading && (
                <>
                  <h2 className="login-heading">No name</h2>
                  <form onSubmit={doRegister}>
                    <div className="mb-3">
                      <label for="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        onChange={(e) => setUserName(e.target.value)}
                      />

                      {userNameE && (
                        <div class="text-danger invalid-username">
                          {userNameEM}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label for="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onChange={(e) => setemail(e.target.value)}
                      />

                      {emailE && (
                        <div class="text-danger invalid-username">
                          {emailEM}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label for="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {passwordE && (
                        <div class="text-danger invalid-username">
                          {passwordEM}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label for="password-confirm" className="form-label">
                        Password confirm
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password-confirm"
                        placeholder="Enter password confirm"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />

                      {passwordConfirmE && (
                        <div class="text-danger invalid-username">
                          {passwordConfirmEM}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-login btn-block"
                    >
                      Register
                    </button>
                    <Link className="float-end" to="/login">
                      Have an account?
                    </Link>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterView;
