const express = require('express');
const router = express.Router();

const {
  findmtom,
  createmtom,
  Addmtom,
  updateMylivre,
  deleteManytoManyTodos,
  deleteAllManytoManyTodos
} = require('../controller/mtm.controller.js');

// ONE TO ONE
router.get('/', findmtom);
router.post('/create', createmtom);
router.post('/add', Addmtom);
router.put('/update', updateMylivre);
// 👉 POST à la place de DELETE (adapté à ton Angular)
router.delete('/delete-all/:id', deleteAllManytoManyTodos);
router.delete('/delete/:id/:idecrivain', deleteManytoManyTodos);


module.exports = router;
