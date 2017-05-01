var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('custumerapp', ['users']);

const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

//global vars
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
});

//express-validator midleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {param: formParam, msg: msg, value: value};
    }
}));

app.get('/', (req, res) => {
    // find everything
    db
        .users
        .find(function (err, docs) {

            res.render('index', {
                title: 'Custumers',
                users: docs
            });
        });

});

app.post('/users/add', (req, res) => {
    req
        .checkBody('first_name', 'First Name Is Require.')
        .notEmpty();
    req
        .checkBody('last_name', 'Last Name Is Require.')
        .notEmpty();
    req
        .checkBody('email', 'Email Is Require.')
        .notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title: 'Custumers',
            users: users,
            errors: errors
        });
    } else {
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        db
            .users
            .insert(newUser, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/');
            });
    }
});

app.listen(3000, () => {
    console.log('Server working Now!');
});
