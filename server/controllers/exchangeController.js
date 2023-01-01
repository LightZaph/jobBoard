const pool = require('../config/sync');
const queries = require('../queries/queries');

const getExchanges = async (req, res, next) => {
  try {
    const exchanges = await pool.query(queries.getExchanges);
    res.status(200).json(exchanges.rows);
  } catch (err) {
    next(err);
  }
};

const getExchange = async (req, res, next) => {
  try {
    const applicant = await pool.query(queries.getExchange, [
      req.params.no_exchange,
    ]);
    res.status(200).json(applicant.rows);
  } catch (err) {
    next(err);
  }
};

const createExchange = async (req, res, next) => {
  const { first, last, email, phone, message, advertisement } = req.body;

  try {
    await pool.query(queries.createExchange, [
      first,
      last,
      email,
      phone,
      message,
      advertisement,
    ]);
    res.status(200).send('Exchange created successfully!');
  } catch (err) {
    next(err);
  }
};

const deleteExchange = async (req, res, next) => {
  try {
    await pool.query(queries.deleteExchange, [req.params.no_applicant]);
    res.status(200).json('Exchange has been deleted !');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getExchanges,
  getExchange,
  createExchange,
  deleteExchange,
};
