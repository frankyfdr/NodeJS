const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
var url = require("url");

//iniciando app
const app = express();
app.use(cors());
app.use(express.json());

//iniciando dB
// mongoose.connect("mongodb://user@password:27017/stockapi")
/*mongoose.connect("mongodb://localhost:27017/stockapi", {
  useNewUrlParser: true,
});*/

app.get("/info/:sym", (req, res) => {
  axios
    .get(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" +
        req.params.sym
    )
    .then((data) => {
      res.send(data.data);
    });
});
app.get("/lookup/:sym", (req, res) => {
  axios
    .get(
      "https://query2.finance.yahoo.com/v1/finance/lookup?formatted=true&lang=en-US&region=US&query=" +
        req.params.sym +
        "&type=all&count=5&start=0"
    )
    .then((data) => {
      res.send(data.data);
    });
});

app.get("/logo/:sym", (req, res) => {
  axios
    .get(
      "https://query2.finance.yahoo.com/v10/finance/quoteSummary/" +
        req.params.sym +
        "?modules=assetProfile"
    )
    .then((data) => {
      res.send(data.data.quoteSummary);
    });
});

app.listen(3001);

/*
https://query2.finance.yahoo.com/v10/finance/quoteSummary/AXP?formatted=true
&crumb=gVOumV8ktPD&lang=en-US&region=US&modules=assetProfile%2CsecFilings&corsDomain=finance.yahoo.com

*/
