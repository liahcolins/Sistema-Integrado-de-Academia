const express = require('express');

const router = express.Router();

const TreinoController =
    require('../controllers/treinoController');

router.get('/', TreinoController.listar);

router.post('/', TreinoController.criar);

module.exports = router;