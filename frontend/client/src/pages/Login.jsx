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

  // ✅ Sync role from URL when it changes
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
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="text-center">Login as {form.role.charAt(0).toUpperCase() + form.role.slice(1)}</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* ✅ Show locked role dropdown */}
        <select className="form-select mb-3" value={form.role} disabled>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}
