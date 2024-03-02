const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('simple_1', () => {
        chai.request(server).get('/api/stock-prices/').end(function(err, res){
            assert.equal(res.status, 200);
        })
    })

    test('simple_2', () => {
        chai.request(server).get('/api/stock-prices/').query({stock:'GOOG',like:'true'}).end(function(err, res){
            assert.equal(res.status, 200);
        })
    })

    test('simple_3', () => {
        chai.request(server).get('/api/stock-prices/').query({stock:'GOOG',like:'true'}).end(function(err, res){
            assert.equal(res.status, 200);
        })
    })

    test('simple_4', () => {
        chai.request(server).get('/api/stock-prices/').query({stock:'GOOG',GOOG:'MSFT'}).end(function(err, res){
            assert.equal(res.status, 200);
        })
    })

    test('simple_5', () => {
        chai.request(server).get('/api/stock-prices/').query({stock:'GOOG',GOOG:'MSFT',like:'true'}).end(function(err, res){
            assert.equal(res.status, 200);
        })
    })
});


//查看股价：发送 GET 请求到 /api/stock-prices/
//查看一个股票并关注它：发送 GET 请求到 /api/stock-prices/
//查看同一只股票并再次发送关注：发送 GET 请求到 /api/stock-prices/
//查看两只股票：发送 GET 请求到 /api/stock-prices/
//查看两只股票并关注它：发送 GET 请求到 /api/stock-prices/
