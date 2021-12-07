var express = require('express');
var productRoute=require('../routeHandeler/productHandeler')
var categoryRoute=require('../routeHandeler/categoryHandeler')
var departmentRoute = require('../routeHandeler/departmentHandeler')
var designationRoute=require('../routeHandeler/designationHandeler')
var userRoute=require('../routeHandeler/userHandeler')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Welcome to api');  
});

router.use('/products', productRoute);
router.use('/categories', categoryRoute);
router.use('/departments', departmentRoute);  
router.use('/designations', designationRoute);
router.use('/user', userRoute);      

module.exports = router;
