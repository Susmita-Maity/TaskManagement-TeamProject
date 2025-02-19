const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');
const validateToken = require('../middleware/validateToken');
const router = require('express').Router();

router.use(validateToken);
router.get('/', fetchAllTasks);
router.post('/', createTask);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);

module.exports = router;