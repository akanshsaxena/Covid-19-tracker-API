const { CronJob } = require('cron');
const scrapper = require("./scrapper.js");

console.log("Creating Cron Job");

// 0 */2 * * * for every 2 hours
const fetchJobToRun = new CronJob("0 */2 * * *", async ()=>{
  console.log("Fetching time");
  let currentdate = new Date();
  let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  console.log("Running job");
  await scrapper.dataScraper();
  console.log(`Job ended, last updated at ${datetime}`);
});

fetchJobToRun.start();
