const {
 Todo
} =
require("../models");


// GET TODO
const getTodos =
async(req,res)=>{

 try{

   const todos =
   await Todo.findAll({

     where:{
       user_id:
       req.user.id
     },

     order:[
       [
         "createdAt",
         "DESC"
       ]
     ]

   });

   res.status(200)
   .json(todos);

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


// CREATE TODO
const createTodo =
async(req,res)=>{

 try{

   const {
     title,
     description,
     category,
     priority
   } =
   req.body;

   const todo =
   await Todo.create({

     user_id:
     req.user.id,

     title,
     description,
     category,
     priority

   });

   res.status(201)
   .json(todo);

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


// UPDATE STATUS
const updateTodo =
async(req,res)=>{

 try{

   const todo =
   await Todo.findByPk(
     req.params.id
   );

   if(!todo){

     return res
     .status(404)
     .json({
       message:
       "Todo tidak ditemukan"
     });

   }

   todo.is_completed =
   !todo.is_completed;

   await todo.save();

   res.status(200)
   .json(todo);

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


// DELETE TODO
const deleteTodo =
async(req,res)=>{

 try{

   const todo =
   await Todo.findByPk(
     req.params.id
   );

   if(!todo){

     return res
     .status(404)
     .json({
       message:
       "Todo tidak ditemukan"
     });

   }

   await todo.destroy();

   res.status(200)
   .json({
     message:
     "Todo berhasil dihapus"
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

 getTodos,
 createTodo,
 updateTodo,
 deleteTodo

};