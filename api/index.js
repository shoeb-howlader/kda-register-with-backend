var express = require('express');
var productRoute=require('../routeHandeler/productHandeler')
var categoryRoute=require('../routeHandeler/categoryHandeler')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Welcome to api');
});

router.use('/products', productRoute);
router.use('/categories', categoryRoute);

module.exports = router;
