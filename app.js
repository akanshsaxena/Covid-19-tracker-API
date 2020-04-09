const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const cases = [
  { state:"Andhra Pradesh" , cases:266 , discharged:1 , deaths:3 }, { state:"Andaman and Nicobar Islands" , cases:10 , discharged:0 , deaths:0 },  { state:"Arunachal Pradesh" , cases:1 , discharged:0 , deaths:0 },
  { state:"Assam" , cases:26 , discharged:0 , deaths:0 }, { state:"Bihar" , cases:32 , discharged:0 , deaths:1 }, { state:"Chandigarh" , cases:18 , discharged:7 , deaths:0 },
  { state:"Chhattisgarh" , cases:10 , discharged:9 , deaths:0 }, { state:"Delhi" , cases:576 , discharged:21 , deaths:9 }, { state:"Goa" , cases:7 , discharged:0 , deaths:0 },
  { state:"Gujarat" , cases:165 , discharged:25 , deaths:13 }, { state:"Haryana" , cases:90 , discharged:25 , deaths:1 }, { state:"Himachal Pradesh" , cases:13 , discharged:2 , deaths:1 },
  { state:"Jammu and Kashmir" , cases:116 , discharged:4 , deaths:2 }, { state:"Jharkhand" , cases:4 , discharged:0 , deaths:0 }, { state:"Karnataka" , cases:175 , discharged:25 , deaths:4 },
  { state:"Kerala" , cases:357 , discharged:58 , deaths:2 }, { state:"Ladakh" , cases:14 , discharged:10 , deaths:0 }, { state:"Madhya Pradesh" , cases:229 , discharged:0 , deaths:13 },
  { state:"Maharashtra" , cases:868 , discharged:56 , deaths:48 }, { state:"Manipur" , cases:2 , discharged:0 , deaths:0 }, { state:"Mizoram" , cases:1 , discharged:0 , deaths:0 },
  { state:"Odisha" , cases:42 , discharged:2 , deaths:1 }, { state:"Puducherry" , cases:5 , discharged:1 , deaths:0 }, { state:"Punjab" , cases:91 , discharged:4 , deaths:7 },
  { state:"Rajasthan" , cases:288 , discharged:21 , deaths:3 }, { state:"Tamil Nadu" , cases:621 , discharged:8 , deaths:5 }, { state:"Telengana" , cases:364 , discharged:35 , deaths:7 },
  { state:"Tripura" , cases:1 , discharged:0 , deaths:0 }, { state:"Uttarakhand" , cases:31 , discharged:5 , deaths:0 }, { state:"Uttar Pradesh" , cases:305 , discharged:21 , deaths:3 },
  { state:"West Bengal" , cases:91 , discharged:13 , deaths:3 }
];

app.get('/api/:state', (req, res)=>{
  let search = req.params.state;
  console.log(search);
  //search= search.split(" ").join("").toLowerCase();
  //var stateArray = cases.state.split(" ").join("").toLowerCase();
  const result = cases.find(fun=>fun.state===search);
  res.send(result);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));
