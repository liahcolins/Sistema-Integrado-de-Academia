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

module.exports = router;