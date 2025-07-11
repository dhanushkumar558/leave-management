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
    <div className="container mt-5">
      <h2>Welcome, {user.name}!</h2>
      <p>Role: <strong>{user.role}</strong></p>
      <p>Use the navigation bar to apply for leave, view status, or manage requests.</p>

      {user.role === 'admin' && (
        <>
          <h4 className="mt-4">All Registered Employees</h4>
          <table className="table table-bordered mt-2">
            <thead>
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
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    ) : (
                      emp.name
                    )}
                  </td>
                  <td>
                    {editingId === emp.id ? (
                      <input
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    ) : (
                      emp.email
                    )}
                  </td>
                  <td>
                    {editingId === emp.id ? (
                      <button onClick={handleUpdate} className="btn btn-sm btn-primary me-2">Save</button>
                    ) : (
                      <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-warning me-2">Edit</button>
                    )}
                    <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
