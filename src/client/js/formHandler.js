// Define variables for Document object collectors
// const resultID = document.getElementById('result-data');
const departureDate = document.getElementById('departure');
const returnDate = document.getElementById('return');
const daysOut = document.getElementById('days-out');
const tripDuration = document.getElementById('trip-duration');

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
  departureDate.innerHTML = splitDate(results.startDate);
  returnDate.innerHTML = splitDate(results.endDate);
  daysOut.innerHTML = results.daysToTrip;
  tripDuration.innerHTML = results.duration
}

// function updateDate(begin, end, duration){
//   let resultFragment = document.createDocumentFragment();

//   let result_Header = document.createElement('h2');
//   let result_Date = document.createElement('p');

//   result_Header.classList.add('result-header');
//   result_Date.classList.add('result-date');

//   const dateHTML = `Start: ${begin} <br/> End: ${end} <br/> Travel time: ${duration}`;
//   result_Date.innerHTML = dateHTML;

//   resultFragment.append(result_Header);
//   resultFragment.lastChild.append(result_Date);

//   resultID.append(resultFragment);
// }

// function UpdateGeonamesResults(geonamesData){
//   let resultFragment = document.createDocumentFragment();

//   let result_Geonames = document.createElement('p');

//   result_Geonames.classList.add('result-Geonames');

//   let properName = toProper(geonamesData.location);

//   const geonamesHTML = `${properName}, ${geonamesData.adminName} ${geonamesData.countryName}`;

//   result_Geonames.innerHTML = geonamesHTML;

//   resultFragment.append(result_Geonames);

//   resultID.append(resultFragment);
// }

// function UpdateWeatherResult(weatherData){
//   let resultFragment = document.createDocumentFragment();

//   let result_Weather = document.createElement('p');

//   result_Weather.classList.add('result-weather');

//   const weatherHTML = `Temperature: (HIGH) ${weatherData.MAX_temperature}, 
//   (LOW) ${weatherData.MIN_temperature} 
//   <br/> ${weatherData.relativeHumidity}
//   <br/> ${weatherData.precipitation}
//   <br/> Description: ${weatherData.weather} 
//   <br/> ${weatherData.weatherIcon}`;

//   result_Weather.innerHTML = weatherHTML;

//   resultFragment.append(result_Weather);

//   resultID.append(resultFragment);
// }

// function UpdateCountryResult(countryData){
//   let resultFragment = document.createDocumentFragment();

//   let result_Country = document.createElement('p');

//   result_Country.classList.add('result-country');
  
//   const countryHTML = ``;

// }

// function UpdateTravelAdvice(travelAdviceData){
//   let resultFragment = document.createDocumentFragment();

//   let result_Advice = document.createElement('p');

//   result_Advice.classList.add('result-Advice');

//   const adviceHTML = `${travelAdviceData.advisoryMessage}`

//   result_Advice.innerHTML = adviceHTML;

//   resultFragment.append(result_Advice);

//   resultID.append(resultFragment);
// }

// function UpdateImageResult(imageData){
//   let resultFragment = document.createDocumentFragment();

//   let result_Image = new Image();

//   result_Image.classList.add('result-image');
//   result_Image.src = imageData.source1;

//   resultFragment.append(result_Image);

//   resultID.append(resultFragment);

// }

// function toProper(lowercaseWord){
//   let wordString = lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
//   return wordString;
// }

// function to convert perform unit conversion on getTime() outputs
const timeUnitConversion = (timeInMilliseconds) => {
  let timeInDays = timeInMilliseconds/(1000 * 60 * 60 * 24);
  return Math.ceil(timeInDays);
}

const splitDate = (dateAPI) => {
  let newDate = dateAPI.split('T')
  return newDate[0];
}

export { handleSubmit, timeUnitConversion, splitDate }

