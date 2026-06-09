const express = require('express');

const router = express.Router();

const PersonalTrainerController =
    require('../controllers/personalTrainerController');

router.get('/', PersonalTrainerController.listar);

router.post('/', PersonalTrainerController.criar);

router.put('/:id', PersonalTrainerController.atualizar);

router.delete('/:id', PersonalTrainerController.excluir);

module.exports = router;