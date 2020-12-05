import {handleSubmit} from './js/formHandler';
import {dateString} from './js/dateString';
import {printButton} from './js/formHandler';
import {deleteButton} from './js/formHandler';

// import weather icons
import './weather_icons/a01d.png'
import './weather_icons/a01n.png'
import './weather_icons/a02d.png'
import './weather_icons/a02n.png'
import './weather_icons/a03d.png'
import './weather_icons/a03n.png'
import './weather_icons/a04d.png'
import './weather_icons/a04n.png'
import './weather_icons/a05d.png'
import './weather_icons/a05n.png'
import './weather_icons/a06d.png'
import './weather_icons/a06n.png'
import './weather_icons/c01d.png'
import './weather_icons/c01n.png'
import './weather_icons/c02d.png'
import './weather_icons/c02n.png'
import './weather_icons/c03d.png'
import './weather_icons/c03n.png'
import './weather_icons/c04d.png'
import './weather_icons/c04n.png'
import './weather_icons/d01d.png'
import './weather_icons/d01n.png'
import './weather_icons/d02d.png'
import './weather_icons/d02n.png'
import './weather_icons/d03d.png'
import './weather_icons/d03n.png'
import './weather_icons/f01d.png'
import './weather_icons/f01n.png'
import './weather_icons/r01d.png'
import './weather_icons/r01n.png'
import './weather_icons/r02d.png'
import './weather_icons/r02n.png'
import './weather_icons/r03d.png'
import './weather_icons/r03n.png'
import './weather_icons/r04d.png'
import './weather_icons/r04n.png'
import './weather_icons/r05d.png'
import './weather_icons/r05n.png'
import './weather_icons/r06d.png'
import './weather_icons/r06n.png'
import './weather_icons/s01d.png'
import './weather_icons/s01n.png'
import './weather_icons/s02d.png'
import './weather_icons/s02n.png'
import './weather_icons/s03d.png'
import './weather_icons/s03n.png'
import './weather_icons/s04d.png'
import './weather_icons/s04n.png'
import './weather_icons/s05d.png'
import './weather_icons/s05n.png'
import './weather_icons/s06d.png'
import './weather_icons/s06n.png'
import './weather_icons/t01d.png'
import './weather_icons/t01n.png'
import './weather_icons/t02d.png'
import './weather_icons/t02n.png'
import './weather_icons/t03d.png'
import './weather_icons/t03n.png'
import './weather_icons/t04d.png'
import './weather_icons/t04n.png'
import './weather_icons/t05d.png'
import './weather_icons/t05n.png'
import './weather_icons/u00d.png'
import './weather_icons/u00n.png'

// import API-Logos
import './api_logos/geonames.png'
import './api_logos/pixabay.png'
import './api_logos/RESTCountries.png'
import './api_logos/travel-advisory.png'
import './api_logos/udacity.png'
import './api_logos/weatherbit.png'

// import media
import './media/background.jpg'
import './media/facebook.png'
import './media/instagram.png'
import './media/Linkedin.png'
import './media/snoopy_peanuts.png'
import './media/twitter.png'

// import sass files
import './styles/footer.scss'
import './styles/header.scss'
import './styles/main.scss'
import './styles/resets.scss'
import './styles/section.scss'
import './styles/body.scss'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('print').addEventListener('click', printButton);
    document.getElementById('delete').addEventListener('click', deleteButton);
});

export {
    handleSubmit,
    dateString,
    printButton,
    deleteButton
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
    // console.log(d);

    let maxDay = d.getDate();
    let maxMonth = d.getMonth() + 1;
    let maxYear = d.getFullYear();
    // console.log(d.getYear());
    // console.log(maxYear);

    let minDate = dateString(minDay, minMonth, minYear);
    let maxDate = dateString(maxDay, maxMonth, maxYear);
    // console.log(minDate, maxDate);

    dateDeparture.setAttribute('min', minDate);
    dateDeparture.setAttribute('max', maxDate);
    dateReturn.setAttribute('min', minDate);

})();