const express = require('express');
const accountsModel = require('./accounts-model');
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await accountsModel.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await accountsModel.getById(id);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    const newAccount = await accountsModel.create({ name: name.trim(), budget });
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, budget } = req.body;
    const updatedAccount = await accountsModel.updateById(id, { name: name.trim(), budget });
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAccount = await accountsModel.deleteById(id);
    res.json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

// Use the provided error handling middleware
router.use((err, req, res, ) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = router;
