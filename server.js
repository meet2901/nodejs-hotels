const express = require('express');
const db = require('./db');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('welcome to nayana ben hotels ')
})

const personRouter = require('./routers/personRouter');

app.use('/person', personRouter);
const menuRouter = require('./routers/menuRouter');

app.use('/menu', menuRouter);

app.listen(3500, () => {
    console.log(`server is listing on port 3500`);
});
//