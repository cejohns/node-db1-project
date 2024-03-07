const path = require('path');
const db = require(path.resolve(__dirname, '../../data/db-config.js'));


const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || budget === undefined) {
    return res.status(400).json({ message: "name and budget are required" });
  }
  if (name.trim().length < 3 || name.trim().length > 100) {
    return res.status(400).json({ message: "name of account must be between 3 and 100" });
  }
  if (typeof budget !== 'number' || isNaN(budget)) {
    return res.status(400).json({ message: "budget of account must be a number" });
  }
  if (budget < 0 || budget > 1000000) {
    return res.status(400).json({ message: "budget of account is too large or too small" });
  }
  next();
};

const checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  const account = await db('accounts').where('id', id).first();
  if (!account) {
    return res.status(404).json({ message: "account not found" });
  }
  next();
};

const checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  const accounts = await db('accounts').where('name', name.trim());
  if (accounts.length) {
    return res.status(400).json({ message: "that name is taken" });
  }
  next();
};

module.exports = {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
};
