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
                    app.db.query(`SELECT cinemas_for_users.id, title, description, image FROM cinemas.cinemas JOIN cinemas.cinemas_for_users ON cinemas_for_users.id_cinema = cinemas.id WHERE cinemas_for_users.id_user = "${data[0].id}";`, (err, data) => {
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
            app.db.query(`DELETE FROM cinemas_for_users WHERE id="${req.params.id}"`, (err, data) => {
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

