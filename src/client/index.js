import {handleSubmit} from './js/formHandler';
import {dateString} from './js/dateString';

// import weather icons
import './weather-icons/a01d.png'
import './weather-icons/a01n.png'
import './weather-icons/a02d.png'
import './weather-icons/a02n.png'
import './weather-icons/a03d.png'
import './weather-icons/a03n.png'
import './weather-icons/a04d.png'
import './weather-icons/a04n.png'
import './weather-icons/a05d.png'
import './weather-icons/a05n.png'
import './weather-icons/a06d.png'
import './weather-icons/a06n.png'
import './weather-icons/c01d.png'
import './weather-icons/c01n.png'
import './weather-icons/c02d.png'
import './weather-icons/c02n.png'
import './weather-icons/c03d.png'
import './weather-icons/c03n.png'
import './weather-icons/c04d.png'
import './weather-icons/c04n.png'
import './weather-icons/d01d.png'
import './weather-icons/d01n.png'
import './weather-icons/d02d.png'
import './weather-icons/d02n.png'
import './weather-icons/d03d.png'
import './weather-icons/d03n.png'
import './weather-icons/f01d.png'
import './weather-icons/f01n.png'
import './weather-icons/r01d.png'
import './weather-icons/r01n.png'
import './weather-icons/r02d.png'
import './weather-icons/r02n.png'
import './weather-icons/r03d.png'
import './weather-icons/r03n.png'
import './weather-icons/r04d.png'
import './weather-icons/r04n.png'
import './weather-icons/r05d.png'
import './weather-icons/r05n.png'
import './weather-icons/r06d.png'
import './weather-icons/r06n.png'
import './weather-icons/s01d.png'
import './weather-icons/s01n.png'
import './weather-icons/s02d.png'
import './weather-icons/s02n.png'
import './weather-icons/s03d.png'
import './weather-icons/s03n.png'
import './weather-icons/s04d.png'
import './weather-icons/s04n.png'
import './weather-icons/s05d.png'
import './weather-icons/s05n.png'
import './weather-icons/s06d.png'
import './weather-icons/s06n.png'
import './weather-icons/t01d.png'
import './weather-icons/t01n.png'
import './weather-icons/t02d.png'
import './weather-icons/t02n.png'
import './weather-icons/t03d.png'
import './weather-icons/t03n.png'
import './weather-icons/t04d.png'
import './weather-icons/t04n.png'
import './weather-icons/t05d.png'
import './weather-icons/t05n.png'
import './weather-icons/u00d.png'
import './weather-icons/u00n.png'

export {
    handleSubmit,
    dateString
}

// IIFE function used to restrict the departure dates a user can select starting 
// "today," or the day they use this app, to 15 days from today. This is to use
// work around the weatherbit forecast limit

(function () {
    const d = new Date();
    const dateDeparture = document.getElementById('date-departure');
    const dateReturn = document.getElementById('date-return');

    let minDay = d.getDate();
    let minMonth = d.getMonth() + 1; //Add 1 because method is zero based
    let minYear = d.getFullYear();

    d.setDate(d.getDate() + 15);
    console.log(d);

    let maxDay = d.getDate();
    let maxMonth = d.getMonth() + 1;
    let maxYear = d.getFullYear();
    console.log(d.getYear());
    console.log(maxYear);

    let minDate = dateString(minDay, minMonth, minYear);
    let maxDate = dateString(maxDay, maxMonth, maxYear);
    console.log(minDate, maxDate);

    dateDeparture.setAttribute('min', minDate);
    dateDeparture.setAttribute('max', maxDate);
    dateReturn.setAttribute('min', minDate);

})();