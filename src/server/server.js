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

module.exports = app;

// API Access Variables
// Geonames API
const geoNamesRoot = 'http://api.geonames.org/searchJSON?q='; // http://api.geonames.org/searchJSON?q= q=london&... Phrase cities require +
const geoNamesRowsFuzzyAndUsername = `&maxRows=1&fuzzy=0.6&username=${process.env.GEONAMES_USERNAME}`; //&fuzzy=0.6

// Weatherbit API
const weatherbitRootForecast = 'https://api.weatherbit.io/v2.0/forecast/daily?'; // Add &lat= & &lon=
const weatherApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
const weatherParams = '&lang=en&units=I'; // Units in Fahrenheit

// Rest Countries API
const restCountriesRoot = 'https://restcountries.eu/rest/v2/alpha/'; //Add partial country name

// Pixabay API
const pixabayRoot = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=`; //Add city name with spaces as '+' 
const pixabayParams = '&image_type=photo&order=popular';

// Travel Advisory (COVID-19) API
const travelAdviceRoot = 'https://www.travel-advisory.info/api?countrycode='; // Add two digit ISO country code

//Sample get request taken from https://zellwk.com/blog/endpoint-testing/
app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})

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
      duration: newData.Duration,
      daysToTrip: newData.DaysToGo
    }
    
    planData = newEntry;

    res.send('ok');
})


app.get('/getGeonames', (req, res) => {
  console.log('GET geonamesData')
  const url = `${geoNamesRoot}${addPlus(planData.location)}${geoNamesRowsFuzzyAndUsername}`;
  console.log(url);
    fetch(url)
      .then(res => res.json())
        .then(response =>{
          try {
            console.log('Data From GeoNames')
            console.log(response);
            planData['long'] = response.geonames[0].lng;
            planData['lat'] = response.geonames[0].lat;
            planData['name'] =response.geonames[0].name; //toponymName
            planData['adminName'] = response.geonames[0].adminName1;
            planData['countryName'] = response.geonames[0].countryName;
            planData['code'] = response.geonames[0].countryCode;
            res.send(true);
          } catch (e) {
            console.log("Error: ", e);
          }
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
          let forecastDay = planData.daysToTrip;
          const data = response.data[forecastDay]
          console.log(data)

          planData.maxTemp = data.max_temp;
          planData.minTemp = data.min_temp;
          planData.humidity = data.rh;
          planData.precipProb = data.pop; // Probably of Precipitation (%)
          planData.weatherDesc = data.weather.description
          planData.weatherIcon = data.weather.icon

          res.send(true)
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

          res.send(true);
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
          planData.advise = travelAdvisoryMessage;

          res.send(true);
    })
    .catch(error => {
      res.send(JSON.stringify({error: "An error has occured"}));
    })
})

app.get('/getCityImage', (req, res) => {
  console.log('GET Image')
  const url = `${pixabayRoot}${addPlus(planData.name)}+${addPlus(planData.countryName)}${pixabayParams}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          const cityArray = [];
          const result1 = response.hits[0].webformatURL;
          const result2 = response.hits[1].webformatURL;
          const result3 = response.hits[2].webformatURL;

          cityArray.push(result1);
          cityArray.push(result2);
          cityArray.push(result3);
          planData.cityArray = cityArray
          res.send(true);
        })
        .catch(error => {
          res.send(JSON.stringify({error: "An error has occured"}));
        })
})

app.get('/getCountryImage', (req, res) => {
  console.log('GET Image')
  const url = `${pixabayRoot}${addPlus(planData.countryName)}${pixabayParams}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          const countryArray = [];
          const result1 = response.hits[0].webformatURL;
          const result2 = response.hits[1].webformatURL;
          const result3 = response.hits[2].webformatURL;
          countryArray.push(result1);
          countryArray.push(result2);
          countryArray.push(result3);
          planData.countryArray = countryArray
          res.send(true);
        })
        .catch(error => {
          res.send(JSON.stringify({error: "An error has occured"}));
        })
})

app.get('/getPlan', (req, res) => {
    console.log(planData);
    res.send(planData);
})

// Helper function to convert all place names with spaces to include "+" between them
const addPlus = (stringWithSpace) => {
  let regex = new RegExp(' ', 'g')
  let stringWithPlus = stringWithSpace.replace(regex, '+');
  return stringWithPlus;
}