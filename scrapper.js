const puppeteer = require("puppeteer");
const mongoData = require("./mongoData.js")

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
    await page.goto("https://www.worldometers.info/coronavirus/#countries", { waitUntil: 'networkidle0' });
    await getData(page);
    await browser.close();
  }
  catch(error){
    console.log(`3 ${error}`);
  }
}

async function getData(page){
    const tableBody = await page.$('tbody');
    console.log(`tableBody ${tableBody}`);
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
        let countryName = arr[0];
        countryName = countryName.replace(/\s/g,"").toLowerCase();
        count++;
        console.log(arr);
        mongoData.addData(countryName, arr);
    });
    await Promise.all(rowsMapping);
    console.log(`Updated ${count} fields`);
}

module.exports.dataScraper = dataScraper;
