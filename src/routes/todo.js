const { Router } = require('express');
const router = Router();

const TodoController = require('../controllers/todo-controller');

//index
router.route('/')
    .get(TodoController.index)
    .post();
//show and delete
router.route('/:todoId')
    .get(TodoController.show)
    .delete(TodoController._delete);
//create
router.route('/create')
    .post(TodoController.create);
//edit
router.route('/edit/:todoId')
    .post(TodoController.update);

module.exports = router;
