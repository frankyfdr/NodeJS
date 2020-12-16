const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const { request } = require("http");
var PORT = process.env.PORT || 3001;

//iniciando app
const app = express();
app.use(cors());
app.use(express.json());

//const db = require("./src/db");
//iniciando dB
// mongoose.connect("mongodb://user@password:27017/stockapi")
/*mongoose.connect("mongodb://localhost:27017/stockapi", {
  useNewUrlParser: true,
});*/
app.all('/', function (req, res) {
res.send("API ON:"+PORT);
  
})

app.all('/client', function (req, res) {
  axios.get("https://api.astroip.co/148.63.116.220?api_key=1725e47c-1486-4369-aaff-463cc9764026&hostname=true")
  .then(data => {
    console.log(data.data.geo.country_name +" | "+data.data.ip);
    res.send(data.data);
  })
  
})
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
      "https://query2.finance.yahoo.com/v1/finance/lookup?formatted=true&lang=en-US&query=" +
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
     
      
    });
});

app.get("/key/:sym", (req, res) => {

  let  utwo = "https://query2.finance.yahoo.com/v10/finance/quoteSummary/"+req.params.sym+"?formatted=true&crumb=KfwX0wlB0.o&lang=en-US&region=US&modules=defaultKeyStatistics%2CfinancialData%2CcalendarEvents";
  
  let uthree ="https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/"+req.params.sym+"?&symbol=TSLA&padTimeSeries=true&type=annualEbitda%2CtrailingEbitda%2CannualDilutedAverageShares%2CtrailingDilutedAverageShares%2CannualBasicAverageShares%2CtrailingBasicAverageShares%2CannualDilutedEPS%2CtrailingDilutedEPS%2CannualBasicEPS%2CtrailingBasicEPS%2CannualNetIncomeCommonStockholders%2CtrailingNetIncomeCommonStockholders%2CannualNetIncome%2CtrailingNetIncome%2CannualNetIncomeContinuousOperations%2CtrailingNetIncomeContinuousOperations%2CannualTaxProvision%2CtrailingTaxProvision%2CannualPretaxIncome%2CtrailingPretaxIncome%2CannualOtherIncomeExpense%2CtrailingOtherIncomeExpense%2CannualInterestExpense%2CtrailingInterestExpense%2CannualOperatingIncome%2CtrailingOperatingIncome%2CannualOperatingExpense%2CtrailingOperatingExpense%2CannualSellingGeneralAndAdministration%2CtrailingSellingGeneralAndAdministration%2CannualResearchAndDevelopment%2CtrailingResearchAndDevelopment%2CannualGrossProfit%2CtrailingGrossProfit%2CannualCostOfRevenue%2CtrailingCostOfRevenue%2CannualTotalRevenue%2CtrailingTotalRevenue&merge=false&period1=493590046&period2=1603650629";
  
  let uone = "https://query1.finance.yahoo.com/v10/finance/quoteSummary/"+req.params.sym+"?formatted=true&crumb=c4pW%2Ff2oJdf&lang=pt-BR&region=BR&modules=price%2CsummaryDetail%2CpageViews%2CfinancialsTemplate";
  
 let ufour = "https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/"+req.params.sym+"?lang=en-US&region=US&symbol=NFLX&padTimeSeries=true&type=annualTreasurySharesNumber%2CtrailingTreasurySharesNumber%2CannualPreferredSharesNumber%2CtrailingPreferredSharesNumber%2CannualOrdinarySharesNumber%2CtrailingOrdinarySharesNumber%2CannualShareIssued%2CtrailingShareIssued%2CannualNetDebt%2CtrailingNetDebt%2CannualTotalDebt%2CtrailingTotalDebt%2CannualTangibleBookValue%2CtrailingTangibleBookValue%2CannualInvestedCapital%2CtrailingInvestedCapital%2CannualWorkingCapital%2CtrailingWorkingCapital%2CannualNetTangibleAssets%2CtrailingNetTangibleAssets%2CannualCapitalLeaseObligations%2CtrailingCapitalLeaseObligations%2CannualCommonStockEquity%2CtrailingCommonStockEquity%2CannualPreferredStockEquity%2CtrailingPreferredStockEquity%2CannualTotalCapitalization%2CtrailingTotalCapitalization%2CannualTotalEquityGrossMinorityInterest%2CtrailingTotalEquityGrossMinorityInterest%2CannualMinorityInterest%2CtrailingMinorityInterest%2CannualStockholdersEquity%2CtrailingStockholdersEquity%2CannualOtherEquityInterest%2CtrailingOtherEquityInterest%2CannualGainsLossesNotAffectingRetainedEarnings%2CtrailingGainsLossesNotAffectingRetainedEarnings%2CannualOtherEquityAdjustments%2CtrailingOtherEquityAdjustments%2CannualFixedAssetsRevaluationReserve%2CtrailingFixedAssetsRevaluationReserve%2CannualForeignCurrencyTranslationAdjustments%2CtrailingForeignCurrencyTranslationAdjustments%2CannualMinimumPensionLiabilities%2CtrailingMinimumPensionLiabilities%2CannualUnrealizedGainLoss%2CtrailingUnrealizedGainLoss%2CannualTreasuryStock%2CtrailingTreasuryStock%2CannualRetainedEarnings%2CtrailingRetainedEarnings%2CannualAdditionalPaidInCapital%2CtrailingAdditionalPaidInCapital%2CannualCapitalStock%2CtrailingCapitalStock%2CannualOtherCapitalStock%2CtrailingOtherCapitalStock%2CannualCommonStock%2CtrailingCommonStock%2CannualPreferredStock%2CtrailingPreferredStock%2CannualTotalPartnershipCapital%2CtrailingTotalPartnershipCapital%2CannualGeneralPartnershipCapital%2CtrailingGeneralPartnershipCapital%2CannualLimitedPartnershipCapital%2CtrailingLimitedPartnershipCapital%2CannualTotalLiabilitiesNetMinorityInterest%2CtrailingTotalLiabilitiesNetMinorityInterest%2CannualTotalNonCurrentLiabilitiesNetMinorityInterest%2CtrailingTotalNonCurrentLiabilitiesNetMinorityInterest%2CannualOtherNonCurrentLiabilities%2CtrailingOtherNonCurrentLiabilities%2CannualLiabilitiesHeldforSaleNonCurrent%2CtrailingLiabilitiesHeldforSaleNonCurrent%2CannualRestrictedCommonStock%2CtrailingRestrictedCommonStock%2CannualPreferredSecuritiesOutsideStockEquity%2CtrailingPreferredSecuritiesOutsideStockEquity%2CannualDerivativeProductLiabilities%2CtrailingDerivativeProductLiabilities%2CannualEmployeeBenefits%2CtrailingEmployeeBenefits%2CannualNonCurrentPensionAndOtherPostretirementBenefitPlans%2CtrailingNonCurrentPensionAndOtherPostretirementBenefitPlans%2CannualNonCurrentAccruedExpenses%2CtrailingNonCurrentAccruedExpenses%2CannualDuetoRelatedPartiesNonCurrent%2CtrailingDuetoRelatedPartiesNonCurrent%2CannualTradeandOtherPayablesNonCurrent%2CtrailingTradeandOtherPayablesNonCurrent%2CannualNonCurrentDeferredLiabilities%2CtrailingNonCurrentDeferredLiabilities%2CannualNonCurrentDeferredRevenue%2CtrailingNonCurrentDeferredRevenue%2CannualNonCurrentDeferredTaxesLiabilities%2CtrailingNonCurrentDeferredTaxesLiabilities%2CannualLongTermDebtAndCapitalLeaseObligation%2CtrailingLongTermDebtAndCapitalLeaseObligation%2CannualLongTermCapitalLeaseObligation%2CtrailingLongTermCapitalLeaseObligation%2CannualLongTermDebt%2CtrailingLongTermDebt%2CannualLongTermProvisions%2CtrailingLongTermProvisions%2CannualCurrentLiabilities%2CtrailingCurrentLiabilities%2CannualOtherCurrentLiabilities%2CtrailingOtherCurrentLiabilities%2CannualCurrentDeferredLiabilities%2CtrailingCurrentDeferredLiabilities%2CannualCurrentDeferredRevenue%2CtrailingCurrentDeferredRevenue%2CannualCurrentDeferredTaxesLiabilities%2CtrailingCurrentDeferredTaxesLiabilities%2CannualCurrentDebtAndCapitalLeaseObligation%2CtrailingCurrentDebtAndCapitalLeaseObligation%2CannualCurrentCapitalLeaseObligation%2CtrailingCurrentCapitalLeaseObligation%2CannualCurrentDebt%2CtrailingCurrentDebt%2CannualOtherCurrentBorrowings%2CtrailingOtherCurrentBorrowings%2CannualLineOfCredit%2CtrailingLineOfCredit%2CannualCommercialPaper%2CtrailingCommercialPaper%2CannualCurrentNotesPayable%2CtrailingCurrentNotesPayable%2CannualPensionandOtherPostRetirementBenefitPlansCurrent%2CtrailingPensionandOtherPostRetirementBenefitPlansCurrent%2CannualCurrentProvisions%2CtrailingCurrentProvisions%2CannualPayablesAndAccruedExpenses%2CtrailingPayablesAndAccruedExpenses%2CannualCurrentAccruedExpenses%2CtrailingCurrentAccruedExpenses%2CannualInterestPayable%2CtrailingInterestPayable%2CannualPayables%2CtrailingPayables%2CannualOtherPayable%2CtrailingOtherPayable%2CannualDuetoRelatedPartiesCurrent%2CtrailingDuetoRelatedPartiesCurrent%2CannualDividendsPayable%2CtrailingDividendsPayable%2CannualTotalTaxPayable%2CtrailingTotalTaxPayable%2CannualIncomeTaxPayable%2CtrailingIncomeTaxPayable%2CannualAccountsPayable%2CtrailingAccountsPayable%2CannualTotalAssets%2CtrailingTotalAssets%2CannualTotalNonCurrentAssets%2CtrailingTotalNonCurrentAssets%2CannualOtherNonCurrentAssets%2CtrailingOtherNonCurrentAssets%2CannualDefinedPensionBenefit%2CtrailingDefinedPensionBenefit%2CannualNonCurrentPrepaidAssets%2CtrailingNonCurrentPrepaidAssets%2CannualNonCurrentDeferredAssets%2CtrailingNonCurrentDeferredAssets%2CannualNonCurrentDeferredTaxesAssets%2CtrailingNonCurrentDeferredTaxesAssets%2CannualDuefromRelatedPartiesNonCurrent%2CtrailingDuefromRelatedPartiesNonCurrent%2CannualNonCurrentNoteReceivables%2CtrailingNonCurrentNoteReceivables%2CannualNonCurrentAccountsReceivable%2CtrailingNonCurrentAccountsReceivable%2CannualFinancialAssets%2CtrailingFinancialAssets%2CannualInvestmentsAndAdvances%2CtrailingInvestmentsAndAdvances%2CannualOtherInvestments%2CtrailingOtherInvestments%2CannualInvestmentinFinancialAssets%2CtrailingInvestmentinFinancialAssets%2CannualHeldToMaturitySecurities%2CtrailingHeldToMaturitySecurities%2CannualAvailableForSaleSecurities%2CtrailingAvailableForSaleSecurities%2CannualFinancialAssetsDesignatedasFairValueThroughProfitorLossTotal%2CtrailingFinancialAssetsDesignatedasFairValueThroughProfitorLossTotal%2CannualTradingSecurities%2CtrailingTradingSecurities%2CannualLongTermEquityInvestment%2CtrailingLongTermEquityInvestment%2CannualInvestmentsinJointVenturesatCost%2CtrailingInvestmentsinJointVenturesatCost%2CannualInvestmentsInOtherVenturesUnderEquityMethod%2CtrailingInvestmentsInOtherVenturesUnderEquityMethod%2CannualInvestmentsinAssociatesatCost%2CtrailingInvestmentsinAssociatesatCost%2CannualInvestmentsinSubsidiariesatCost%2CtrailingInvestmentsinSubsidiariesatCost%2CannualInvestmentProperties%2CtrailingInvestmentProperties%2CannualGoodwillAndOtherIntangibleAssets%2CtrailingGoodwillAndOtherIntangibleAssets%2CannualOtherIntangibleAssets%2CtrailingOtherIntangibleAssets%2CannualGoodwill%2CtrailingGoodwill%2CannualNetPPE%2CtrailingNetPPE%2CannualAccumulatedDepreciation%2CtrailingAccumulatedDepreciation%2CannualGrossPPE%2CtrailingGrossPPE%2CannualLeases%2CtrailingLeases%2CannualConstructionInProgress%2CtrailingConstructionInProgress%2CannualOtherProperties%2CtrailingOtherProperties%2CannualMachineryFurnitureEquipment%2CtrailingMachineryFurnitureEquipment%2CannualBuildingsAndImprovements%2CtrailingBuildingsAndImprovements%2CannualLandAndImprovements%2CtrailingLandAndImprovements%2CannualProperties%2CtrailingProperties%2CannualCurrentAssets%2CtrailingCurrentAssets%2CannualOtherCurrentAssets%2CtrailingOtherCurrentAssets%2CannualHedgingAssetsCurrent%2CtrailingHedgingAssetsCurrent%2CannualAssetsHeldForSaleCurrent%2CtrailingAssetsHeldForSaleCurrent%2CannualCurrentDeferredAssets%2CtrailingCurrentDeferredAssets%2CannualCurrentDeferredTaxesAssets%2CtrailingCurrentDeferredTaxesAssets%2CannualRestrictedCash%2CtrailingRestrictedCash%2CannualPrepaidAssets%2CtrailingPrepaidAssets%2CannualInventory%2CtrailingInventory%2CannualInventoriesAdjustmentsAllowances%2CtrailingInventoriesAdjustmentsAllowances%2CannualOtherInventories%2CtrailingOtherInventories%2CannualFinishedGoods%2CtrailingFinishedGoods%2CannualWorkInProcess%2CtrailingWorkInProcess%2CannualRawMaterials%2CtrailingRawMaterials%2CannualReceivables%2CtrailingReceivables%2CannualReceivablesAdjustmentsAllowances%2CtrailingReceivablesAdjustmentsAllowances%2CannualOtherReceivables%2CtrailingOtherReceivables%2CannualDuefromRelatedPartiesCurrent%2CtrailingDuefromRelatedPartiesCurrent%2CannualTaxesReceivable%2CtrailingTaxesReceivable%2CannualAccruedInterestReceivable%2CtrailingAccruedInterestReceivable%2CannualNotesReceivable%2CtrailingNotesReceivable%2CannualLoansReceivable%2CtrailingLoansReceivable%2CannualAccountsReceivable%2CtrailingAccountsReceivable%2CannualAllowanceForDoubtfulAccountsReceivable%2CtrailingAllowanceForDoubtfulAccountsReceivable%2CannualGrossAccountsReceivable%2CtrailingGrossAccountsReceivable%2CannualCashCashEquivalentsAndShortTermInvestments%2CtrailingCashCashEquivalentsAndShortTermInvestments%2CannualOtherShortTermInvestments%2CtrailingOtherShortTermInvestments%2CannualCashAndCashEquivalents%2CtrailingCashAndCashEquivalents%2CannualCashEquivalents%2CtrailingCashEquivalents%2CannualCashFinancial%2CtrailingCashFinancial&merge=false&period1=493590046&period2=1605885485";
 
 
  const one = axios.get(uone);
  const two = axios.get(utwo);
  const three = axios.get(uthree);
  const four = axios.get(ufour);
  const five =  axios.get("https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + req.params.sym);
  axios 
    .all([one,two,three,four,five])
    .then(axios.spread((...responses) => {
      const responseOne = responses[0].data.quoteSummary;
      const responseTwo = responses[1].data.quoteSummary.result[0];
      const responesThree = responses[2].data.timeseries;
      const responesFour = responses[3].data.timeseries;
      const responesFive = responses[4].data.quoteResponse.result[0];


      let WorkingCapital;
      let name = responesFive.displayName;
      let price = responesFive.regularMarketPrice;
      let change = responesFive.regularMarketChangePercent.toFixed(2);
      let EPS = responseTwo.defaultKeyStatistics.trailingEps.fmt;
      let QuickRatio = responseTwo.financialData.quickRatio.fmt // two
      let Debt_Equity  = responseTwo.financialData.debtToEquity.fmt;
      let ROE = responseTwo.financialData.returnOnEquity.fmt;  //one
      
      responesFour.result.map((item) => {
        if(item.annualWorkingCapital) {
          WorkingCapital = item.annualWorkingCapital[3].reportedValue.fmt;
        }
        
      })

     let data = 
     {
     	Name: name,
     	Price: price,
     	Change: change,
       WorkingCapital: WorkingCapital,
       QuickRatio: QuickRatio,
       ROE: ROE,
       EPS: EPS,
       Debt_Equity: Debt_Equity,
      };
     res.send(data);

    // let WorkinCapital = responesFour.result[38].annualWorkingCapital[3].reportedValue.fmt;
      //two
    
     //console.log(WorkinCapital);
    })).catch(function (error) {
      console.log("Promise Rejected: ",error);
    });
 
  });

app.get("/graf", (req, res) => {  

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

  

  axios
    .get(
      "https://query1.finance.yahoo.com/v8/finance/chart/AXP?symbol=AXP&period1=1602172140&period2=1602532800&interval=1m&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=gVOumV8ktPD&corsDomain=finance.yahoo.com"
    )
    .then((data) => {
      res.send(data.data);
    });
    

*/


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
