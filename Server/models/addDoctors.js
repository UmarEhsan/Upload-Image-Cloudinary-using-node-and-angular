var mongoose = require('mongoose');
var creator = require("./creator");
require('../models/users');


var addDoctors = new mongoose.Schema({

  DoctorName :{
    type : String,
    trim : true
  },
  DocLicense :{
    type : String,
    unique: true
  },
  Address :{
    type : String,
    trim : true
     },
  CellNo :{
    type : String,
    trim : true,
    set: function(v){ return v.replace(/[^0-9]/g,''); }
  },
  gender: {
    type: String,
    enum : ['Male','Female'],
    default : 'Male'
  },
    image: {
       type : String
      },
    creator : creator,  
    deparmentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'departments',
    required : true,
    index : true
   }

}, {
  // autoIndex: false,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true }
});


module.exports = mongoose.model('addDoctors', addDoctors);


