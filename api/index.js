var express = require('express');
var productRoute=require('../routeHandeler/productHandeler')
var categoryRoute=require('../routeHandeler/categoryHandeler')
var departmentRoute = require('../routeHandeler/departmentHandeler')
var designationRoute=require('../routeHandeler/designationHandeler')
var userRoute=require('../routeHandeler/userHandeler')
const checkLogin =require('../middleware/checkLogin')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Welcome to api');  
});

router.use('/products',checkLogin, productRoute);
router.use('/categories',checkLogin, categoryRoute);
router.use('/departments',checkLogin, departmentRoute);  
router.use('/designations',checkLogin, designationRoute);
router.use('/user', userRoute);      

module.exports = router;
