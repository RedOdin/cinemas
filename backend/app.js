const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const userController = require("./controllers/userController.js");
const cinemaController = require("./controllers/cinemaController.js");

const unlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'cinemas',
    insecureAuth : true
})

db.connect((err) => {
    if(err) {
        throw (err);
    }
    console.log('Database was connected');
})

app.post('/registration', userController.registration);
app.post('/login', userController.login);
app.get('/account', userController.account);
app.get('/cinemas/:id', cinemaController.cinema);
app.get('/cinemas', cinemaController.cinemas);
app.post('/create-cinema', cinemaController.createCinema);
app.post('/add-cinema', cinemaController.addCinema);
app.get('/my-cinemas', cinemaController.myCinemas);
app.post('/delete-my-cinema', cinemaController.deleteMyCinema);
app.get('/seats-reserved/:id', cinemaController.cinemasReserved);
app.post('/seat-reservation', cinemaController.seatReservation);

exports.db = db;
exports.jwt = jwt;

app.listen(3000, () => {
    console.log('Server start');
});
