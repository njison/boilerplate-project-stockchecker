'use strict';

const stocksDB = {};
async function getStock(stock) {
  const fetchRes = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`)
  const {symbol ,latestPrice} = await fetchRes.json()
  return {
    symbol,
    price: `${latestPrice}`
  }
}
async function addToStockDB(stock,like,ip) {
    const returnedStock = await getStock(stock);
    const {symbol,price} = returnedStock
  
    if(stocksDB.hasOwnProperty(symbol)){
      stocksDB[symbol] = {
        stock: symbol,
        price: price,
        likes: like =='true' ? stocksDB[symbol].likes + 1 : stocksDB[symbol].likes,
        ip: ip
      }
    }else{
      stocksDB[symbol] = {
        stock: symbol,
        price: price,
        likes: like=='true' ? 1 : 0,
        ip:ip
    }
  }
  return stocksDB;
}

async function getstocksDB(stock){
  return stocksDB;
}

module.exports = function (app) {

  app.route('/api/stock-prices').get( async function (req, res){
      const{ stock , like } = req.query;
      const ip = req.ip;
      console.log(req.query)
      var stocksDB = {};
      if(stock){
        if(typeof stock === 'string'){
          stocksDB = await addToStockDB(stock,like,ip.substr(ip.lastIndexOf(':')+1,ip.length))
          res.json({stockData:{stock:stock,price:Number(stocksDB[stock].price),likes:stocksDB[stock].likes}})
        }else{
          var stockData = []
          for(let i=0;i<stock.length;i++){
            stocksDB = await addToStockDB(stock[i],like)
            console.log(stocksDB[stock[i]])
            stockData.push({stock:stock,price:Number(stocksDB[stock[i]].price),rel_likes:stocksDB[stock[i]].likes})
          }
          res.json({stockData:stockData})
        }
      }
    });
    
};
