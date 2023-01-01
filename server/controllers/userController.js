const pool = require('../config/sync');
const queries = require('../queries/queries');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res, next) => {
  const { first, last, password, email, phone, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash =
    password.length > 30 ? password : bcrypt.hashSync(password, salt);
  try {
    await pool.query(queries.updateUser, [
      first,
      last,
      hash,
      email,
      phone,
      req.params.no_user,
    ]);
    res.status(200).json('User has been updated !');
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await pool.query(queries.deleteUser, [req.params.no_user]);
    res.status(200).json('User has been deleted !');
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await pool.query(queries.getUser, [req.params.no_user]);
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

const getIdUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await pool.query(queries.checkAppEmailExists, [email]);
    res.status(200).json(user.rows);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await pool.query(queries.getUsers);
    res.status(200).json(users.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getIdUser,
};
