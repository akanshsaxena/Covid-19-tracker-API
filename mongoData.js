const mongoose = require('mongoose');
const url = "mongodb+srv://<user id>:<password>@covid19-neusj.mongodb.net/test";
const collection = "countryWiseData";

const dataSchema = new mongoose.Schema({
  country: String,
  confirmedCases: String,
  newCases: String,
  deaths: String,
  newDeaths: String,
  totalRecovered: String,
  activeCases: String,
  criticalCases: String,
  casesPerMillion: String,
  deathsPerMillion: String,
  totalTests: String,
  testsPerMillion: String,
  continent: String
});

const DataModel = mongoose.model(collection, dataSchema);

async function addData(countryName, arrOfData){
  mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>console.log("Connected to database"))
  .catch(err => console.log(`Cannot connect to Database because ${err}`));
  const data = {
    country: countryName,
    confirmedCases: arrOfData[1],
    newCases: arrOfData[2],
    deaths: arrOfData[3],
    newDeaths: arrOfData[4],
    totalRecovered: arrOfData[5],
    activeCases: arrOfData[6],
    criticalCases: arrOfData[7],
    casesPerMillion: arrOfData[8],
    deathsPerMillion: arrOfData[9],
    totalTests: arrOfData[10],
    testsPerMillion: arrOfData[11],
    continent: arrOfData[12]
  };
  const result = await DataModel.findOneAndUpdate({country: countryName}, data, {upsert: true});
  mongoose.connection.close()
  .then(()=> console.log("Connection closed"))
  .catch(err => console.log(`Cannot close the connection because {$err}`));
}

async function searchCountryWiseData(countryName){
  mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>console.log("Connected to database"))
  .catch(err => console.log(`Cannot connect to Database because ${err}`));
  const result = await DataModel
  .find({country: countryName})
  .select({
      _id: -1,
      country: 1,
      __v: -1,
      confirmedCases: 1,
      newCases: 1,
      deaths: 1,
      newDeaths: 1,
      totalRecovered: 1,
      activeCases: 1,
      criticalCases: 1,
      casesPerMillion: 1,
      deathsPerMillion: 1,
      totalTests: 1,
      testsPerMillion: 1,
      continent: 1
  });
  //console.log(result);
  mongoose.connection.close()
  .then(()=> console.log("Connection closed"))
  .catch(err => console.log(`Cannot close the connection because ${err}`));
  if(result.length == 0){
    return null;
  }
  else{
    return result[0];
  }
}


module.exports.addData = addData;
module.exports.searchCountryWiseData= searchCountryWiseData;
