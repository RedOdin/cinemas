const app = require('../app');

exports.registration = (req, res) => {

    const newValues = `email = "${req.body.email}", password = "${
        req.body.password}"`;

    app.db.query(`INSERT INTO users SET ${newValues};`, (err) => {
        if (err) {
            console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ msg: 'Such user already exists!'});
            }
        }
        else {
            res.status(200).json({msg: ''});
        }
    });
};

exports.login = (req, res) => {

    if(!req.body) return res.sendStatus(400);

    app.db.query(`SELECT id, password FROM users WHERE email="${req.body.email}";`, (err, result) => {

        if (result.length === 0) {
            res.status(400).json({ msg: "The user hasn't been signed up in the system!"})

            return;
        }

        if (req.body.password === result[0].password) {
            const token = app.jwt.sign({
                    id: result[0].id,
                    email: req.body.email,
                    password: result[0].password,
                }, 'Hahaha', { expiresIn: 3600000 }
            );

            res.cookie('USER', token, { httpOnly: false, maxAge: 3600000 });
            res.status(200).json({ msg: ''});
        } else {
            res.status(400).json({ msg: "Incorrect password!"})
        }

    });
};

exports.account = (req, res) => {

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
                    res.status(200).json(data[0]);
                }
            });
        }
    });
};
