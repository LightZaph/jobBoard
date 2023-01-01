const { Router } = require('express');
const userControllers = require('../controllers/userController');
const auth = require('../utils/verifyToken');

const router = Router();

//get all
router.get('/', userControllers.getUsers);

//update
router.put('/:no_user', userControllers.updateUser);

//delete
router.delete('/:no_user', userControllers.deleteUser);

//get
router.get('/:no_user', userControllers.getUser);

module.exports = router;
