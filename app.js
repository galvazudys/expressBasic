var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');

const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

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
    console.log('------------------------------------');
    console.log(req.body.first_name);
    console.log('------------------------------------');
});

app.listen(3000, () => {
    console.log('Server working Now!');
});
