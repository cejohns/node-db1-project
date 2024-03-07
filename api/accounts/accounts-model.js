const path = require('path');
const db = require(path.join(__dirname, '..', '..', 'data', 'db-config.js'));


const getAll = async () => {
  const accounts = await db('accounts');
  console.log(accounts); // Temporary logging to debug
  return accounts;
};

const getById = (id) => {
  return db('accounts').where('id', id).first();
};

const create = async (account) => {
  const [id] = await db('accounts').insert(account);
  return getById(id);
};

const updateById = async (id, updatedAccount) => {
  await db('accounts').where('id', id).update(updatedAccount);
  return getById(id);
};

const deleteById = async (id) => {
  const deletedAccount = await getById(id);
  await db('accounts').where('id', id).delete();
  return deletedAccount;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};