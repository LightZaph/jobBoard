const pool = require('../config/sync');
const queries = require('../queries/queries');

const getCompanies = (req, res) => {
  pool.query(queries.getCompanies, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getCompany = (req, res) => {
  const no_company = parseInt(req.params.no_company);
  pool.query(queries.getCompany, [no_company], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const createCompany = (req, res) => {
  const {
    company_desc,
    company_address,
    company_city,
    company_country,
    logo,
    company_site,
    company,
  } = req.body;
  pool.query(
    queries.createCompany,
    [
      company,
      company_desc,
      company_address,
      company_city,
      company_country,
      logo,
      company_site,
    ],
    (err, results) => {
      if (err) throw err;
      res.status(200).json('Company has been created!');
    }
  );
};

const updateCompany = (req, res) => {
  const no_company = req.params.no_company;
  const {
    company,
    company_desc,
    company_address,
    company_city,
    company_country,
    logo,
    company_site,
  } = req.body;
  pool.query(
    queries.updateCompany,
    [
      company,
      company_desc,
      company_address,
      company_city,
      company_country,
      logo,
      company_site,
      no_company,
    ],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows);
    }
  );
};

const deleteCompany = async (req, res, next) => {
  try {
    await pool.query(queries.deleteCompany, [req.params.no_company]);
    res.status(200).json('Advertisement has been deleted !');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
