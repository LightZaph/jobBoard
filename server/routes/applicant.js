const { Router } = require('express');
const applicantController = require('../controllers/applicantController');
const upload = require('../config/multerConfig');
const auth = require('../utils/verifyToken');

const router = Router();

router.get('/', auth.verifyAdmin, applicantController.getApplicants);
router.post('/', applicantController.createApplicant);
router.get('/:no_applicant', applicantController.getApplicant);
router.delete(
  '/:no_applicant',
  auth.verifyUser,
  applicantController.deleteApplicant
);

module.exports = router;
