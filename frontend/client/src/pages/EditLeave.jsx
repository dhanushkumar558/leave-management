import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API, getToken } from '../utils';

export default function EditLeave() {
  const location = useLocation();
  const navigate = useNavigate();
  const leave = location.state?.leave;

  const [form, setForm] = useState({
    leave_type: '',
    from_date: '',
    to_date: '',
    reason: '',
  });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!leave || leave.status !== 'pending') {
      navigate('/my-leaves');
      return;
    }
    setForm({
      leave_type: leave.leave_type,
      from_date: leave.from_date,
      to_date: leave.to_date,
      reason: leave.reason,
    });
  }, [leave, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/leave/${leave.id}`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMsg('Leave updated successfully');
      setTimeout(() => navigate('/my-leaves'), 1000);
    } catch (err) {
      setError('Failed to update leave');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3>Edit Leave Request</h3>
      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <select
          className="form-select mb-3"
          value={form.leave_type}
          onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
        >
          <option value="casual">Casual</option>
          <option value="sick">Sick</option>
          <option value="emergency">Emergency</option>
        </select>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">From</label>
            <input
              type="date"
              className="form-control"
              value={form.from_date}
              onChange={(e) => setForm({ ...form, from_date: e.target.value })}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">To</label>
            <input
              type="date"
              className="form-control"
              value={form.to_date}
              onChange={(e) => setForm({ ...form, to_date: e.target.value })}
              required
            />
          </div>
        </div>

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          required
        ></textarea>

        <button className="btn btn-primary w-100">Update Leave</button>
      </form>
    </div>
  );
}
