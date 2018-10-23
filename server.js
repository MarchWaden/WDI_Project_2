const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const usersController = require('./controllers/usersControllers');
const planetsController = require('./controllers/planetsControllers');
const gameController = require('./controllers/gameController');
const authController = require('./controllers/authController');
const bcrypt = require('bcryptjs');
const session = require('express-session')
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'sneakysneaky'
}));

const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));
app.use(express.static('static'));
app.use((req, res, next)=>{
  if(req.session){
    if(req.session.message){
      res.locals.message = req.session.message;
      delete req.session.message;
    }
  }
  next();
})

require('./db/db');


app.use((req, res, next) => {
    res.locals.user = req.session.user || {};
    next();
});

app.use('/users', usersController);
app.use('/planets', planetsController);
app.use('/game', gameController);
app.use('/auth', authController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.listen(port, () => {
  console.log('listening on port 3000');
})
