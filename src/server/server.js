// Server-Side Modules
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const fetch = require('node-fetch');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

// Server instance and respective callback function
const port = 5000;
const server = app.listen(port, () => {
    const ServerStart = new Date();
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
});

// API Access Variables
// Geonames API
const geoNamesRoot = 'http://api.geonames.org/searchJSON?q='; // http://api.geonames.org/searchJSON?q= q=london&... Phrase cities require +
const geoNamesRowsFuzzyAndUsername = `&maxRows=1&fuzzy=0.6&username=${process.env.GEONAMES_USERNAME}`; //&fuzzy=0.6

// Weatherbit API
const weatherbitRootForecast = 'https://api.weatherbit.io/v2.0/forecast/daily?'; // Add &lat= & &lon=
const weatherApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
const weatherParams = '&lang=en&units=I&days=1'; // Units in Fahrenheit

// Rest Countries API
const restCountriesRoot = 'https://restcountries.eu/rest/v2/alpha/'; //Add partial country name

// Pixabay API
const pixabayRoot = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=`; //Add city name with spaces as '+' 
const pixabayParams = '&image_type=photo&order=popular';

// Corona-API API
const travelAdviceRoot = 'https://www.travel-advisory.info/api?countrycode='; // Add two digit ISO country code

// Data Storage Object
let planData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/createTrip', (req, res) => {
    let newData = req.body;
    let newEntry = {
      location: newData.Location,
      startDate: newData.Start,
      endDate: newData.End,
      duration: newData.Duration
    }
    
    planData = newEntry;

    res.send('ok');
})


app.get('/getGeonames', (req, res) => {
  console.log('GET geonamesData')
  const url = `${geoNamesRoot}${planData.location}${geoNamesRowsFuzzyAndUsername}`;
  console.log(url);
    fetch(url)
      .then(res => res.json())
        .then(response =>{
          console.log('Data From GeoNames[0]')
          console.log(response);
          planData['long'] = response.geonames[0].lng;
          planData['lat'] = response.geonames[0].lat;
          planData['name'] =response.geonames[0].toponymName;
          planData['adminName'] = response.geonames[0].adminName1;
          planData['countryName'] = response.geonames[0].countryName;
          planData['code'] = response.geonames[0].countryCode;
          console.log(planData);
          res.send(planData);
    })
    .catch(error => {
      res.send(JSON.stringify({error: error}));
    })
})

app.get('/getWeather', (req, res) => {
  console.log('GET weather');
  const url = `${weatherbitRootForecast}lat=${planData.lat}&lon=${planData.long}${weatherApiKey}${weatherParams}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          // console.log(response)
          const data = response.data[0]
          console.log(data)

          planData.maxTemp = data.max_temp;
          planData.minTemp = data.min_temp;
          planData.humidity = data.rh;
          planData.precipProb = data.pop; // Probably of Precipitation (%)
          planData.weatherDesc = data.weather.description
          planData.weatherIcon = data.weather.icon

          res.send({MAX_temperature : planData.maxTemp, MIN_temperature : planData.minTemp, relativeHumidity: planData.humidity,  precipitation: planData.precipProb, 
            weather : planData.weatherDesc, weatherIcon: data.weather.icon});
    })
    .catch(error => {
      res.send(JSON.stringify({error: "An error occured"}));
    })
})

app.get('/getCountries', (req, res) => {
  console.log('GET Countries')
  const url = `${restCountriesRoot}${planData.code}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          console.log(response)
          planData['capital'] = response.capital;
          planData['demonym'] = response.demonym;
          planData['currencyInfo'] = {code: response.currencies[0].code, 
            name: response.currencies[0].name, 
            symbol: response.currencies[0].symbol}
          planData['flag'] = response.flag
          
          if(response.languages.length > 1){
            langArray = [];
            for (let lang of response.languages) {
              langArray.push(lang.name)
            }
            planData['languages'] = langArray
          }else {
            planData['languages'] = response.languages[0].name
          }

          console.log(planData);
          res.send(planData);
    })
    .catch(error => {
      res.send(JSON.stringify({error: "An error has occured"}));
    })
})

app.get('/getImage', (req, res) => {
  console.log('GET Image')
  const url = `${pixabayRoot}${planData.name}+${planData.adminName}+${planData.countryName}${pixabayParams}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{

          const result1 = response.hits[0].webformatURL;
          const result2 = response.hits[1].webformatURL;
          const result3 = response.hits[2].webformatURL;
          console.log(`Image result: ${result1}\n${result2}\n${result3}`)
          planData.imgSource = result1;
          res.send({source1 : result1});

    })
    .catch(error => {
      res.send(JSON.stringify({error: "An error has occured"}));
    })
})

app.get('/getTravelAdvice', (req, res) => {
  console.log('GET Travel Advice Info')
  const url = `${travelAdviceRoot}${planData.code}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          let travelAdvisoryMessage = response.data[planData.code].advisory.message // Was not able to call API without this
          console.log(travelAdvisoryMessage);
          // planData['advisoryMessage'] = response.data.planData['code'].advisory.message;
          res.send({advisoryMessage: planData.advisoryMessage});

    })
    .catch(error => {
      res.send(JSON.stringify({error: "An error has occured"}));
    })
})

app.get('/getPlan', (req, res) => {
    res.send(planData);
})
