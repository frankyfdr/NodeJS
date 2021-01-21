const express = require('express');
const mongoose = require('mongoose');
const  requireDir = require('require-dir');

const app = express();

mongoose.connect("mongodb://fdr:Mongodb501!2020@178.62.43.97:27017/admin",
{ useNewUrlParser: true, useUnifiedTopology: true }
 );
console.log("Stonks on");
 requireDir('./models');

 
