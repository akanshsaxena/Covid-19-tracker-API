const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.use(express.json());

let data = [];

async function addData(place, confirmed, perMillion, recovered, deaths){
    if(data){
        const jsonData= {placeA:place, confirmedA:confirmed , perMillionA:perMillion , recoveredA:recovered , deathsA: deaths};
        data.push(jsonData);
    }
}
async function getValue(element, propertyName){
    const property = await element.getProperty(propertyName);
    return await property.jsonValue();
}

async function dataScraper(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.google.com/covid19-map/");

    await getData(page);
    await browser.close();
}

async function getData(page){
    const tableBody = await page.$('tbody');
    const tableData = await tableBody.$$('tr');
    const rowsMapping = tableData.map(async (rows)=>{
        const values = await rows.$$('td');
        let index = 0;
        let arr = [];
        for(index=0; index<values.length; index++){
            arr[index] = await getValue(values[index], 'innerText');
        }
      console.log(`${arr[0]}, ${arr[1]},${arr[2]},${arr[3]},${arr[4]}`);
      addData(arr[0], arr[1], arr[2], arr[3], arr[4]);
    });
    await Promise.all(rowsMapping);
}

app.use('/getData', async (req, res)=>{
    console.log("Calling data scrapper");
    await dataScraper();
    //console.log(output);
    console.log("Scrapper ended");
    res.send(data);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening to port ${port}`));
