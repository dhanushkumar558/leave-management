import { useEffect, useState } from 'react';
import axios from 'axios';
import { API, getToken } from '../utils';

export default function AdminPanel() {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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

  // Pagination logic
  const totalPages = Math.ceil(requests.length / pageSize);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container py-5">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3 className="fw-bold text-primary">
          <i className="bi bi-person-lines-fill me-2"></i>Admin Panel – Leave Requests
        </h3>
        <span className="badge bg-dark fs-6">Total: {requests.length}</span>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle bg-white">
          <thead className="table-primary">
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
            {paginatedRequests.map((req) => (
              <tr key={req.id}>
                <td className="fw-medium">{req.name}</td>
                <td>{req.leave_type}</td>
                <td>{new Date(req.from_date).toLocaleDateString()}</td>
                <td>{new Date(req.to_date).toLocaleDateString()}</td>
                <td className="text-muted">{req.reason}</td>
                <td>
                  <span
                    className={`badge rounded-pill px-3 py-2 bg-${
                      req.status === 'approved'
                        ? 'success'
                        : req.status === 'rejected'
                        ? 'danger'
                        : 'warning text-dark'
                    }`}
                  >
                    <i
                      className={`bi me-1 ${
                        req.status === 'approved'
                          ? 'bi-check-circle-fill'
                          : req.status === 'rejected'
                          ? 'bi-x-circle-fill'
                          : 'bi-hourglass-split'
                      }`}
                    ></i>
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => updateStatus(req.id, 'approved')}
                        className="btn btn-sm btn-outline-success me-2"
                      >
                        <i className="bi bi-check-circle-fill me-1"></i> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, 'rejected')}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-x-circle-fill me-1"></i> Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-muted small">
                      <i className="bi bi-lock-fill me-1"></i> Actioned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <i className="bi bi-chevron-left"></i> Prev
        </button>

        <span className="fw-medium text-muted">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Optional hover & animation */}
      <style>{`
        .table-hover tbody tr:hover {
          background-color: #f7faff;
        }
      `}</style>
    </div>
  );
}
