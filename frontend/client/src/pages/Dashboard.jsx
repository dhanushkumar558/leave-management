import { useEffect, useState } from 'react';
import { getUser, getToken } from '../utils';
import axios from 'axios';
import { API } from '../utils';

export default function Dashboard() {
  const user = getUser();
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/auth/employees`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees');
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchEmployees();
  }, []);

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm({ name: emp.name, email: emp.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/auth/update/${editingId}`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setEditingId(null);
      fetchEmployees();
    } catch {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await axios.delete(`${API}/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchEmployees();
    } catch {
      alert('Delete failed');
    }
  };

  if (!user) {
    return <div className="text-center mt-5">Please login to continue.</div>;
  }

  return (
    <div className="container py-5">
      <div className="mb-4 p-4 bg-light rounded shadow-sm">
        <h2 className="fw-bold text-primary mb-2">
          <i className="bi bi-person-circle me-2"></i>
          Welcome, {user.name}!
        </h2>
        <p className="mb-1 text-muted">Role: <strong className="text-dark">{user.role}</strong></p>
        <p className="mb-0 text-muted">Use the navigation bar to apply for leave, view status, or manage requests.</p>
      </div>

      {user.role === 'admin' && (
        <>
          <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
            <h4 className="fw-semibold text-dark">
              <i className="bi bi-people-fill me-2"></i> All Registered Employees
            </h4>
            <span className="text-muted small">Total: {employees.length}</span>
          </div>

          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ width: '180px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      {editingId === emp.id ? (
                        <input
                          className="form-control form-control-sm"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      ) : (
                        <span className="fw-medium">{emp.name}</span>
                      )}
                    </td>
                    <td>
                      {editingId === emp.id ? (
                        <input
                          className="form-control form-control-sm"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      ) : (
                        <span className="text-muted">{emp.email}</span>
                      )}
                    </td>
                    <td>
                      {editingId === emp.id ? (
                        <button
                          onClick={handleUpdate}
                          className="btn btn-sm btn-success me-2"
                        >
                          <i className="bi bi-check-lg"></i> Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(emp)}
                          className="btn btn-sm btn-warning me-2"
                        >
                          <i className="bi bi-pencil-fill"></i> Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash-fill"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ✨ Animation */}
      <style>{`
        .table-hover tbody tr:hover {
          background-color: #f6f9ff;
        }
      `}</style>
    </div>
  );
}
