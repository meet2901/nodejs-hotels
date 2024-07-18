
//all require modeules
const express = require('express');
const app = express();
const db = require('./db');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('./auth');

//converting body data in to Json file
app.use(bodyParser.json());

//localhost:3000 node server running on this port
const PORT = 3500;

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[ ${new Date().toLocaleString()} ] request made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);

//authuntication function
app.use(passport.initialize());
const LocalMidleware=passport.authenticate('local',{session:false});
app.get('/',LocalMidleware ,(req, res) => {
    res.send('Welcome to Nayana Ben Hotels');
});


// Corrected directory path for routers
const personRouter = require('./routers/personRouter');
app.use('/person', LocalMidleware,personRouter);

const menuRouter = require('./routers/menuRouter');
app.use('/menu', LocalMidleware,menuRouter);



//server listing 
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
//End of the server here