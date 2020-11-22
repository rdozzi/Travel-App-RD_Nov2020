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
const geoNamesRoot = 'http://api.geonames.org/searchJSON?q='; // http://api.geonames.org/searchJSON?q= q=london&...
const geoNamesRowsFuzzyAndUsername = `&maxRows=1&username=${process.env.GEONAMES_USERNAME}`; //&fuzzy=0.6

// Weatherbit API
const weatherbitRootForecast = 'https://api.weatherbit.io/v2.0/forecast/daily?'; // Add &lat= & &lon=
const weatherbitRootHistory = 'https://api.weatherbit.io/v2.0/history/daily?'; // Add &lat= & &lon=
const weatherApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
const weatherParams = '&lang=en&units=I&days=7'; //Units in Fahrenheit

// Pixabay API
const pixabayRoot = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=`; //Add city name with spaces as '+' 
const pixabayImageType = '&image_type=photo';

// Rest Countries API
const restCountriesRoot = 'https://restcountries.eu/rest/v2/name/'; //Add partial country name

// Corona-API API
const covidRoot = 'https://corona-api.com/countries/'; // Add two digit ISO country code

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
  
    console.log(planData);
    res.send('ok');
})

app.get('/getGeographics', (req, res) => {
  console.log('GET georaphics')
  const url = `${geoNamesRoot}${planData.location}${geoNamesRowsFuzzyAndUsername}`;
  console.log(url);
    fetch(url)
      .then(res => res.json())
        .then(response =>{
          console.log('Data From GeoNames[0]')
          console.log(response);
          planData['Long'] = response.geonames[0].lng;
          planData['Lat'] = response.geonames[0].lat;
          planData['code'] = response.geonames[0].countryCode;

          res.send(true);
    })
    .catch(error => {
      res.send(JSON.stringify({error: error}));
    })
})

app.get('/getWeather', (req, res) => {
  console.log('GET weather');
  const url = `${weatherbitRootForecast}lat=${planData.Lat}&lon=${planData.Long}${weatherApiKey}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{
          const data = response.data[planData.duration]
          console.log(data)

          planData.MaxTemp = data.max_temp;
          planData.MinTemp = data.min_temp;
          planData.WeatherDesc = data.weather.description

          res.send({MAX_temperature : planData.MaxTemp, MIN_temperature : planData.MinTemp, weather : planData.WeatherDesc});
    })
    .catch(error => {
      res.send(JSON.stringify({error: "An error occured"}));
    })
})

app.get('/getImage', (req, res) => {
  console.log('GET Image')
  const url = `${pixabayRoot}${planData.location}${pixabayImageType}`;
  console.log(url);
    fetch(url)
      .then(response => response.json())
        .then(response =>{

          const result = response.hits[0].webformatURL;
          console.log(`Image result: ${result}`)
          planData.imgSource = result;
          res.send({source : result});

    })
    .catch(error => {
      res.send(JSON.stringify({error: "An error has occured"}));
    })
})

app.get('/getPlan', (req, res) => {
    res.send(planData);
})
