const express = require('express');
const Joi = require('joi');
const mongo = require('./mongoConnect.js');
const app = express();

require("./cronJob.js");

app.use(express.json());

app.get('/api/country/:country', async (req, res)=>{
    const schema = {
      country: Joi.string().min(2).required()
    };
    const getData = {
      country: req.params.country
    };
    const result = await Joi.validate(getData, schema);
    //if getting error in input
    if(result.error){
      res.status(400).send(result.error.details[0].message);
    }
    else{
      const searchData = await mongo.searchCountryWiseData(req.params.country);
      if(searchData){
        res.send(searchData);
      }
      else{
        res.status(404).send("Data not found");
      }
    }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));
