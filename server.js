const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/');
const  passport = require('passport');

const app = express();
const router = express.Router();

// Connect Database
connectDB();

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);
const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(bodyParser.urlencoded({
	extended: true
  }));
app.use(bodyParser.json()) 
routes(router); 


app.use('/api', router)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
