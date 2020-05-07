const express = require('express');
const Joi = require('joi');
const mongoose = require('./mongoData.js');
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
      const countryName = req.params.country.replace(/\s/g,"").toLowerCase();
      const searchData = await mongoose.searchCountryWiseData(countryName);
      if(searchData==null){
        res.status(400).send("Data not found for provided country");
      }
      else{
        res.send(searchData);
      }
    }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));
