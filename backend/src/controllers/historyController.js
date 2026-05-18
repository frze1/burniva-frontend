const {
 Prediction
} =
require("../models");


// GET HISTORY
const getHistory =
async(req,res)=>{

 try{

   const history =
   await Prediction
   .findAll({

     order:[
       [
         "createdAt",
         "DESC"
       ]
     ]

   });

   res.status(200)
   .json(history);

 }

 catch(error){

   res.status(500)
   .json({

     message:
     "Server error",

     error:
     error.message

   });

 }

};

module.exports = {
 getHistory
};