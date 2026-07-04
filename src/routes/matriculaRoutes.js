const express = require('express');

const router = express.Router();

const MatriculaController =
    require('../controllers/matriculaController');

router.get(
    '/',
    MatriculaController.listar
);

router.post(
    '/',
    MatriculaController.criar
);

router.put(
    '/:id',
    MatriculaController.atualizar
);

router.delete(
    '/:id',
    MatriculaController.excluir
);

module.exports = router;