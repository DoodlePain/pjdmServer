var express = require('express');
var app = express();
var cors = require('cors');
var axios = require('axios');
var config = require('./config/config');
var data = require('./testData.json')

app.use(cors());

app.get('/testNode', (req,res)=>{
    console.log("Testing node");
    res.json({"Response":"Node working"});
})

app.get('/ListCurrency',(req,res)=>{
    var response = []
    data.map((element,index)=>{
        var dataToRetrieve ={}
        dataToRetrieve["id"] = element.id;
        dataToRetrieve["rank"] = element.cmc_rank;
        dataToRetrieve["name"] = element.name;
        dataToRetrieve["symbol"] = element.symbol;
        response = [...response,dataToRetrieve];
    })
    res.json(response)
})

app.get('/data?:symbol',(req,res)=>{
    axios.get("https://min-api.cryptocompare.com/data/histoday?fsym="+req.query.symbol.toUpperCase()+"&tsym=USD&limit=30")
        .then(data=>{
            console.log(req.query.symbol);
            res.json(data.data.Data)
        })
})

app.get('/currency?:symbol',(req,res)=>{
    console.log(req.query.symbol);
    axios.get('https://bravenewcoin-v1.p.rapidapi.com/ticker?show=usd&coin='+req.query.symbol,{
        headers:{
            "X-RapidAPI-Host":"bravenewcoin-v1.p.rapidapi.com",
            "X-RapidAPI-Key":"680fc78605msh2d4dcd1faa797f6p1d5eb0jsn5025f84f24dc"
        }
    }).then(data=>{
        console.log(data.data);
        res.json(data.data);
    })
})

app.listen(3000)