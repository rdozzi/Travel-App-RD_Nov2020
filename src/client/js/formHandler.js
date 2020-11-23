const resultID = document.getElementById('result-data');

async function handleSubmit(event) {
    event.preventDefault();
    console.log("Begin Submission");
    // check what text was put into the form field
    let location = document.getElementById('destination').value;
    let start = document.getElementById('date-Departure').value;
    let end = document.getElementById('date-Return').value;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const TravelTime = endDate.getTime() - startDate.getTime();
    const daysInTravel = TravelTime / (1000 * 60 * 60 *24);

    if(daysInTravel > 0)
    {
      await postTrip('http://localhost:5000/createTrip', { 
        Location: location, 
        Start : startDate, 
        End: endDate, 
        Duration: daysInTravel 
      });

      UpdateDate(startDate, endDate, daysInTravel);

      const geonamesData = await getGeo(`http://localhost:5000/getGeonames`);
      console.log(geonamesData);
      UpdateGeonamesResults(geonamesData);

      const weatherData = await getWeather(`http://localhost:5000/getWeather`);  
      UpdateWeatherResult(weatherData);

      const countryData = await getCountry(`http://localhost:5000/getCountries`);
      UpdateCountryResult(countryData);

      const imgData = await getImage(`http://localhost:5000/getImage`);
      UpdateImageResult(imgData);

      const travelAdviceData = await getTravelAdvice(`http://localhost:5000/getTravelAdvice`)

  }else{
    ResultError('Please Enter a valid duration <br/> Must start today or in the future and end moving forward');
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

const getGeo = async(url) => {
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
      });
        try{
          const data = await res.json();
          return data;
  
        }catch{
          ResultError(`GEO: ${res.statusText}`);
        }
}

const getWeather = async (url) => {
  const res = await fetch(url ,{
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json:charset=utf-8'
      }
  });
  try{
    const data = await res.json();
    console.log(`weather response: ${data}`)
    return data;

  }catch{
    ResultError(`WEATHER: ${res.statusText}`);
  }
}

const getCountry = async (url) =>{
  const res = await fetch(url , {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    try{
      const data = await res.json();
      console.log(`Country Data: ${data}`);
      return data;
    }catch{
      ResultError(`Country: ${res.statusText}`);
    }
}

const getImage = async (url) =>{
  const res = await fetch(url , {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    try{
      const data = await res.json();
      console.log(`Image Data: ${data}`);
      return data;
    }catch{
      ResultError(`IMAGE: ${res.statusText}`);
    }
}

const getTravelAdvice = async (url) =>{
  const res = await fetch(url , {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    try{
      const data = await res.json();
      console.log(`Travel Data: ${data}`);
      return data;
    }catch{
      ResultError(`Country: ${res.statusText}`);
    }
}

function ResultError(msg){
  if(msg !== 'OK')
  {
    const el_error = document.createElement('p');

    el_error.classList.add('result-error');
    el_error.innerHTML = msg;
    resultID.append(el_error);
  }
}

function UpdateDate(begin, end, duration){
  let resultFragment = document.createDocumentFragment();

  let result_Header = document.createElement('h2');
  let result_Date = document.createElement('p');

  result_Header.classList.add('result-header');
  result_Date.classList.add('result-date');

  const dateHTML = `Start: ${begin} <br/> End: ${end} <br/> Travel time: ${duration}`;
  result_Date.innerHTML = dateHTML;

  resultFragment.append(result_Header);
  resultFragment.lastChild.append(result_Date);

  resultID.append(resultFragment);
}

function UpdateGeonamesResults(geonamesData){
  let resultFragment = document.createDocumentFragment();

  let result_Geonames = document.createElement('p');

  result_Geonames.classList.add('result-Geonames');

  let properName = toProper(geonamesData.location);

  const geonamesHTML = `${properName}, ${geonamesData.adminName} ${geonamesData.countryName}`;

  result_Geonames.innerHTML = geonamesHTML;

  resultFragment.append(result_Geonames);

  resultID.append(resultFragment);
}

function UpdateWeatherResult(weatherData){
  let resultFragment = document.createDocumentFragment();

  let result_Weather = document.createElement('p');

  result_Weather.classList.add('result-weather');

  const weatherHTML = `Temperature: (HIGH) ${weatherData.MAX_temperature}, 
  (LOW) ${weatherData.MIN_temperature} 
  <br/> ${weatherData.relativeHumidity}
  <br/> ${weatherData.precipitation}
  <br/> Description: ${weatherData.weather} 
  <br/> ${weatherData.weatherIcon}`;

  result_Weather.innerHTML = weatherHTML;

  resultFragment.append(result_Weather);

  resultID.append(resultFragment);
}

function UpdateCountryResult(countryData){
  let resultFragment = document.createDocumentFragment();

  let result_Country = document.createElement('p');

  result_Country.classList.add('result-country');
  
  const countryHTML = ``;

}

function UpdateImageResult(imageData){
  let resultFragment = document.createDocumentFragment();

  let result_Image = new Image();

  result_Image.classList.add('result-image');
  result_Image.src = imageData.source;


  resultFragment.append(result_Image);


  resultID.append(resultFragment);

}

function toProper(lowercaseWord){
  let wordString = lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
  return wordString;
}

export { handleSubmit }

