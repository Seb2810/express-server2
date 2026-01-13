const express = require('express');
const router = express.Router();

const {
 getmanyTodos,
  createManyTodos,
  createManyRoman,   // ✅ AJOUT ICI
  updateRoman,
  deleteOnemanyTodos,
  deleteAllmanyTodos
} = require('../controller/auteurmany.controller.js');

// ONE TO ONE
router.get('/', getmanyTodos);
router.post('/add', createManyTodos);
router.post('/add-one', createManyRoman);
router.put('/update', updateRoman);

// ✅ D’ABORD la plus longue
router.delete('/delete-all/:id', deleteAllmanyTodos);

// ✅ ENSUITE la plus courte
router.delete('/delete/:id', deleteOnemanyTodos)

module.exports = router;
