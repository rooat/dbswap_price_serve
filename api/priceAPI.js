var config = require('../config');

class PriceAPI {
	getPriceByCoin = async (req, res, next) => {
		let from = req.query.from;
		let to = req.query.to;
		let limit = req.query.limit;
		if(from && to && limit){
			let list = await config.db.ETH_Price.find({"from": from,"to":to}).sort({"createAt":-1}).limit(Number(limit));
			return res.send({"resp": list})
		}
		return res.send({"resp":"params invalid"})
	}
	getPriceByCoinLatest = async (req,res,next)=>{
		let from = req.query.from;
		let to = req.query.to;
		let latest = await config.db.ETH_Price.find({"from": from,"to":to}).sort({"createAt":-1}).limit(1);
		return res.send({"resp": latest})
	}
}

module.exports = PriceAPI
