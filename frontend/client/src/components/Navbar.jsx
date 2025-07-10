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
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
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
                <button className="btn btn-sm btn-danger ms-2" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
