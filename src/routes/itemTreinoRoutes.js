const express = require('express');

const router = express.Router();

const ItemTreinoController =
    require('../controllers/itemTreinoController');

router.get(
    '/treino/:treinoId',
    ItemTreinoController.listarPorTreino
);

router.post(
    '/',
    ItemTreinoController.criar
);

router.put(
    '/:id',
    ItemTreinoController.atualizar
);

router.delete(
    '/:id',
    ItemTreinoController.excluir
);

module.exports = router;