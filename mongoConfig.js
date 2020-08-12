
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
mongoose.Promise= require('bluebird')
mongoose.connect('mongodb://localhost:27017/dbswap_db',{"useMongoClient":true})


var ETH_Price = new mongoose.Schema({
     price: {type:Number, default:0},
     from : String,
     to: String,
     createAt : {type:Date,default:Date.now}
});

var ETH_Price = mongoose.model('eth_price', ETH_Price);

module.exports = {
	ETH_Price
}