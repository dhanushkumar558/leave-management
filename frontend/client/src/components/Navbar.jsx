import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils';

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-90 shadow-sm px-4 py-2">
      <Link className="navbar-brand fw-bold fs-4" to="/">
        <i className="bi bi-calendar-check-fill me-2"></i>LeaveSystem
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
        <ul className="navbar-nav ms-auto align-items-lg-center">

          {!user && (
            <>
              {/* Signup */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-plus me-1"></i> Signup
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/signup?role=admin">
                      <i className="bi bi-person-badge me-2"></i>Admin
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup?role=employee">
                      <i className="bi bi-person me-2"></i>Employee
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Login */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/login?role=admin">
                      <i className="bi bi-person-badge me-2"></i>Admin
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login?role=employee">
                      <i className="bi bi-person me-2"></i>Employee
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house-door-fill me-1"></i>Dashboard
                </Link>
              </li>

              {user.role === 'employee' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/apply">
                      <i className="bi bi-journal-plus me-1"></i>Apply
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-leaves">
                      <i className="bi bi-card-list me-1"></i>My Leaves
                    </Link>
                  </li>
                </>
              )}

              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <i className="bi bi-ui-checks-grid me-1"></i>Admin Panel
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-3" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i>Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
