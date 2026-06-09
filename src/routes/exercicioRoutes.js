const express = require('express');

const router = express.Router();

const ExercicioController = require('../controllers/exercicioController');

router.get('/', ExercicioController.listar);
router.post('/', ExercicioController.criar);
router.put('/:id', ExercicioController.atualizar);
router.delete('/:id', ExercicioController.excluir);

module.exports = router;
