// Define variables for Document object collectors
// const resultID = document.getElementById('result-data');
const departureDate = document.getElementById('departure');
const returnDate = document.getElementById('return');
const daysOut = document.getElementById('days-out');
const tripDuration = document.getElementById('trip-duration');

const cityResult = document.getElementById('city');
const provinceResult = document.getElementById('province');
const countryResult = document.getElementById('country');

const highTemp = document.getElementById('high-temp');
const lowTemp = document.getElementById('low-temp');
const humidity = document.getElementById('humidity');
const precipProb = document.getElementById('precipitation');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');

const countryCapital = document.getElementById('capital');
const demonym = document.getElementById('demonym');
const languages = document.getElementById('languages');
const currencyName = document.getElementById('curr-name');
const currencyCode = document.getElementById('curr-code');
const currencySymbol = document.getElementById('curr-symbol');
const flag = document.getElementById('flag-result');

const advisory = document.getElementById('advisory-result');
const advisoryMessage = document.getElementById('further-info');
const advisoryLink = document.getElementById('hyperlink');

const entryForm = document.getElementById('plan-create');
const resultInfo = document.getElementById('result-info');
const printButton = document.getElementById('print');
const deleteButton = document.getElementById('delete');

async function handleSubmit(event) {
    event.preventDefault();
    console.log("Begin Submission");
    // check what text was put into the form field
    let location = document.getElementById('destination').value;
    let start = document.getElementById('date-departure').value;
    let end = document.getElementById('date-return').value;

    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    const travelTime = endDate.getTime() - startDate.getTime();
    const daysInTravel = timeUnitConversion(travelTime);
    console.log(daysInTravel);

    const timeUntilTrip = startDate.getTime() - today;
    const daysUntilTrip = timeUnitConversion(timeUntilTrip);
    console.log(daysUntilTrip);

    if(daysInTravel > 0)
    {
      await postTrip('http://localhost:5000/createTrip', { 
        Location: location, 
        Start : startDate, 
        End: endDate, 
        Duration: daysInTravel,
        DaysToGo: daysUntilTrip
      });

      // updateDate(startDate, endDate, daysInTravel);

      await callServer(`http://localhost:5000/getGeonames`);
      // UpdateGeonamesResults(geonamesData);

      await callServer(`http://localhost:5000/getWeather`);  
      // UpdateWeatherResult(weatherData);

      await callServer(`http://localhost:5000/getCountries`);
      // UpdateCountryResult(countryData);

      await callServer(`http://localhost:5000/getTravelAdvice`)
      // UpdateTravelAdvice(travelAdviceData)

      await callServer(`http://localhost:5000/getImage`);
      // UpdateImageResult(imgData);

      const getPlanData = await callServer(`http://localhost:5000/getPlan`);
      console.log(getPlanData);
      updateUI(getPlanData)

  }else{
    alert('Please enter a valid trip duration!! Entries must start today or in the future and end at least one day after');
  }

}

async function postTrip(url, tripData){
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripData)
    });
}

const callServer = async(url) => {
  const asyncParams = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
  };

    const res = await fetch(url, asyncParams);
      try{
        const data = await res.json();
        return data;
      } 
      catch {
        console.log(`Error: ${res.statusText}`)
      }
}

// UI Functions
const updateUI = async (results) => {
  // Update Trip Date Info Section
  departureDate.innerHTML = splitDate(results.startDate);
  returnDate.innerHTML = splitDate(results.endDate);
  daysOut.innerHTML = results.daysToTrip;
  tripDuration.innerHTML = results.duration

  //Update City Info Section
  cityResult.innerHTML = results.name;
  if(results.name === results.adminName){
    provinceResult.innerHTML = 'N/A'
  } else {
    provinceResult.innerHTML = results.adminName;
  }
  countryResult.innerHTML = results.countryName;

  //Update Weather Info Section
  highTemp.innerHTML = results.maxTemp;
  lowTemp.innerHTML = results.minTemp;
  humidity.innerHTML = results.humidity;
  precipProb.innerHTML = results.precipProb;
  weatherDesc.innerHTML = results.weatherDesc;
  // weatherIcon.innerHTML = 

  //Update Country Info Section
  countryCapital.innerHTML = results.capital;
  demonym.innerHTML = results.demonym;
  languages.innerHTML = languageFormatter(results.languages);
  currencyName.innerHTML = results.currencyInfo.name;
  currencyCode.innerHTML = results.currencyInfo.code;
  currencySymbol.innerHTML = results.currencyInfo.symbol;
  // flag.src = results.flag;

  //Update Advisory Info Section
  advisory.innerHTML = results.advise;
  advisoryMessage.innerHTML = 'For further information click on the link here:'
  advisoryLink.href = 'https://www.travel-advisory.info/all-countries'
  advisoryLink.innerHTML = 'https://www.travel-advisory.info/all-countries'

}

// Print Button Function
printButton.addEventListener('click', (e) => {
  window.print();
  location.reload();
})

deleteButton.addEventListener('click', (e) => {
  entryForm.reset();
  // resultInfo.classList.add("invisible");
  location.reload();

})

const timeUnitConversion = (timeInMilliseconds) => {
  let timeInDays = timeInMilliseconds/(1000 * 60 * 60 * 24);
  return Math.ceil(timeInDays);
}

const splitDate = (dateAPI) => {
  let newDate = dateAPI.split('T')
  return newDate[0];
}

const languageFormatter = (languageArray) => {
  if(typeof(languageArray) === 'string'){
    return languageArray;
  } else {
    let langString = ''
    for (let lang of languageArray){
      langString = langString.concat(lang).concat(', ');
    }
    langString = langString.slice(0,langString.length - 2);
    return langString;
    }
}

export { handleSubmit, timeUnitConversion, splitDate, languageFormatter }

