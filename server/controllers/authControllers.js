const pool = require('../config/sync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../utils/error');
const queries = require('../queries/queries');

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { first, last, password, email, phone, role } = req.body;
    const hash = bcrypt.hashSync(password, salt);

    const no_user = await pool.query(queries.checkAppEmailExists, [email]);
    if (no_user.rows != 0)
      return res.status(201).send('Email is already exists');

    await pool.query(queries.createUser, [
      first,
      last,
      hash,
      email,
      phone,
      role,
    ]);
    res.status(200).send('User has been created.');
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await pool.query(queries.checkAppEmailExists, [
      req.body.email,
    ]);

    if (user.rows <= 0) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );
    if (!isPasswordCorrect)
      return next(createError(401, 'Wrong password and username!'));

    const { role, ...otherDetails } = user.rows[0];

    const token = jwt.sign(
      {
        id: user.rows[0].no_user,
        role: user.rows[0].role,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        role,
        token,
        ...otherDetails,
      });
  } catch (err) {
    next(err);
  }
};

const logout = async () => {};

module.exports = {
  login,
  register,
  logout,
};
