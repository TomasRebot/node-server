const User = require('../models/user-model');
const Todo = require('../models/todo-model');
const CommonResponse = require('../models/commonResponse');
module.exports = {


    index: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(CommonResponse.success(users));
        }catch(err){
            res.status(500).json(CommonResponse.internalError(err));
            next(err);
        }
    },


    create: async  (req,res , next) => {
        try {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(CommonResponse.success(user));
        }catch(err){
            res.status(500).json(CommonResponse.internalError(err));
            next(err)
        }
    },


    update: async (req,res, next) => {
        try{
            const { userId } = req.params;
            const newUser = req.body;
            const result = await User.findByIdAndUpdate(userId, newUser);
            res.status(200).json(CommonResponse.success(result));
        }catch(err){
            res.status(500).json(CommonResponse.internalError(err));
            next(err);
        }
    },



    show : async (req, res, next) => {
        try{
            const { userId } = req.params;
            const user = await User.findById(userId);
            res.status(200).json(CommonResponse.success(user));
        }catch(err){
            res.status(500).json(CommonResponse.internalError(err));
            next(err);
        }


    },
    _delete: async (req,res, next) => {
        try{
            const { userId } = req.params;
            const result = await User.findByIdAndDelete(userId);
            res.status(200).json(CommonResponse.success(result));
        }catch(err){
            res.status(500).json(CommonResponse.internalError(err));
            next(err);
        }
    },

    todoList: async (req,res, next) => {
        try {
          const {userId} = req.params;
          const user = await User.findById(userId).populate('thingsTodo');
          res.status(200).json(CommonResponse.success(user));
        } catch (err) {
            res.status(500).json(CommonResponse.internalError(err));
            next(err);
        }
    },

    addTodo: async (req ,res ,next) => {
      try{
          const { userId } = req.params;
          const newTodo = new Todo(req.body);
          const user = await User.findById(userId);
          newTodo.owner = user;
          newTodo.save().then((todo) => {
              user.thingsTodo.push(todo);
              user.save().then(u => {res.status(200).json(CommonResponse.success());
              });
          });
      }catch(err){
          res.status(500).json(CommonResponse.internalError(err));
          next(err);
      }

    },

    userCount: async (req, res, next) => {
        try {
            const countUsers = await User.countDocuments({});
            res.status(200).json(CommonResponse.success(users.length));
        }catch(err){
            res.status(500).json(CommonResponse.internalError(err));
            next(err);
        }
    },


};



// addTodo: async (req ,res ,next) => {
//     try{
//         const { userId } = req.params;
//         const newTodo = new Todo(req.body);
//         const user = await User.findById(userId);
//         newTodo.owner = user;
//         newTodo.save().then((todo) => {
//             user.thingsTodo.push(todo);
//             user.save().then( (user) => {
//                 User.populate(user,'thingsTodo').then(
//                     (u) => {
//                         res.status(200).json(CommonResponse.success(u));
//                     }
//                 );
//             });
//         }).catch(err => { res.status(500).json(CommonResponse.internalError(err)); } );
//     }catch(err){
//         res.status(500).json(CommonResponse.internalError(err));
//         next(err);
//     }
// }
