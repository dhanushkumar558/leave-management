import { useState } from 'react';
import axios from 'axios';
import { API, getToken } from '../utils';

export default function ApplyLeave() {
  const [form, setForm] = useState({
    leave_type: 'casual',
    from_date: '',
    to_date: '',
    reason: '',
  });

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      await axios.post(`${API}/leave/apply`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMsg('✅ Leave request submitted successfully.');
      setForm({ leave_type: 'casual', from_date: '', to_date: '', reason: '' });
    } catch (err) {
      setError('❌ Failed to apply for leave. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5 bg-light min-vh-100">
      <div className="bg-white rounded shadow p-4" style={{ maxWidth: '600px', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
        <h3 className="fw-bold text-primary mb-4 text-center">
          <i className="bi bi-journal-plus me-2"></i> Apply for Leave
        </h3>

        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Leave Type</label>
            <select
              className="form-select"
              value={form.leave_type}
              onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
              required
            >
              <option value="casual">Casual</option>
              <option value="sick">Sick</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">From Date</label>
              <input
                type="date"
                className="form-control"
                value={form.from_date}
                onChange={(e) => setForm({ ...form, from_date: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">To Date</label>
              <input
                type="date"
                className="form-control"
                value={form.to_date}
                onChange={(e) => setForm({ ...form, to_date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label fw-semibold">Reason</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter a reason for your leave"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-4 fw-semibold">
            <i className="bi bi-send-check-fill me-2"></i> Submit Leave Request
          </button>
        </form>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
