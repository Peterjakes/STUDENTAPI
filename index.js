const express =require('express');
const routes = require('./routes/studentRoute');
const app = express();
require('dotenv').config();
require('./helpers/init_mongodb');
app.use(routes);

app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests on: http://localhost:4000')
}) ;