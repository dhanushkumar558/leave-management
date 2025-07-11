import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../utils';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const roleParam = query.get('role') || 'employee';

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: roleParam,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    setForm((prev) => ({ ...prev, role: roleParam }));
  }, [roleParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="shadow-lg p-5 rounded bg-white" style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.6s ease-in-out' }}>
        <h3 className="text-center mb-4 fw-bold text-primary">
          Login as {form.role.charAt(0).toUpperCase() + form.role.slice(1)}
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="mb-3">
            <select className="form-select" value={form.role} disabled>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
            <i className="bi bi-box-arrow-in-right me-2"></i> Login
          </button>
        </form>

        <div className="mt-4 text-center text-muted small">
          Having trouble? <a href="#" className="text-decoration-none">Contact support</a>
        </div>
      </div>

      {/* ✨ Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
