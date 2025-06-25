const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const auth = require('../middleware/auth');

router.get('/', auth, expensesController.getAllExpenses);
router.post('/', auth, expensesController.createExpense);
router.delete('/:id', auth, expensesController.deleteExpense);
router.put('/:id', auth, expensesController.updateExpense);

module.exports = router;
