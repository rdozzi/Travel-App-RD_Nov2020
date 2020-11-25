// Function to create a date string "yyyy-mm-dd"
const dateString = (day, month, year) => {

    day = day.toString();
    month = month.toString();
    year = year.toString();

    if(day.length === 1){
        day = `0${day}`;
    }
    if(month.length === 1){
        month = `0${month}`;
    }

    return `${year}-${month}-${day}`
}

export {
    dateString
}