const {
 DailyInput,
 Prediction,
 Todo
} =
require("../models");

const { Op } =
require("sequelize");


// GET DASHBOARD
const getDashboard =
async(req,res)=>{

 try{

   const userId =
   req.user.id;

   // INPUT TERBARU
   const latestInput =
   await DailyInput
   .findOne({

     where:{
       user_id:
       userId
     },

     order:[
       [
         "createdAt",
         "DESC"
       ]
     ]

   });

   // PREDIKSI TERBARU
   const latestPrediction =
   await Prediction
   .findOne({

     order:[
       [
         "createdAt",
         "DESC"
       ]
     ]

   });

   // HISTORY 7 HARI
   const sevenDaysAgo =
   new Date();

   sevenDaysAgo
   .setDate(
     sevenDaysAgo
     .getDate() - 7
   );

   const stressTrend =
   await DailyInput
   .findAll({

     where:{
       user_id:userId,

       createdAt:{
         [Op.gte]:
         sevenDaysAgo
       }
     },

     attributes:[
       "stress_level",
       "createdAt"
     ],

     order:[
       [
         "createdAt",
         "ASC"
       ]
     ]

   });

   // BURNOUT TREND
   const burnoutTrend =
   await Prediction
   .findAll({

     attributes:[
       "burnout_score",
       "createdAt"
     ],

     order:[
       [
         "createdAt",
         "ASC"
       ]
     ],

     limit:7

   });

   // TODO PROGRESS
   const totalTodos =
   await Todo.count({

     where:{
       user_id:userId
     }

   });

   const completedTodos =
   await Todo.count({

     where:{
       user_id:userId,
       is_completed:true
     }

   });

   res.status(200)
   .json({

     latest_input:
     latestInput,

     latest_prediction:
     latestPrediction,

     stress_trend:
     stressTrend,

     burnout_trend:
     burnoutTrend,

     todo_progress:{

       total:
       totalTodos,

       completed:
       completedTodos

     }

   });

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
 getDashboard
};