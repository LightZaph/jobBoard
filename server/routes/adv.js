const { Router } = require('express');
const advController = require('../controllers/advController');
const auth = require('../utils/verifyToken');

const router = Router();

router.get('/', advController.getAds);
router.post('/', advController.postAd);
router.put('/:no_advertisement', advController.updateAd);
router.get('/:no_advertisement', advController.getAd);
router.delete('/:no_advertisement', advController.deleteAdv);

module.exports = router;
