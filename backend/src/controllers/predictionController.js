const {
 DailyInput,
 Prediction
} =
require("../models");

const Todo = require("../models/Todo");

const generatePrediction =
require(
"../services/dummyAiService"
);


// CREATE PREDICTION
const analyzeBurnout =
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

   if(!latestInput){

     return res
     .status(404)
     .json({

       message:
       "Input harian belum tersedia"

     });

   }

   // DUMMY AI
   const result =
   generatePrediction(
     latestInput
   );

   // SAVE DB
   const prediction =
   await Prediction
   .create({

     daily_input_id:
     latestInput.id,

     risk_level:
     result.risk_level,

     burnout_score:
     result.burnout_score,

     mental_health_index:
     result
     .mental_health_index,

     analysis_text:
     result
     .analysis_text,

     recommendation:
     result
     .recommendation

   });

   // AUTO TODO AI
   const aiTodos = [];

   if(
    result.risk_level ===
    "Tinggi"
   ){

    aiTodos.push({

      title:
      "Tidur minimal 7 jam",

      description:
      "Usahakan tidur cukup agar tubuh dan pikiran pulih.",

      category:
      "Tidur",

      priority:
      "Tinggi"

    });

    aiTodos.push({

      title:
      "Kurangi beban belajar",

      description:
      "Kurangi aktivitas akademik yang terlalu berat.",

      category:
      "Akademik",

      priority:
      "Tinggi"

    });

   }

   if(
    result.risk_level ===
    "Sedang"
   ){

    aiTodos.push({

      title:
      "Jalan santai 15 menit",

      description:
      "Luangkan waktu relaksasi ringan.",

      category:
      "Aktivitas",

      priority:
      "Sedang"

    });

   }

   if(
    result.risk_level ===
    "Rendah"
   ){

    aiTodos.push({

      title:
      "Pertahankan rutinitas sehat",

      description:
      "Terus jaga keseimbangan aktivitas.",

      category:
      "Mental",

      priority:
      "Rendah"

    });

   }


   // SAVE TODOS
   for(
    const todo
    of aiTodos
   ){

    await Todo.create({

      user_id:userId,

      title:
      todo.title,

      description:
      todo.description,

      category:
      todo.category,

      priority:
      todo.priority,

      is_ai_generated:
      true

    });

   }

   res.status(201)
   .json({

     message:
     "Analisis berhasil",

     data:
     prediction

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
 analyzeBurnout
};