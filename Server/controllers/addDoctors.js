
var doctors =  require('../models/addDoctors');
var imageHelper = require('../helpers/imageHelper');
var multiparty = require('multiparty');



var doctor = {
    save : save,
  }


function save(req,res){
  
   var form = new multiparty.Form();
     
   form.parse(req, function(err, fields, files){

     var doc_name      = fields.d_name && fields.d_name[0] || "";
     var doc_license   = fields.d_license && fields.d_license[0] || "";
     var doc_address   = fields.d_address && fields.d_address[0] || "";
     var doc_cellno    = fields.d_cellno && fields.d_cellno[0]  || "";
     var doc_gender    = fields.d_gender && fields.d_gender[0]  || "";  
     var doc_image     = files.d_image && files.d_image[0].path || "";
   

     imageHelper.uploadImage(doc_image, function(imageUrl){
      console.log("Here you get your image url")
       console.log(imageUrl)
         var doctorData = {
             DoctorName  : doc_name,
             DocLicense  : doc_license,
             Address     : doc_address,
             CellNo      : doc_cellno,
             gender      : doc_gender,
             image       : imageUrl,
             creator     : creator,
             deparmentId : doc_depart_id

         }
         var doctors_model = new doctors();
            for(var doctor in doctorData){
                doctors_model[doctor] = doctorData[doctor];
            }

            doctors.find({"DocLicense" : doctorData["DocLicense"] },function(err , _doctors){
                if(err){
                    res.send("err in finding doctor")
                    return
                }
                else if(_doctors.length === 0 ){
                    saveDoctor(doctors_model);
                }
                else if(_doctors.length > 0){
                    res.send("A doctor have that email already exist!");
                }



            })

     })

       function saveDoctor(doctors_model){
           async.waterfall([
               function(callback){
                   doctors_model.save(function (err,_doctor) {
                       if(err){
                           res.send(err);
                           return;
                       }
                       callback(null,_doctor);
                       // console.log(_doctor);
                       // console.log(doc_sitting_hospitals);

                       //

                       //
                       // saveDoctorHospitals(hospitalAndDoctors);
                       // ResponseHelper.sendStandardized(res,200,_doctor,"Doctor save successfully");
                       // return
                   })
               },function(_doctor,callback){
                   var hospitalAndDoctors = {
                       doctorId : "",
                       hospitalIds : []
                   };
                   hospitalAndDoctors["doctorId"] = _doctor._id;
                   for(var hospitals in doc_sitting_hospitals){
                       hospitalAndDoctors["hospitalIds"].push(doc_sitting_hospitals[hospitals]);
                   }
                   callback(null, hospitalAndDoctors, _doctor)
               },
               function(hospitalAndDoctors, _doctor, callback){

                      var hos_and_docData = {
                          hospitalIds : hospitalAndDoctors.hospitalIds,
                          doctorId    : hospitalAndDoctors.doctorId,
                          creator     : _doctor.creator
                      }

                      var docHospitals = new doctorHospitals();
                         for(var doc_hos in hos_and_docData){
                             docHospitals[doc_hos] = hos_and_docData[doc_hos];
                             if(doc_hos === "hospitalIds"){
                                 for(var i=0; i< hos_and_docData[doc_hos].length; i++){
                                     docHospitals[doc_hos].push(hos_and_docData[doc_hos][i]);
                                 }
                             }
                         }

                   docHospitals.save(function (err, _doctorHospitals) {
                             if(err){
                                 callback(err,null);
                             }
                             var doctorHospitals = merge(_doctor , _doctorHospitals)
                             callback(null, doctorHospitals);
                         })

               }
               ], function(err,doctorHospitals ){
               if(err){
                   res.send("err in saving doctorAndHospitals ")
                   return
               }
               ResponseHelper.sendStandardized(res,200,doctorHospitals,"Saved Successfully!");
           })

       }
    
    

});
//    var doctor = [];
//    var doctorData ={},doctors ={};
//    form.on('field', function(name, val){
//           doctor.push('"' +name+ '"'+ ':'+'"'+val+'"')
//          });
// //finally convert array to json obj
// form.on('close', function(){
//   var doctors = '{'+doctor.toString() +'}'
//  doctorData  = JSON.parse(doctors)
   
// })

//    form.parse(req, function(err, fields, files){
//        var file;
//        if(files.hasOwnProperty(images)){
//          file =files.images[0].path;
//        }
//        file = "";
     
//      async.waterfall([
//     function(callback){
//      cloudinary.uploader.upload(file , function(result) { 
//      var secure_url = result.secure_url;
//      callback(null,secure_url);
//   })
//   },
//   function(secure_url, callback){
//  TinyURL.shorten(secure_url, function(res) {
//  callback(null , res);

// })}
// ], function (err, result) {
//     doctorData.image = result;
    
//     for(var doc in doctorData){
//         doctors[doc] = doctorData[doc];
        
//     }
//      console.log(doctors);
//     // }
//     // doctorData["image"] = result;
//     // console.log(doctorData);

// });


  
    
    

    // if(!req.headers.authorization){
    //     ResponseHelper.sendStandardized(res,401,null,MessageHelper.authorization_error());
    //     return;
    // }
    // saveAndUpdateDoctor(req,res,"save",doctors)
}









module.exports = doctor;
