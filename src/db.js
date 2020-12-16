const express = require('express');
const mongoose = require('mongoose');
const  requireDir = require('require-dir');

const app = express();

mongoose.connect("mongodb://localhost:27017/stonks",
{ useNewUrlParser: true, useUnifiedTopology: true }
 );
console.log("Stonks on");
 requireDir('./models');

 
