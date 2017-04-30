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

app.get('/', (req, res) => {
    res.render('index', {title: 'Custumers'});
});

app.listen(3000, () => {
    console.log('Server working Now!');
});