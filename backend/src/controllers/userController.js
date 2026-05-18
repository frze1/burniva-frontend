const bcrypt =
require("bcryptjs");

const {
 User
} =
require("../models");


// GET PROFILE
const getProfile =
async(req,res)=>{

 try{

   const user =
   await User.findByPk(
     req.user.id,
     {
       attributes:{
         exclude:[
           "password"
         ]
       }
     }
   );

   if(!user){

     return res
     .status(404)
     .json({
       message:
       "User tidak ditemukan"
     });

   }

   res.status(200)
   .json(user);

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


// UPDATE PROFILE
const updateProfile =
async(req,res)=>{

 try{

   const {
     fullname,
     profile_image
   } =
   req.body;

   const user =
   await User.findByPk(
     req.user.id
   );

   if(!user){

     return res
     .status(404)
     .json({
       message:
       "User tidak ditemukan"
     });

   }

   user.fullname =
   fullname ||
   user.fullname;

   user.profile_image =
   profile_image ||
   user.profile_image;

   await user.save();

   res.status(200)
   .json({

     message:
     "Profile berhasil diupdate",

     user

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


// CHANGE PASSWORD
const changePassword =
async(req,res)=>{

 try{

   const {

     current_password,
     new_password,
     confirm_password

   } =
   req.body;

   const user =
   await User.findByPk(
     req.user.id
   );

   // VALIDASI
   const isPasswordMatch =
   await bcrypt.compare(

     current_password,
     user.password

   );

   if(!isPasswordMatch){

     return res
     .status(400)
     .json({

       message:
       "Password lama salah"

     });

   }

   if(
     new_password !==
     confirm_password
   ){

     return res
     .status(400)
     .json({

       message:
       "Konfirmasi password tidak sama"

     });

   }

   // HASH PASSWORD BARU
   const hashedPassword =
   await bcrypt.hash(
     new_password,
     10
   );

   user.password =
   hashedPassword;

   await user.save();

   res.status(200)
   .json({

     message:
     "Password berhasil diubah"

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

 getProfile,
 updateProfile,
 changePassword

};