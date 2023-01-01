const { Router } = require('express');
const exchangeController = require('../controllers/exchangeController');

const router = Router();

router.get('/', exchangeController.getExchanges);
router.post('/', exchangeController.createExchange);
router.get('/:no_exchange', exchangeController.getExchange);
router.delete('/:no_exchange', exchangeController.deleteExchange);

module.exports = router;
