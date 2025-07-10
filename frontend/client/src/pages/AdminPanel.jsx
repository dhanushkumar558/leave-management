import { useEffect, useState } from 'react';
import axios from 'axios';
import { API, getToken } from '../utils';

export default function AdminPanel() {
  const [requests, setRequests] = useState([]);

  const fetchData = () => {
    axios
      .get(`${API}/leave/all`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setRequests(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/leave/status/${id}`, { status }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchData();
  };

  return (
    <div className="container mt-5">
      <h3>Admin Panel - All Leave Requests</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.leave_type}</td>
              <td>{req.from_date}</td>
              <td>{req.to_date}</td>
              <td>{req.reason}</td>
              <td>
                <span className={`badge bg-${req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'danger' : 'warning'}`}>
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(req.id, 'approved')} className="btn btn-sm btn-success me-2">Approve</button>
                    <button onClick={() => updateStatus(req.id, 'rejected')} className="btn btn-sm btn-danger">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
