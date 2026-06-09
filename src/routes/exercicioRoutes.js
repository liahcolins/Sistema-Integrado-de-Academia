const express = require('express');

const router = express.Router();

const ExercicioController = require('../controllers/exercicioController');

router.get('/', ExercicioController.listar);

module.exports = router;
