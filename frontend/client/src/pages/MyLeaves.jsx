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
    <div className="container mt-5">
      <h3>My Leave Requests</h3>
      <table className="table table-bordered mt-3">
        <thead>
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
              <td>{leave.from_date}</td>
              <td>{leave.to_date}</td>
              <td>{leave.reason}</td>
              <td>
                <span className={`badge bg-${leave.status === 'approved' ? 'success' : leave.status === 'rejected' ? 'danger' : 'warning'}`}>
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
