const express =require('express');
const routes = require('./routes/studentRoute');
const lecturerRoutes = require('./routes/lecturerRoute');
const studentRoute = require("./routes/studentRoute");
const authRoutes = require('./routes/authRoute');
const rateLimit = require('express-rate-limit');
const { AddStudent } = require('./controller/studentcontroller');
const createError = require('http-errors');
const helmet = require('helmet')
const cors = require ('cors');

const app = express();


app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));

//limit request from same ip
const limiter = rateLimit({
    max: 100,
    windowMs: 60* 60* 1000,
    message: "Too many requests from this IP , pls try again in an hour!"
});

app.use("/api", limiter);

require('dotenv').config();
require('./helpers/init_mongodb');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/Student',studentRoute);

// app.use(studentRoutes);

// app.use(lecturerRoutes);
// app.use(routes);




//handling 404 error
app.use(async(req,res,next)=>{
    //next(createError(404,"Not found"));
    next(createError.NotFound());
});

//Error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message: err.message,
        },
    });
});

app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests on: http://localhost:4000')
}) ;