import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../utils';

export default function AdminLeaveTypes() {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ name: '', max_days: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const fetchTypes = async () => {
    const res = await axios.get(`${API}/admin/leave-types`);
    setTypes(res.data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API}/admin/leave-types/${editId}`, form);
      } else {
        await axios.post(`${API}/admin/leave-types`, form);
      }
      setForm({ name: '', max_days: '' });
      setEditId(null);
      fetchTypes();
    } catch (err) {
      setError('Error saving leave type');
    }
  };

  const handleEdit = (type) => {
    setEditId(type.id);
    setForm({ name: type.name, max_days: type.max_days });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this leave type?')) {
      await axios.delete(`${API}/admin/leave-types/${id}`);
      fetchTypes();
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: '', max_days: '' });
  };

  return (
    <div className="container mt-4">
      <h3>Manage Leave Types</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="border p-3 mb-4">
        <h5>{editId ? 'Edit Leave Type' : 'Add Leave Type'}</h5>
        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Leave Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2 mb-2">
            <input
              className="form-control"
              type="number"
              placeholder="Max Days"
              value={form.max_days}
              onChange={(e) => setForm({ ...form, max_days: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2 mb-2">
            <button className="btn btn-success w-100">{editId ? 'Update' : 'Add'}</button>
          </div>
          {editId && (
            <div className="col-md-2 mb-2">
              <button type="button" onClick={cancelEdit} className="btn btn-secondary w-100">
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Max Days</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.max_days}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(type)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(type.id)}>
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
