import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import Swal from 'sweetalert2'
import axios from "axios";
import "../css/Login.css";

function LoginView() {
  const navigate = useNavigate();
  
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')

  let [loading, setLoading] = useState(false);

  function doLogin(e){
    setLoading(true)
    axios.post('account/login/', {
      username: userName,
      password: password
    })
    .then(res => {
      setLoading(false)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You logged in successfully",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/profile', { replace: true });
    })
    .catch(error => {
      setLoading(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        showConfirmButton: false,
        timer: 1500,
        text: error.response.data.detail,
      });
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
