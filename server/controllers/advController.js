const pool = require('../config/sync');
const queries = require('../queries/queries');

const getAds = async (req, res, next) => {
  try {
    const advertisements = await pool.query(queries.getAdvertisements);
    res.status(200).json(advertisements.rows);
  } catch (err) {
    next(err);
  }
};

const getAd = async (req, res, next) => {
  try {
    const advertisement = await pool.query(queries.getAdvertisement, [
      req.params.no_advertisement,
    ]);
    res.status(200).json(advertisement.rows);
  } catch (err) {
    next(err);
  }
};

const updateAd = async (req, res, next) => {
  const {
    job_title,
    job_desc,
    job_type,
    job_hour_price,
    requirements,
    responsability,
    statut,
  } = req.body;
  try {
    await pool.query(queries.updateAdvertisements, [
      job_title,
      job_desc,
      job_type,
      job_hour_price,
      requirements,
      responsability,
      statut,
      req.params.no_advertisement,
    ]);
    res.status(200).json('Advertisement has been updated !');
  } catch (err) {
    next(err);
  }
};

const postAd = async (req, res, next) => {
  const {
    job_title,
    job_desc,
    job_type,
    job_hour_price,
    requirements,
    responsability,
    statut,
    id_company,
  } = req.body;
  try {
    await pool.query(queries.createAdvertisements, [
      job_title,
      job_desc,
      job_type,
      job_hour_price,
      requirements,
      responsability,
      statut,
      id_company,
    ]);
    res.status(200).json('Advertisement has been created !');
  } catch (err) {
    next(err);
  }
};

const deleteAdv = async (req, res, next) => {
  try {
    await pool.query(queries.deleteAdvertisement, [
      req.params.no_advertisement,
    ]);
    res.status(200).json('Advertisement has been deleted !');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postAd,
  getAd,
  getAds,
  deleteAdv,
  updateAd,
};
