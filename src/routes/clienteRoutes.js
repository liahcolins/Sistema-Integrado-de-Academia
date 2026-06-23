const express = require('express');

const router = express.Router();

const ClienteController = require('../controllers/clienteController');

router.get('/', ClienteController.listar);
router.get('/dashboard', ClienteController.dashboard);
router.post('/', ClienteController.criar);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.excluir);


module.exports = router;