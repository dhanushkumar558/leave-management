const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Get all employees (excluding admins)
router.get('/employees', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE role != "admin"');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// Add a new employee
router.post('/employees', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, role]
    );
    res.json({ message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding employee' });
  }
});

// Edit employee details
router.put('/employees/:id', async (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;
  try {
    await db.query('UPDATE users SET name=?, email=?, role=? WHERE id=?', [
      name,
      email,
      role,
      id
    ]);
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee' });
  }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM users WHERE id=?', [id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

// Leave Types
router.get('/leave-types', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM leave_types');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leave types' });
  }
});

router.post('/leave-types', async (req, res) => {
  const { name, max_days } = req.body;
  try {
    await db.query('INSERT INTO leave_types (name, max_days) VALUES (?, ?)', [
      name,
      max_days
    ]);
    res.json({ message: 'Leave type added' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding leave type' });
  }
});

router.put('/leave-types/:id', async (req, res) => {
  const { name, max_days } = req.body;
  const { id } = req.params;
  try {
    await db.query('UPDATE leave_types SET name=?, max_days=? WHERE id=?', [
      name,
      max_days,
      id
    ]);
    res.json({ message: 'Leave type updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating leave type' });
  }
});

router.delete('/leave-types/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM leave_types WHERE id=?', [id]);
    res.json({ message: 'Leave type deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting leave type' });
  }
});

module.exports = router;
