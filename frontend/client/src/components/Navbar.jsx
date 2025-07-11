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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">LeaveSystem</Link>

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
        <ul className="navbar-nav ms-auto">

          {!user && (
            <>
              {/* Signup Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Signup
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/signup?role=admin">Signup as Admin</Link></li>
                  <li><Link className="dropdown-item" to="/signup?role=employee">Signup as Employee</Link></li>
                </ul>
              </li>

              {/* Login Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Login
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/login?role=admin">Login as Admin</Link></li>
                  <li><Link className="dropdown-item" to="/login?role=employee">Login as Employee</Link></li>
                </ul>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Dashboard</Link>
              </li>

              {user.role === 'employee' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/apply">Apply</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-leaves">My Leaves</Link>
                  </li>
                </>
              )}

              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Panel</Link>
                </li>
              )}

              <li className="nav-item">
                <button className="btn btn-sm btn-danger ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
