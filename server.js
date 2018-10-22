const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const usersController = require('./controllers/usersControllers');
const planetsController = require('./controllers/planetsControllers');
const gameController = require('./controllers/gameControllers');

const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));
app.use(express.static('static'));

require('./db/db');


app.use('/users', usersController);
app.use('/planets', planetsController);
app.use('/planets', gameController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.listen(port, () => {
  console.log('listening on port 3000');
})
