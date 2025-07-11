import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../utils';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const roleParam = query.get('role') || 'employee';

  const [form, setForm] = useState({
    name: '',
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
      await axios.post(`${API}/auth/signup`, form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="shadow-lg p-5 rounded bg-white" style={{ width: '100%', maxWidth: '460px', animation: 'fadeIn 0.6s ease-in-out' }}>
        <h3 className="text-center mb-4 fw-bold text-primary">
          Signup as {form.role.charAt(0).toUpperCase() + form.role.slice(1)}
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="John Doe"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>

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

          <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
            <i className="bi bi-person-plus-fill me-2"></i> Signup
          </button>
        </form>

        <div className="mt-4 text-center text-muted small">
          Already have an account?{' '}
          <a href="/login" className="text-decoration-none">Login here</a>
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
