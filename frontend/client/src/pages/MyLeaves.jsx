import { useEffect, useState } from 'react';
import axios from 'axios';
import { API, getToken } from '../utils';

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/leave/my`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setLeaves(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">
          <i className="bi bi-calendar2-check-fill me-2"></i> My Leave Requests
        </h3>
        <span className="text-muted small">Total: {leaves.length}</span>
      </div>

      {leaves.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          <i className="bi bi-info-circle-fill me-2"></i> You have not applied for any leave yet.
        </div>
      ) : (
        <div className="table-responsive rounded shadow-sm">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-primary">
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leave_type}</td>
                  <td>{new Date(leave.from_date).toLocaleDateString()}</td>
                  <td>{new Date(leave.to_date).toLocaleDateString()}</td>
                  <td className="text-muted">{leave.reason}</td>
                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 bg-${
                        leave.status === 'approved'
                          ? 'success'
                          : leave.status === 'rejected'
                          ? 'danger'
                          : 'warning text-dark'
                      }`}
                    >
                      <i
                        className={`bi me-1 ${
                          leave.status === 'approved'
                            ? 'bi-check-circle-fill'
                            : leave.status === 'rejected'
                            ? 'bi-x-circle-fill'
                            : 'bi-hourglass-split'
                        }`}
                      ></i>
                      {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
