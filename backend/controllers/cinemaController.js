const app = require('../app');

exports.createCinema = (req, res) => {

    console.log(req.body);

    app.db.query(`INSERT INTO cinemas SET title="${req.body.cinema.title}", description="${req.body.cinema.description}", image="${req.body.cinema.image}";`, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({});
        }
    });
};

exports.addCinema = (req, res) => {

    const userCookieJwt = req.cookies['USER'];

    app.jwt.verify(userCookieJwt, 'Hahaha', function(err, decoded) {
        if (err) {
            res.status(403).json(
                {errors: [{msg: 'FORBIDDEN_ADMIN_MSG'}]});
        } else {
            app.db.query(`SELECT id, email FROM users WHERE id=${decoded.id};`, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    app.db.query(`INSERT INTO cinemas_for_users  SET id_cinema="${req.body.id}", id_user="${data[0].id}";`, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).json({});
                        }
                    });
                }
            });
        }
    });
};

exports.myCinemas = (req, res) => {

    const userCookieJwt = req.cookies['USER'];

    app.jwt.verify(userCookieJwt, 'Hahaha', function(err, decoded) {
        if (err) {
            res.status(403).json(
                {errors: [{msg: 'FORBIDDEN_MSG'}]});
        } else {
            app.db.query(`SELECT id FROM users WHERE id=${decoded.id};`, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    app.db.query(`SELECT title, description, image, seat, id_cinema AS idCinema FROM cinemas.cinemas JOIN cinemas.cinema_reserved ON cinema_reserved.id_cinema = cinemas.id WHERE cinema_reserved.id_user = "${data[0].id}";`, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).json(data);
                        }
                    });
                }
            });
        }
    });
};

exports.deleteMyCinema = (req, res) => {
    
    const userCookieJwt = req.cookies['USER'];

    app.jwt.verify(userCookieJwt, 'Hahaha', function(err, decoded) {
        if (err) {
            res.status(403).json(
                {errors: [{msg: 'FORBIDDEN_MSG'}]});
        } else {
            app.db.query(`DELETE FROM cinema_reserved WHERE id_user="${decoded.id}" AND id_cinema="${req.body.cinema.idCinema}" AND seat="${req.body.cinema.seat}"`, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json({});
                }
            });
        }
    });
};

exports.cinemas = (req, res) => {

    app.db.query(`SELECT id, title, description, image FROM cinemas;`, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(data);
        }
    });
};

exports.cinema = (req, res) => {

    app.db.query(`SELECT id, title, description, image FROM cinemas WHERE id="${req.params.id}";`, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(data[0]);
        }
    });
};

exports.cinemasReserved = (req, res) => {
    const userCookieJwt = req.cookies['USER'];

    app.jwt.verify(userCookieJwt, 'Hahaha', function(err, decoded) {
        if (err) {
            res.status(403).json(
                {errors: [{msg: 'FORBIDDEN_MSG'}]});
        } else {
            app.db.query(`SELECT id, seat, id_user FROM cinema_reserved WHERE id_cinema="${req.params.id}";`, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(data.map((t) => {
                        return {seat: t.seat, id: t.id, isUser: t.id_user === decoded.id}
                    }));
                }
            });
        }
    });
};

exports.seatReservation = (req, res) => {

    const userCookieJwt = req.cookies['USER'];

    app.jwt.verify(userCookieJwt, 'Hahaha', function(err, decoded) {
        if (err) {
            res.status(403).json(
                {errors: [{msg: 'FORBIDDEN_MSG'}]});
        } else {
            app.db.query(`INSERT cinema_reserved(id_cinema, id_user, seat) VALUES (${req.body.id_cinema}, ${decoded.id}, ${req.body.seat})`, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(data);
                }
            });
        }
    });
};

