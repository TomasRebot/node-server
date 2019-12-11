const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user-controller');

//list
router.route('/')
    .get(UserController.index)
    .post(UserController.create);

//count list public users
router.route('/list')
    .get(UserController.usersCount);

//show and delete
router.route('/:userId')
    .get(UserController.show)
    .delete(UserController._delete);
//create
router.route('/create')
    .post(UserController.create);
//edit
router.route('/edit/:userId')
    .post(UserController.update);
//add todo
router.route('/:userId/todo')
    .get(UserController.todoList)
    .post(UserController.addTodo);


module.exports = router;
