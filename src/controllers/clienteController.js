const Cliente = require('../models/Cliente');

class ClienteController {

    static listar(req, res) {

        Cliente.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar clientes'
                });
            }

            res.json(resultados);

        });

    }

    static criar(req, res) {

        Cliente.criar(req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao cadastrar cliente'
                });
            }

            res.status(201).json({
                mensagem: 'Cliente cadastrado com sucesso',
                id: resultado.insertId
            });

        });

    }

}

module.exports = ClienteController;