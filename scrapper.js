const puppeteer = require("puppeteer");
var mongo = require("mongodb");
const url = "mongodb+srv://akanshsaxena:Mongo%40723@covid19-neusj.mongodb.net/Covid19";
var dataBase = "dataBase";
var collection = "countryWiseData";

mongo.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


mongo.connect(url,{ useNewUrlParser: true }, function(err, db){
	if (err) throw err;
  var dbo = db.db(dataBase);
  dbo.createCollection(collection, function(err, res) {
    if (err) throw err;
    db.close();
  });
});


async function getValue(element, propertyName){
  try{
    const property = await element.getProperty(propertyName);
    return await property.jsonValue();
  }
  catch(error){
    console.log(`5 ${error}`);
  }
}

async function dataScraper(){
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.google.com/covid19-map/", { waitUntil: 'networkidle0' });
    console.log("connecting to Mongo Database");
    await getData(page);
    await browser.close();
  }
  catch(error){
    console.log(`3 ${error}`);
  }
}

async function getData(page){
    const tableBody = await page.$('tbody');
    const tableData = await tableBody.$$("tr");
    console.log(`tableData length ${tableData.length}`);
    let count = 0;
    const rowsMapping = tableData.map(async (rows)=>{
        const values = await rows.$$('td');
        let index = 0;
        let arr = [];
        for(index=0; index<values.length; index++){
            arr[index] = await getValue(values[index], 'innerText');
        }
      const jsonData={
        country: arr[0],
        confirmedCases: arr[1],
        patientsPerMillion: arr[2],
        recoveredPatients: arr[3],
        deaths: arr[4]
      };
      count++;
      console.log(arr);
      await mongo.connect(url,{ useNewUrlParser: true }, function(err, db){
      	if (err) throw err;
        var dbo = db.db(dataBase);
        dbo.collection(collection).update({country: arr[0]}, jsonData, { upsert: true });
        db.close();
      });
    });
    await Promise.all(rowsMapping);
    console.log(`Updated ${count} fields`);
}


module.exports.dataScraper = dataScraper;
