var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();


var jsonParser = bodyParser.json({limit: '50mb'});
// var encodedParser = bodyParser.urlencoded({extended:false});

var current_api = "/V1/";

var Doctors = require('../controllers/addDoctors');
router.post(current_api + 'addDoctors',Doctors.save );

function routes(){
    return router;
}
module.exports = routes;