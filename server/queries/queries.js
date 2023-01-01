const getCompanies = 'select * from company';

const getCompany = 'select * from company where no_company = $1 limit 1';

const getApplicants =
  'select no_applicant, user_.first, user_.last, user_.email, advertisements.job_title, advertisements.job_type, motivation, advertisements.statut, company.company from applicant inner join user_ on applicant.id_user = user_.no_user inner join advertisements on advertisements.no_advertisement = applicant.id_advertisement inner join company on advertisements.id_company = company.no_company';

const getApplicant =
  'select no_applicant, user_.first, user_.last, user_.email, advertisements.job_title, advertisements.job_type, motivation,  advertisements.statut, company.company from applicant inner join user_ on applicant.id_user = user_.no_user inner join advertisements on advertisements.no_advertisement = applicant.id_advertisement inner join company on advertisements.id_company = company.no_company where id_user = $1';

const getAdvertisements =
  'select no_advertisement, job_title, job_desc, job_type, job_hour_price, requirements, responsability, id_company, statut, company.company, company.company_address, company.company_site, company.logo from advertisements inner join company on advertisements.id_company = company.no_company';

const getAdvertisement =
  'select no_advertisement, job_title, job_desc, job_type, job_hour_price, requirements, responsability, id_company, statut, company.company, company.company_address, company.company_site, company.logo from advertisements inner join company on advertisements.id_company = company.no_company where no_advertisement = $1';

const getUsers = 'select * from user_';

const getUser = 'select * from user_ where user_.no_user = $1';

const getExchanges =
  'select first, last, email, phone, message, advertisements.job_title from exchange inner join advertisements on exchange.advertisement = advertisements.no_advertisement';

const getExchange =
  'select first, last, email, phone, message, advertisements.job_title from exchange inner join advertisements on exchange.advertisement = advertisements.no_advertisement where no_exchange = $1';

const checkAppEmailExists = 'select * from user_ where email = $1 limit 1';

const id_user = 'select no_user from user_ where email = $1 limit 1';

const createAdvertisements =
  'insert into advertisements (job_title, job_desc, job_type, job_hour_price, requirements, responsability, statut, id_company) values ($1, $2, $3, $4, $5, $6, $7, $8)';

const createApplicant =
  'insert into applicant ( id_advertisement, id_user, motivation ) values ($1, $2, $3)';

const createExchange =
  'insert into exchange (first, last, email, phone, message, advertisement) values ($1, $2, $3, $4, $5, $6)';

const createCompany =
  'insert into company (company, company_desc, company_address, company_city, company_country, logo, company_site) values ($1, $2, $3, $4, $5, $6, $7)';

const createUser =
  'insert into user_ (first, last, password, email, phone, role) values ($1, $2, $3, $4, $5, $6)';

const updateAdvertisements =
  'update advertisements set job_title = $1, job_desc = $2, job_type = $3, job_hour_price = $4, requirements = $5, responsability = $6, statut = $7 where no_advertisement = $8';

const updateCompany =
  'update company set company = $1, company_desc = $2, company_address = $3, company_city = $4, company_country = $5, logo = $6, company_site = $7 where no_company = $8';

const updateUser =
  'update user_ set first = $1, last = $2, password = $3, email = $4, phone = $5 where no_user = $6';

const updateUserStatusRec =
  'update user_ set isrecruiter = $1 where no_user = $2';

const updateUserStatusApp =
  'update user_ set isapplicant = $1 where no_user = $2';

const deleteAdvertisement =
  'delete from advertisements where no_advertisement = $1';

const deleteApplicant = 'delete from applicant where no_applicant = $1';

const deleteCompany = 'delete from company where no_company = $1';

const deleteUser = 'delete from user_ where no_user = $1';

const deleteExchange = 'delete from exchange where no_exchange = $1';

module.exports = {
  getCompanies,
  getCompany,
  getApplicant,
  getApplicants,
  getAdvertisements,
  getAdvertisement,
  getUser,
  getUsers,
  getExchanges,
  getExchange,
  checkAppEmailExists,
  createAdvertisements,
  createApplicant,
  createCompany,
  createExchange,
  createUser,
  updateAdvertisements,
  updateCompany,
  updateUser,
  updateUserStatusApp,
  updateUserStatusRec,
  deleteApplicant,
  deleteAdvertisement,
  deleteCompany,
  deleteUser,
  deleteExchange,
  id_user,
};
