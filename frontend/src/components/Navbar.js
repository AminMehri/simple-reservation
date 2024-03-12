import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {     
    if (localStorage.getItem('access') !== null) {
      setIsAuth(true); 
    }else{
      setIsAuth(false)
    }
  }, [useLocation().pathname]);

  function logout(){
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
          <div className="container">
            <Link className="navbar-brand navbar-brand-custom" to="/">
              No Name
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto navbar-nav-custom">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  {isAuth && <Link className="nav-link" to="/profile">Profile</Link>}
                  {!isAuth && <Link className="nav-link" to="/login">Login/Register</Link>}
                </li>
                <li className="nav-item">
                  {isAuth && <button className="nav-link" onClick={logout}>Logout</button>}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Navbar;
