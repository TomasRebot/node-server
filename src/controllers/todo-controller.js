const Todo = require('../models/todo-model');
const User = require('../models/user-model');
const CommonResponse = require('../models/commonResponse');

module.exports = {
    index: async (req, res, next) => {
        try {
            const todo = await Todo.find({});
            res.status(200).json(todo);
        }catch(err){
            next(err)
        }
    },
    create: async  (req,res , next) => {
        try {
            const newTodo = new Todo(req.body);
            const todo = await newTodo.save();
            res.status(201).json(todo);
        }catch(err){
            next(err)
        }
    },

    update: async (req,res, next) => {
        try{
            const { todoId } = req.params;
            const newTodo = req.body;
            const result = await Todo.findByIdAndUpdate(todoId, newTodo);
            res.status(200).json({
                success:true,
                todo: result
            });
        }catch(err){
            next(err);
        }
    },
    show : async (req, res, next) => {
        try{
            const { todoId } = req.params;
            const todo = await Todo.findById(todoId);
          res.status(200).json(CommonResponse.success(todo));
        }catch(err){
            next(err);
        }


    },
    _delete: async (req,res, next) => {
        try{
            const { todoId } = req.params;
            const result = await Todo.findByIdAndDelete(todoId);
            res.status(200).json('deleted');
        }catch(err){
            next(err);
        }
    }
};
