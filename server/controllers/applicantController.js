const pool = require('../config/sync');
const queries = require('../queries/queries');

const getApplicants = async (req, res, next) => {
  try {
    const applicants = await pool.query(queries.getApplicants);
    res.status(200).json(applicants.rows);
  } catch (err) {
    next(err);
  }
};

const getApplicant = async (req, res, next) => {
  try {
    const applicant = await pool.query(queries.getApplicant, [
      req.params.no_applicant,
    ]);
    res.status(200).json(applicant.rows);
  } catch (err) {
    next(err);
  }
};

const createApplicant = async (req, res, next) => {
  const { id_advertisement, motivation, id_user } = req.body;

  try {
    await pool.query(queries.createApplicant, [
      id_advertisement,
      id_user,
      motivation,
    ]);
    //await pool.query(queries.updateUserStatusApp, [true, id_user]);
    res.status(200).send('Applicant created successfully!');
  } catch (err) {
    next(err);
  }
};

const deleteApplicant = async (req, res, next) => {
  try {
    await pool.query(queries.deleteApplicant, [req.params.no_applicant]);
    res.status(200).json('Applicant has been deleted !');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getApplicant,
  getApplicants,
  createApplicant,
  deleteApplicant,
};
