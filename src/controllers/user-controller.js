const User = require('../models/user-model');
const Todo = require('../models/todo-model');
module.exports = {


    index: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        }catch(err){
            next(err)
        }
    },


    create: async  (req,res , next) => {
        try {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user);
        }catch(err){
            next(err)
        }
    },


    update: async (req,res, next) => {
        try{
            const { userId } = req.params;
            const newUser = req.body;
            const result = await User.findByIdAndUpdate(userId, newUser);
            res.status(200).json({success:true});
        }catch(err){
            next(err);
        }
    },



    show : async (req, res, next) => {
        try{
            const { userId } = req.params;
            const user = await User.findById(userId);
            res.status(200).json(user);
        }catch(err){
            next(err);
        }


    },
    _delete: async (req,res, next) => {
        try{
            const { userId } = req.params;
            const result = await User.findByIdAndDelete(userId);
            res.status(200).json('deleted');
        }catch(err){
            next(err);
        }
    },

    todoList: async (req,res, next) => {
        try {
          const {userId} = req.params;
          const user = await User.findById(userId).populate('thingsTodo');
          res.status(200).json({
              user: user,
          });
        } catch (err) {
          next(err);
        }
    },

    addTodo: async (req ,res ,next) => {
      try{
          const { userId } = req.params;
          const newTodo = new Todo(req.body);
          const user = await User.findById(userId);
          newTodo.owner = user;
          await newTodo.save();
          user.thingsTodo.push(newTodo);
          await user.save();
          res.status(200).json(newTodo);
      }catch(err){
          next(err);
      }

    }


};
