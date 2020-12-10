// This was set up to call be able to test the http endpoint

// Call the exported function from server.js
const app = require ('./server')

// Server instance and respective callback function
const port = 5000;
const server = app.listen(port, () => {
    const ServerStart = new Date();
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
});