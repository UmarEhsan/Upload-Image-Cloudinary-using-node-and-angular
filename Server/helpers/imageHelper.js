var async = require("async");
var cloudinary = require('cloudinary')
var cloudinarySecret = require('../config/cloudinary');
var TinyURL = require('tinyurl');
cloudinary.config(cloudinarySecret);
var imageHelper = {
  uploadImage : uploadImage
}

function uploadImage(imagePath, cb){
    async.waterfall([
    function(callback){
     cloudinary.uploader.upload(imagePath , function(result) { 
     var secure_url = result.secure_url;
     callback(null,secure_url);
    })
  },
  function(secure_url, callback){
 TinyURL.shorten(secure_url, function(res) {
 callback(null , res);

})}
], function (err, result) {

   cb(result);
     

})
};

module.exports = imageHelper;
 
 