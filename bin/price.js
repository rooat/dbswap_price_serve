var config = require('../config');

const { ChainId, Route, Token, WETH, Fetcher,Trade } = require('@uniswap/sdk');
// const { ChainId, Route, Token, WETH, Fetcher,Trade } = require('converger_sdk');

const ADC = new Token(ChainId.MAINNET, '0x30db6DCb7230d20656ACC4F1DF8ef0c9bE28a0b5', 18)
const DEFIX = new Token(ChainId.MAINNET, '0x3Cde0EA55120D9D6FEC9a753e8cb2Bf78967528C', 18);
const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6);

const aDAI = new Token(ChainId.MAINNET, '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d', 18)
const AMPL  = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9)

        
class PriceClass {
    constructor(){
        this.coinArr = [{
            "name":"aDAI",
            'obj':aDAI
        },{
            "name":"AMPL",
            "obj":AMPL
        }];
    }

    start(){
        setInterval(()=>{
            this.coinArr.forEach(async (f)=>{
                let route = await this.getEthToToken(f.obj);
                if(route){
                    console.log("1 ETH => "+route.midPrice.toSignificant(6)+f.name) 
                    await this.savePrice("ETH",f.name,route.midPrice.toSignificant(6))
                    console.log("1"+f.name+" => "+route.midPrice.invert().toSignificant(6)+" ETH")
                    await this.savePrice(f.name,"ETH",route.midPrice.invert().toSignificant(6));
                }
            })
            
        },20000)
    }
    async savePrice(from,to,price){
        let obj = {
            "price":price,
            "from":from,
            "to":to
        }
        await config.db.ETH_Price(obj).save()
    }
    async getEthToToken(kind){
        try {
            const pair = await Fetcher.fetchPairData(kind, WETH[1])
            const route = new Route([pair], WETH[1])
            return route;
        } catch (error) {
            // console.log("err--",error)
        }
        return null;
    }
}

var price = new PriceClass();
price.start()