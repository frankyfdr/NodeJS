const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const { request } = require("http");

var PORT = process.env.PORT || 3001;

//iniciando app
const app = express();
app.use(cors());
app.use(express.json());

const db = require("./db");
const { nextTick } = require("process");
const { response } = require("express");
const { exec } = require("child_process");
app.use("/api", require("./routes.js"));

app.all('/', function (req, res,next) {

  axios.get("https://api.astroip.co/148.63.116.220?api_key=1725e47c-1486-4369-aaff-463cc9764026&hostname=true")
  .then(data => {
  
    var string = "\n-------------------------------------------------------------------\n"+
                   data.data.ip +" | "+data.data.geo.country_name +" | "+Date(Date.now())+
                 "\n-------------------------------------------------------------------";
    fs.appendFile('log.txt', string, function (err) {
      if (err) throw err;
      console.log(string);
    });
    
  })
  next();
})

app.all('/client', function (req, res) {

  
})


// request for live price of stock
app.get("/info/:sym", (req, res) => {
  axios
    .get(
      // API URL 
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" +
        req.params.sym
    )
    .then((data) => {
      // Sending the data to Frond-end app
      res.send(data.data);
    });
});

// request for keyword stock search
app.get("/lookup/:sym", (req, res) => {
  axios
    .get(
      // API URL 
      "https://query2.finance.yahoo.com/v1/finance/lookup?formatted=true&lang=en-US&query=" +
        req.params.sym +
        "&type=all&count=5&start=0"
    )
    .then((data) => {
      res.send(data.data); // Sending the data to Frond-end app
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
     
      
    });
});

app.get("/key/:sym", (req, res) => {

try{
  const cashFlow =   axios.get("https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/"+req.params.sym+"?lang=en-GB&region=GB&symbol="+req.body.sym+"&padTimeSeries=true&type=annualTotalLiabilitiesNetMinorityInterest%2CtrailingCostOfRevenue%2CannualCashDividendsPaid%2CtrailingCashDividendsPaid%2CtrailingInvestingCashFlow%2CannualInvestingCashFlow%2CannualNetIncome%2CannualEbitda&merge=false&period1=493590046&period2=1612014480")
  const uone = axios.get("https://query1.finance.yahoo.com/v10/finance/quoteSummary/"+req.params.sym+"?&modules=pageViews%2CassetProfile%2CsecFilings%2Cprice%2CsummaryDetail%2CpageViews%2CfinancialsTemplate%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CcalendarEventsformatted=true&crumb=c4pW%2Ff2oJdf&lang=pt-BR&region=BR");

  axios.all([uone,cashFlow])
  .then(axios.spread((...responses) => {

    const sumary = responses[0].data.quoteSummary.result[0]
    const cash = responses[1].data.timeseries.result;
    
    
     let x= cash.map((item)=>{
        var {meta,timestamp,...rest} = item
            
           return rest
                        
            })
      const financial = Object.assign({}, ...x);
    
  


    let netIncomeCAGR = "N/A"
    if(financial.annualNetIncome)
    {
     let nYears = financial.annualNetIncome.length;
     netIncomeCAGR = (Math.pow( financial.annualNetIncome[0].reportedValue.raw /financial.annualNetIncome[nYears-1].reportedValue.raw,(1/nYears))-1).toFixed(2)
    }
    let ebitdaCAGR ="N/A"

    if(financial.annualEbitda)
    {
     let nYearsEbitda = financial.annualEbitda.length;
     ebitdaCAGR = (Math.pow( financial.annualEbitda[0].reportedValue.raw /financial.annualEbitda[nYearsEbitda-1].reportedValue.raw,(1/nYearsEbitda))-1).toFixed(2)
    }


    //res.json(financial)
    let bookValue = sumary.defaultKeyStatistics.bookValue.raw;
    let ebitda = sumary.financialData.ebitda.raw

    let totalLibialities = financial.annualTotalLiabilitiesNetMinorityInterest[financial.annualTotalLiabilitiesNetMinorityInterest.length-1].reportedValue.raw 

    let totalCostRevenue = "N/A"
    if(financial.trailingCostOfRevenue)
    totalCostRevenue = financial.trailingCostOfRevenue[0].reportedValue.raw
	
	
	let dividendYield = sumary.summaryDetail.dividendYield.fmt
	if(dividendYield =="")
	dividendYield = "N/A"
	
	let forwardPE = sumary.summaryDetail.forwardPE.fmt
	let trailingPE = sumary.summaryDetail.trailingPE.fmt
	let ProfitMargin = sumary.financialData.profitMargins.fmt
	let debtToEquity = sumary.financialData.debtToEquity.fmt
	let operatingMargins = sumary.financialData.operatingMargins.fmt
	let peg = sumary.defaultKeyStatistics.pegRatio.raw
	let totalCash = sumary.financialData.totalCash.raw
	let totalRevenue = sumary.financialData.totalRevenue.raw
	let netIncome = sumary.defaultKeyStatistics.netIncomeToCommon.raw
	let name = sumary.price.shortName;
	let price = sumary.price.regularMarketPrice.fmt;
	let change = sumary.price.regularMarketChangePercent.fmt;
	let EPS = sumary.defaultKeyStatistics.trailingEps.fmt;
	let QuickRatio = sumary.financialData.quickRatio.fmt // two
	let Debt_Equity  = sumary.financialData.debtToEquity.fmt;
	let ROE = sumary.financialData.returnOnEquity.fmt;  //one
	let ROA = sumary.financialData.returnOnAssets.fmt

    let InvestCapital ="N/A"
    if(financial.trailingInvestingCashFlow)
    InvestCapital = financial.trailingInvestingCashFlow[0].reportedValue.raw

    let ROIC = "N/A"

    if(InvestCapital != "N/A")
    ROIC = (netIncome/InvestCapital).toFixed(2);
    let GrossMargin ="N/A"
    if(totalRevenue != "N/A" && totalCostRevenue != "N/A")
    GrossMargin = (((totalRevenue-totalCostRevenue)/totalRevenue*100)).toFixed(2)+"%"
    let NetMargin = ((netIncome/totalRevenue)*100).toFixed(2)+"%"
    let NetDebt = (totalLibialities-totalCash)
    let DL_P = (NetDebt/bookValue).toFixed(0)
    let DL_E = (NetDebt/ebitda)
    let currentRatio = sumary.financialData.currentRatio.fmt
    let DIVB_E = (totalLibialities/ebitda)
  
    
  
    let data = 
    {
	
      Name: name,
      Price: price,
      Change: change,
      QuickRatio: QuickRatio,
      ROE: ROE,
      EPS: EPS,
      Debt_Equity: Debt_Equity,
      ROA:ROA,
      ROIC:ROIC,
      GrossMargin:GrossMargin,
      DL_P:DL_P,
      DL_E:DL_E,
      currentRatio:currentRatio,
      DIVB_E:DIVB_E,
      ebitdaCAGR:ebitdaCAGR,
      netIncomeCAGR:netIncomeCAGR,
      PEG:peg,
      ProfitMargin:ProfitMargin,
     debtToEquity:debtToEquity,
     operatingMargins:operatingMargins,
     forwardPE:forwardPE,
     trailingPE:trailingPE,
     dividendYield:dividendYield,
     }
    res.json(data)
    //res.json([cash,sumary])

  }))
  
}catch(err)
{
  console.log(err)
   res.send(401)
}

  });

