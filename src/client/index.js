import {handleSubmit} from './js/formHandler';
import {dateString} from './js/dateString';

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