# Travel App

## Introduction

This project is the final *capstone* project for Udacity's Front End Web Developer Nanodegree program. The project combines the learned knowledge from all of the lessons and projects to create a travel application that provides the user information based on their selected destination and time of travel.

## Description

The user is asked for the following:

* A destination city 
* Date of departure 
* Date of return

In return the user will receive:

* A summary of their inputs
* The city name, state of province of the city if applicable, and the respective country
* Specific information about the country such as the country's capital, demonym, official language(s), currency information including the name, code, and symbol, and the flag
* Weather conditions of the city, specifically the longitude/latitude region, on the selected *departure* day
* A Covid-19 travel advisory message based on current conditions per [www.travel-advisory.info](https://www.travel-advisory.info) &
* Images of the city or country if the location is ambiguous

## Prerequisites

The project uses **NodeJS** and specifically **Express** to handle the server and middleware for client/server interactions. If you don't have NodeJS installed, download it here at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

The app also requires access to three APIs from the listed web services listed below. 

* Geonames ([Link](http://www.geonames.org))
* Weatherbit ([Link](https://www.weatherbit.io))
* Pixabay ([Link](https://pixabay.com))

Proceed to each website and follow their instructions to obtain an API key.  

## Installation

Copy the URL to this git repository: [https://github.com/rdozzi/Travel-App-RD_Nov2020.git](https://github.com/rdozzi/Travel-App-RD_Nov2020.git) and clone it to your local device within your respective *command prompt*.

With **NodeJS** installed, the user can leverage the use of the *Node Package Manager* or "*npm*" commands to install the required packages and dependencies. Go the file with your cloned copy of the app and type:

```
npm install or npm i
```

The API keys provided to you by the three websites listed should go into a *.env* file to be stored as *environmental variables*. Attached for the user's use is a **.env_API_KEY_INFO_HERE** file that can be used for this purpose. Remove the "**_API_KEY_INFO_HERE**" so that only **.env** remains and add your API keys to the following environmental variables:

```
GEONAMES_USERNAME = 
WEATHERBIT_API_KEY =
PIXABAY_KEY =
```

## Running the Application

After performing the installation steps above, the following commands ("*scripts*") are available to the user:

```
npm run build-dev (This builds the application for development purposes)
npm run build-prod (This builds the application for production. The use will use this)
npm start (This starts the node server AFTER the production application is built)
npm test (This runs tests associated with the project)
```

After building the production code and running the server, the application is set to run on **port 5000**. You will see the message below in your command prompt:

```
Server Running
Running on localhost: 5000
```

Open a web browser and type in the following address:

```
http://localhost:5000/
```

Enter the **city**, **departure date**, and **return date** and then press the submit button. 

Voila! Information about your destination will appear.

After you are done reviewing your trip you can either print the trip by hitting "Print" or reset the planner by hitting "Delete."