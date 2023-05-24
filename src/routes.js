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

const petDetailsController = require('./petdetails/petDetailsController');

router.get('/pets/details', petDetailsController.indexAll);
router.get('/pet/details', petDetailsController.indexOne);
router.post('/pet/details', petDetailsController.add);
router.put('/pet/details', petDetailsController.update);
router.delete('/pet/details', petDetailsController.deleteById);

const commentsController = require('./comments/commentsController');

router.get('/comments', commentsController.indexAll);
router.get('/shopComments', commentsController.indexByUser);
router.get('/comment/:id', commentsController.indexOne);
router.post('/newComment', commentsController.add);
router.put('/updateComment/:id', commentsController.update);
router.delete('/deleteComment/:id', commentsController.deleteById);

const driverController = require('./driver/driverController');

router.get('/drivers', driverController.indexAll);
router.get('/driver/:id', driverController.indexOne);
router.post('/newDriver', driverController.add);
router.put('/updateDriver', driverController.update);
router.delete('/deleteDriver', driverController.deleteById);

const routeDetailsController = require('./routeDetails/routeDetailsController');

router.get('/routes', routeDetailsController.indexAll);
router.get('/routes/:id', routeDetailsController.indexOne);
router.post('/routes', routeDetailsController.add);
router.put('/routes/:id', routeDetailsController.update);
router.delete('/routes/:id', routeDetailsController.deleteById);

const petShopController = require('./petshop/petShopController');

router.get('/shops', petShopController.indexAll);
router.get('/shop', petShopController.indexOne);
router.post('/newShop', petShopController.add);
router.put('/updateShop', petShopController.update);
router.delete('/deleteShop', petShopController.deleteById);

const productsController = require('./products/productsController');

router.get('/products', productsController.indexAll);
router.get('/products/:category', productsController.indexByCategory);
router.get('/shopProducts', commentsController.indexByUser);
router.post('/products', productsController.add);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.deleteById);

const mailController = require('./mail/mailController');

router.post('/send-code', mailController.sendCode);
router.post('/verify-code', mailController.verifyCode);

module.exports = router;
