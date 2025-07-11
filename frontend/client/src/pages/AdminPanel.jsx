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
    fetchData(); // refreshes list and shows 'actioned'
  };

  // Pagination Logic
  const totalPages = Math.ceil(requests.length / pageSize);
  const paginatedRequests = requests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
          {paginatedRequests.map((req) => (
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
                {req.status === 'pending' ? (
                  <>
                    <button onClick={() => updateStatus(req.id, 'approved')} className="btn btn-sm btn-success me-2">Approve</button>
                    <button onClick={() => updateStatus(req.id, 'rejected')} className="btn btn-sm btn-danger">Reject</button>
                  </>
                ) : (
                  <span className="text-muted">Actioned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &laquo; Prev
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
}
