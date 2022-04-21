const firestoreService = require("firestore-export-import");
var admin = require("firebase-admin");
var express = require("express");
const serviceAccount = require("./serviceAccount.json");
var cors = require('cors');
var Xray = require("x-ray");
var x = Xray();
let Ans = [];
var app = express();
app.use(cors())
const PORT = process.env.PORT || 3001;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testpro-58820.firebaseio.com",
});

function doSomeShit() {
  x("https://finance.yahoo.com/cryptocurrencies/", "tbody", ["td"])(
    async function (err, obj) {
      let numb = 1;
      for (let i = 0; i < obj.length; i++) {
        if (i % 12 == 0 && i != 0) {
          await admin
            .firestore()
            .collection("Concurrency5")
            .doc(`${numb}`)
            .update({
              Name: Ans[1],
              Price: Ans[2],
              Change: Ans[3],
              "Change By Percent": Ans[4],
              "Market Cap": Ans[5],
              "Volume in Currency (Since 0:00 UTC)": Ans[6],
              "Volume in Currency (24Hr)": Ans[7],
              "Total Volume All Currencies (24Hr)": Ans[8],
              "Circulating Supply	": Ans[9],
            })
            
          numb++;

          Ans = [];
        }

        Ans.push(obj[i]);
      }

      await admin.firestore().collection("Concurrency5").doc(`${numb}`).update({
        Name: Ans[1],
        Price: Ans[2],
        Change: Ans[3],
        "Change By Percent": Ans[4],
        "Market Cap": Ans[5],
        "Volume in Currency (Since 0:00 UTC)": Ans[6],
        "Volume in Currency (24Hr)": Ans[7],
        "Total Volume All Currencies (24Hr)": Ans[8],
        "Circulating Supply	": Ans[9],
      });
      Ans = [];
      numb = 1;
    }
  );
}

app.get("/", async (req, res) => {
  try {
   
      await doSomeShit();
      console.log("test")
    res.status(200).json("Good")
  } catch (err) {
    res.status(500).json(err);
  }
});

// (async function doSomeStuff() {
//   while (true) {
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//     doSomeShit();
//     // do some stuff
//   }
// })();

app.listen(3001, () => console.log(`Hello world app listening on port !`));
