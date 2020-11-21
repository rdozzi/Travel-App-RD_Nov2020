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
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
});

// API Access Variables
// Geonames API
const geoNamesRoot = 'http://api.geonames.org/searchJSON?q='; //q=london&...
const geoNamesRowsFuzzyAndUsername = `&maxRows=1&fuzzy=0.6&username=${process.env.GEONAMES_USERNAME}`;

// Weatherbit API
const weatherbitRootForecast = 'https://api.weatherbit.io/v2.0/forecast/daily?'; // Add &lat= & &lon=
const weatherbitRootHistory = 'https://api.weatherbit.io/v2.0/history/daily?'; // Add &lat= & &lon=
const weatherApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
const weatherParams = '&lang=en&units=I&days=7'; //Units in Fahrenheit

// Pixabay API
const pixabayRoot = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=`; //Add city name with spaces as '+' 
const pixabayImageType = 'image_type=photo';

// Rest Countries API
const restCountriesRoot = 'https://restcountries.eu/rest/v2/name/'; //Add partial country name

// Corona-API API
const covidRoot = 'https://corona-api.com/countries/'; // Add two digit ISO country code



