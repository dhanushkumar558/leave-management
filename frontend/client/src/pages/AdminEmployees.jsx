import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../utils';

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/admin/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.name || !form.email || (!editId && !form.password)) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API}/admin/employees/${editId}`, form);
      } else {
        await axios.post(`${API}/admin/employees`, form);
      }
      setForm({ name: '', email: '', password: '', role: 'employee' });
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving employee');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setForm({ name: emp.name, email: emp.email, password: '', role: emp.role });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this employee?')) {
      try {
        await axios.delete(`${API}/admin/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: '', email: '', password: '', role: 'employee' });
  };

  return (
    <div className="container mt-4">
      <h3>Employee Management</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="border p-3 mb-4">
        <h5>{editId ? 'Edit Employee' : 'Add New Employee'}</h5>
        <div className="row">
          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2 mb-2">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editId}
            />
          </div>
          <div className="col-md-2 mb-2">
            <select
              className="form-select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-md-2 mb-2 d-flex">
            <button className="btn btn-success me-2 w-100" disabled={loading}>
              {editId ? 'Update' : 'Add'}
            </button>
            {editId && (
              <button className="btn btn-secondary w-100" type="button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(emp)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
