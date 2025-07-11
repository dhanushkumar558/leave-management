import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../utils';

export default function AdminLeaveRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    const res = await axios.get(`${API}/admin/leave-requests`);
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    setLoading(true);
    await axios.put(`${API}/admin/leave-requests/${id}`, { status });
    fetchRequests();
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h3>Manage Leave Requests</h3>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.employee_name}</td>
              <td>{req.leave_type}</td>
              <td>{req.reason}</td>
              <td>{req.start_date}</td>
              <td>{req.end_date}</td>
              <td>
                <span
                  className={`badge ${
                    req.status === 'approved'
                      ? 'bg-success'
                      : req.status === 'rejected'
                      ? 'bg-danger'
                      : 'bg-warning text-dark'
                  }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>
              <td>
                {req.status === 'pending' ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      disabled={loading}
                      onClick={() => updateStatus(req.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      disabled={loading}
                      onClick={() => updateStatus(req.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
