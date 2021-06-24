require('dotenv').config();
var express = require('express');
var router = express.Router();
var app = express();
var cors = require('cors');
var loginController = require('../controllers/authenticate-controller');
var registerController = require('../controllers/register-controller');
var chartController = require('../controllers/charts-controller');
var createChartController = require('../controllers/createChart-controller');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const withAuth = require('./middleware');
 
//initialize passport        
app.use(passport.initialize())
//alters the request object and change the user value (id session/client cookie)    
app.use(passport.session())  
//populate req.cookies
app.use(cookieParser());   
//use json   
app.use(bodyParser.json());   
//make the server accessible to any domain that requests a resource from your server via a browser    
app.use(cors);                    

// Login
router.post('/api/authenticate', loginController.authenticate); 

// Register 
router.post('/api/register', registerController.register);

// Reset password
router.post('/api/forgotpassword', loginController.forgotpassword);

// Update password
router.get('/api/reset/:resetPasswordToken', loginController.resetpassword);
router.put('/api/updatePassword', loginController.updatepassword);

// Home page 
router.get('/', function(req, res, next) {
  res.send("Welcome to FeralCharts");
});

// Table with all graphs in the Charts Menu
router.get('/api/charts', chartController.chartTable); 

// Chart Information (eye button) 
router.get('/api/charts/:chartId', chartController.chartInfo); 

// Chart Delete (remove button) 
router.delete('/api/charts', chartController.removeChart);

// Select table and columns according to the query 
router.post('/api/newChart', createChartController.createTable); 
router.get('/api/newChart', createChartController.createTable); 

// Save new chart
router.post('/api/charts', createChartController.createChart); 

// Middleware authentication
router.get('/api/dashboards', withAuth, function(req, res) {
  res.send('Hi, Im the backend!');
});

router.get('/api/logged', withAuth, function(req, res) {
  res.send('Oi, eu sou o backend!')
});

router.get('/checkToken', withAuth, function(req, res) {
  console.log("Successfully authenticate with token");
  res.status(200).send("Successfully authenticate with token");
});

module.exports = router;

 