app.get("/graf/:sym/:p1/:p2", (req, res) => {  
/*

  let unix_timestamp = 1602499800;
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();    console.log(data);
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();
var dia = date.getDate();
var mes = date.getMonth();
var ano = date.getFullYear();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
2
console.log(dia+"/"+mes+"/"+ano);
*/
//res.send([req.params.sym,req.params.p1,req.params.p2])
  axios
    .get(
      //"https://query1.finance.yahoo.com/v8/finance/chart/"+req.params.sym+"?symbol="+req.params.sym
      "https://query1.finance.yahoo.com/v8/finance/chart/"+req.params.sym+"?symbol="+req.params.sym+"&period1="+req.params.p1.substring(0,req.params.p1.length - 3)+"&period2="+req.params.p2.substring(0,req.params.p2.length - 3)+"&interval=30m&includePrePost=true&events=div%7Csplit%7Cearn"
    )
    .then((data) => {
      data = data.data.chart.result[0]
      var x = [...data.timestamp];
      var y = [...data.indicators.quote[0].close]
      res.send([x,y]);
    });
    




    })




console.log("Server running on port: ", PORT);
app.listen(PORT);

/*
https://query2.finance.yahoo.com/v10/finance/quoteSummary/AXP?formatted=true
&crumb=gVOumV8ktPD&lang=en-US&region=US&modules=assetProfile%2CsecFilings&corsDomain=finance.yahoo.com

*/


/*
      let Debt-Equity  = data.summaryDetail.financialData.debtToEquity.fmt //two
      let netProfit = data.timeseries.result[18].trailingNetIncome[0].reportedValue.fmt;
      let QuickRatio = data.summaryDetail.financialData.quickRatio.fmt // two
      let EPS = data.summaryDetail.defaultKeyStatistics.trailingEps.fmt //two
      let GrossProfit = data.data.timeseries.result[27].trailingGrossProfit[0].reportedValue.fmt; //three
      let WorkinCapital = data.data.timeseries.result[64].annualWorkingCapital[3].reportedValue.fmt // three
      let P_VP = data.defaultKeyStatistics.enterpriseValue.longFmt / data.financialData.currentPrice.fmt//two
      let PEG =  data.defaultKeyStatistics.pegRatio.fmt;  //one
      let P_L = data.summaryDetail.trailingPE.fmt;  //two
      let ROE = data.financialData.returnOnEquity.fmt;  //one
      let ROA = data.financialData.returnOnAssets.fmt; //one
      console.log(P_L);
      */
