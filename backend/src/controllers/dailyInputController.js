const {
  DailyInput
} = require("../models");

const { Op } =
require("sequelize");


// CREATE DAILY INPUT
const createDailyInput =
async (req,res)=>{

  try{

    const userId =
    req.user.id;

    const {

      stress_level,
      anxiety_level,
      emotional_pressure,

      academic_pressure,
      study_duration,

      sleep_duration,
      financial_pressure,
      family_expectation,
      social_support,
      exercise_duration

    } = req.body;

    // VALIDASI FIELD
    if(

      stress_level == null ||
      anxiety_level == null ||
      emotional_pressure == null ||

      academic_pressure == null ||
      study_duration == null ||

      sleep_duration == null ||
      financial_pressure == null ||
      family_expectation == null ||
      social_support == null

    ){

      return res.status(400)
      .json({
        message:
        "Semua field wajib diisi"
      });

    }

    // CHECK INPUT HARI INI
    const today =
    new Date();

    today.setHours(
      0,0,0,0
    );

    const existingInput =
    await DailyInput.findOne({

      where:{
        user_id:userId,

        createdAt:{
          [Op.gte]:
          today
        }
      }

    });

    if(existingInput){

      return res.status(400)
      .json({
        message:
        "Kamu sudah melakukan input hari ini"
      });

    }

    // SAVE DATABASE
    const dailyInput =
    await DailyInput.create({

      user_id:userId,

      stress_level,
      anxiety_level,
      emotional_pressure,

      academic_pressure,
      study_duration,

      sleep_duration,
      financial_pressure,
      family_expectation,
      social_support,
      exercise_duration

    });

    res.status(201)
    .json({

      message:
      "Input harian berhasil disimpan",

      data:
      dailyInput

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
 createDailyInput
};