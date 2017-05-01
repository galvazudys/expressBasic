var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var expressValidator = require('express-validator');

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

const users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com'
    }, {
        id: 2,
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bobsmith@gmail.com'
    }, {
        id: 3,
        first_name: 'Jill',
        last_name: 'Jackson',
        email: 'jilljackson@gmail.com'
    }
]

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Custumers',
        users: users
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
        console.log('------------------------------------');
        console.log('Sucsess');
        console.log('------------------------------------');
    }
});

app.listen(3000, () => {
    console.log('Server working Now!');
});
