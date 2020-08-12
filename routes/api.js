var express = require('express');
var router = express.Router();
var PriceAPI = require('../api/priceAPI');
var PriceAPI = new PriceAPI();

var auth = function (req, res, next) {
	if (req.session && req.session.isLogged) {
		return next();
		// req.session.destroy();
	}	
	else
		return res.json({ status: 'FAILED', message: 'Please Enter Deails gain.' });
};
router.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});


router.get('/priceList',PriceAPI.getPriceByCoin);
router.get('/getPriceByCoinLatest',PriceAPI.getPriceByCoinLatest)
module.exports = router;
