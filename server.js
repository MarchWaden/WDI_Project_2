const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan')
const usersController = require('./controllers/users');
const planetsController = require('./controllers/planets')
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));
require('./db/db');


app.use('/users', usersController);
app.use('/planets', planetsController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.listen(3001, () => {
  console.log('listening on port 3000');
})