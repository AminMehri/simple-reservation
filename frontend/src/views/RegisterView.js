import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import "../css/Login.css";

function RegisterView() {
  let [userName, setUserName] = useState("");
  let [fullName, setFullName] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");

  let [userNameE, setUserNameE] = useState(false);
  let [fullNameE, setFullNameE] = useState(false);
  let [passwordE, setPasswordE] = useState(false);
  let [passwordConfirmE, setPasswordConfirmE] = useState(false);

  let [userNameEM, setUserNameEM] = useState("");
  let [fullNameEM, setFullNameEM] = useState("");
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

    // if(email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1){
    //     emailE.value = true
    //     access = false
    //     if(email.value.length == 0){
    //         emailEM.value = 'ایمیل اجباری است'
    //     } else{
    //         emailEM.value = 'لطفا ایمیل خود را به صورت صحیح وارد کنید'
    //     }
    // } else if(email.value.length < 6){
    //     emailE.value = true
    //     access = false
    //     emailEM.value = 'لطفا ایمیل خود را به صورت صحیح وارد کنید'
    // } else {
    //     emailE.value = false
    //     emailEM.value = ''
    // }

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
        .post("https://jsonplaceholder.typicode.com/posts", {
          tel: userName,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          // console.log(res.data.token);
        })
        .catch((error) => {
          setLoading(false);
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
                      <label for="fullname" className="form-label">
                        Full name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        placeholder="Enter full name"
                        onChange={(e) => setFullName(e.target.value)}
                      />

                      {fullNameE && (
                        <div class="text-danger invalid-username">
                          {fullNameEM}
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
