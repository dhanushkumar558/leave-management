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

  // ✅ update form.role when URL changes
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
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="text-center">Signup as {form.role.charAt(0).toUpperCase() + form.role.slice(1)}</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="form-control mb-2" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <select className="form-select mb-3" value={form.role} disabled>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
}
