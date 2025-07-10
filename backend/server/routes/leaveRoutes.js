const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require('../controllers/leaveController');

const authenticate = require('../middlewares/authMiddleware');

router.post('/apply', authenticate, applyLeave);
router.get('/my', authenticate, getMyLeaves);
router.get('/all', authenticate, getAllLeaves);
router.put('/status/:id', authenticate, updateLeaveStatus);

module.exports = router;
