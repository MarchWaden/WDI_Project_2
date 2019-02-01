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
const requireLogin = require('./middleware/requireLogin')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});
store.on('connected', function() {
  store.client; // The underlying MongoClient object from the MongoDB driver
  console.log("THE STORE IS CONNECTED")
});

store.on('error', function(error) {
  console.log(error)
});


app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));
 
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('short'));
app.use(express.static('static'));

app.use((req, res, next)=>{
  if(!req.session){
    req.session = {};
  }
  if(typeof(req.session.user) == 'undefined'){
    req.session.user = {};
  }
  res.locals.user = req.session.user || {};
  if(req.session.message){
    res.locals.message = req.session.message;
    delete req.session.message;
    }
  next();
})

require('./db/db');

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
