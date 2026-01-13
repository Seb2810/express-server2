const express = require('express');
const router = express.Router();

const {
  getTodos,
  createTodos,
  updateTodos,
 // deleteTodos,
  deleteAllTodos
} =  require('../controller/authors.controller.js');


// ONE TO ONE
router.get('/', getTodos);

router.post('/create', createTodos);
router.put('/update', updateTodos);


//router.delete('/delete', deleteTodos);
router.delete('/delete-all/:id', deleteAllTodos);

module.exports = router;
