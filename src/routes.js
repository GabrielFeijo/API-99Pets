const express = require('express');
const router = express.Router();

// Definindo todas as rotas do sistema
const authController = require('./auth/authController');

router.post('/auth', authController.genAccess);
router.get('/checkAccess', authController.publicCheckAccess);

const userController = require('./user/userController');

router.get('/user', userController.indexByUser);
router.get('/users', userController.indexAll);
router.post('/createUser', userController.add);
router.put('/updateUser/:id', userController.update);
router.delete('/users/:id', userController.deleteById);

const petController = require('./pet/petController');

router.get('/pets', petController.indexAll);
router.get('/onePet', petController.indexOne);
router.get('/myPets', petController.indexByUser);
router.post('/newPet', petController.add);
router.put('/updatePet', petController.update);
router.delete('/deletePet', petController.deleteById);

const driverController = require('./driver/driverController');

router.get('/drivers', driverController.indexAll);
router.get('/driver', driverController.indexOne);
router.post('/newDriver', driverController.add);
router.put('/updateDriver', driverController.update);
router.delete('/deleteDriver', driverController.deleteById);

const mailController = require('./mail/mailController');

router.post('/send-code', mailController.sendCode);
router.post('/verify-code', mailController.verifyCode);

module.exports = router;
