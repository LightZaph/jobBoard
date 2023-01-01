const { Router } = require('express');
const companyController = require('../controllers/companyControllers');
const auth = require('../utils/verifyToken');

const router = Router();

router.get('/', companyController.getCompanies);
router.post('/', companyController.createCompany);
router.get('/:no_company', companyController.getCompany);
router.put('/:no_company', companyController.updateCompany);
router.delete('/:no_company', companyController.deleteCompany);

module.exports = router;
