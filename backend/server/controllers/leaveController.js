const db = require('../config/db');

exports.applyLeave = (req, res) => {
  const { leave_type, from_date, to_date, reason } = req.body;
  const user_id = req.user.id;

  db.query(
    'INSERT INTO leave_requests (user_id, leave_type, from_date, to_date, reason) VALUES (?, ?, ?, ?, ?)',
    [user_id, leave_type, from_date, to_date, reason],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to apply leave' });
      res.status(200).json({ message: 'Leave request submitted' });
    }
  );
};

exports.getMyLeaves = (req, res) => {
  const user_id = req.user.id;

  db.query(
    'SELECT * FROM leave_requests WHERE user_id = ? ORDER BY created_at DESC',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch leaves' });
      res.json(results);
    }
  );
};

exports.getAllLeaves = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  db.query(
    'SELECT leave_requests.*, users.name FROM leave_requests JOIN users ON leave_requests.user_id = users.id ORDER BY leave_requests.created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching all leaves' });
      res.json(results);
    }
  );
};

exports.updateLeaveStatus = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { id } = req.params;
  const { status } = req.body;

  db.query(
    'UPDATE leave_requests SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed' });
      res.json({ message: 'Leave status updated' });
    }
  );
};
