const firestoreService = require('firestore-export-import');
var admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount.json')
var Xray = require("x-ray");
var x = Xray().concurrency(2);
let Ans =[];
x("https://www.coingecko.com/",   "tbody",
['td'])(async function  (err, obj) {

var str = JSON.stringify(obj);
var convertedStr= str.replace(/\\n/g, ' ')
var StrRemove = JSON.stringify(convertedStr)
let arry =[]
for(let i = 0; i < 22; i++)
{
    if(i % 11 !=0 && i !=0)
    {
        arry.push(obj[i])
    }else{
        arry = []
    }

}
console.log(arry)

}).write("Test.json")
