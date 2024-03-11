import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import "../css/Login.css";

function LoginView() {
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')

  let [loading, setLoading] = useState(false);

  function doLogin(e){
    setLoading(true)
    axios.post('login/', {
      tel: userName,
      password: password
    })
    .then(res => {
      setLoading(false)
      console.log(res.data.token);
    })
    .catch(error => {
      setLoading(false)
    })
    e.preventDefault()
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
                  <form onSubmit={doLogin}>
                    <div className="mb-3">
                      <label for="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        onChange={e => setUserName(e.target.value)}
                        required
                      />
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
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-login btn-block"
                    >
                      Login
                    </button>
                    <Link className="float-end" to="/register">
                      Haven't an account?
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

export default LoginView;
