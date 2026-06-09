const express = require('express');

const router = express.Router();

const ClienteController = require('../controllers/clienteController');

router.get('/', ClienteController.listar);
router.post('/', ClienteController.criar);

module.exports = router;