import { Link } from "react-router-dom";
import '../css/Navbar.css'

function Navbar() {
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
                  <Link className="nav-link" to="/login">
                    Login/Register
                  </Link>
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
