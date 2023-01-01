import api from '../api';

export const getAds = () => {
  try {
    const advertisements = api.get('advertisement');
    return advertisements;
  } catch (err) {
    console.log(err);
  }
};

export const getAd = (no_advertisement) => {
  try {
    const advertisements = api.get('advertisement/' + no_advertisement);
    return advertisements;
  } catch (err) {
    console.log(err);
  }
};

export const addAad = (
  job_title,
  job_desc,
  job_type,
  job_hour_price,
  requirements,
  responsability,
  id_company
) => {
  try {
    const advertisements = api.post('advertisement/', {
      job_title,
      job_desc,
      job_type,
      job_hour_price,
      requirements,
      responsability,
      statut: true,
      id_company,
    });
    return advertisements;
  } catch (err) {
    console.log(err);
  }
};

export const editAd = (
  no_advertisement,
  job_title,
  job_desc,
  job_type,
  job_hour_price,
  requirements,
  responsability,
  statut
) => {
  try {
    const advertisements = api.put('advertisement/' + no_advertisement, {
      job_title,
      job_desc,
      job_type,
      job_hour_price,
      requirements,
      responsability,
      statut,
    });
    return advertisements;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAd = (no_advertisement) => {
  try {
    api.delete('advertisement/' + no_advertisement);
  } catch (err) {
    console.log(err);
  }
};

export const login = (email, password) => {
  try {
    const user = api.post('auth/login', { email, password });
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const register = (first, last, password, email, phone, role) => {
  try {
    const user = api.post('auth/register', {
      first,
      last,
      password,
      email,
      phone,
      role,
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const exchange = (first, last, email, phone, message, advertisement) => {
  try {
    const candidature = api.post('exchange', {
      first,
      last,
      email,
      phone,
      message,
      advertisement,
    });
    return candidature;
  } catch (err) {
    console.log(err);
  }
};

export const applicant = (id_advertisement, id_user, motivation) => {
  try {
    const app = api.post('applicant', {
      id_advertisement,
      id_user,
      motivation,
    });
    return app;
  } catch (error) {
    console.log(error);
  }
};

export const getApp = (id_user) => {
  try {
    const applicants = api.get('/applicant/' + id_user);
    return applicants;
  } catch (error) {
    console.log(error);
  }
};

export const getCompanies = () => {
  try {
    const companies = api.get('/company');
    return companies;
  } catch (error) {
    console.log(error);
  }
};

export const getExchange = () => {};

export const getUser = (no_user) => {
  try {
    const user = api.get('user/' + no_user);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = () => {
  try {
    const users = api.get('user');
    return users;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (
  no_user,
  first,
  last,
  password,
  email,
  phone,
  role
) => {
  try {
    const update = api.put('user/' + no_user, {
      first,
      last,
      password,
      email,
      phone,
      role,
    });
    return update;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = (no_user) => {
  try {
    api.delete('/user/' + no_user);
  } catch (error) {
    console.log(error);
  }
};
