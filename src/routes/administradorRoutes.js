const express = require('express');

const router = express.Router();

const AdministradorController =
    require('../controllers/administradorController');

router.get('/', AdministradorController.listar);

router.post('/', AdministradorController.criar);

router.put('/:id', AdministradorController.atualizar);

router.delete('/:id', AdministradorController.excluir);

module.exports = router;