const Expense = require('../models/Expense');

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

exports.createExpense = async (req, res, next) => {
  try {
    const { amount, category, description, date } = req.body;
    const expense = new Expense({ amount, category, description, date, userId: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    if (expense.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    if (expense.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    const updated = await Expense.findByIdAndUpdate(
      id,
      { amount, category, description, date },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
