const mongoose = require("mongoose");

//URL

const uri = "mongodb+srv://akanshsaxena:Mongo%40723@covid19-neusj.mongodb.net/test"


const dataBase = "Covid19";
const collection = "countryWiseData";

//function to connect to Mongo DB database
async function connectMongoDatabase(){
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

//function to update(upsert) the data in the collection
async function upsertCountryData(countryName, data){
  await client.connect(async function(){
    try{
      //await client.connect();
      console.log("1st" , client.isConnected());
      await client.db(dataBase).collection(collection).updateOne({country: countryName},
                                                                 {$set: data},
                                                                 {upsert: true});
      await client.close();
      console.log("2nd" , client.isConnected());
    }
    catch(error){
      console.log(`1 ${error}`);
    }
  });
}

//function to search the dataFile
async function searchCountryWiseData(countryName){
  try{
    //await client.connect();
    const result = await client.db(dataBase).collection(collection).findOne({country: countryName});
    //await client.close();
    return await result;
  }
  catch(error){
    console.log(`2 ${error}`);
  }
}

//function to close the client
async function  closeConnection(){
  await client.close();
}

//exporting all functions

module.exports.connect = connectMongoDatabase;
module.exports.closeConnection = closeConnection;
module.exports.upsertCountryData = upsertCountryData;
module.exports.searchCountryWiseData = searchCountryWiseData;
