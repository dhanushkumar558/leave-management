import { useState } from 'react';
import axios from 'axios';
import { API, getToken } from '../utils';

export default function ApplyLeave() {
  const [form, setForm] = useState({ leave_type: 'casual', from_date: '', to_date: '', reason: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/leave/apply`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMsg('Leave request submitted successfully');
    } catch (err) {
      setMsg('Failed to apply for leave');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3>Apply for Leave</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <select className="form-select mb-3" onChange={(e) => setForm({ ...form, leave_type: e.target.value })}>
          <option value="casual">Casual</option>
          <option value="sick">Sick</option>
          <option value="emergency">Emergency</option>
        </select>
        <input className="form-control mb-2" type="date" onChange={(e) => setForm({ ...form, from_date: e.target.value })} />
        <input className="form-control mb-2" type="date" onChange={(e) => setForm({ ...form, to_date: e.target.value })} />
        <textarea className="form-control mb-2" placeholder="Reason" rows="3" onChange={(e) => setForm({ ...form, reason: e.target.value })}></textarea>
        <button className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
}
