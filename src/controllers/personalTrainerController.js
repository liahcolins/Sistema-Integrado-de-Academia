const PersonalTrainer = require('../models/PersonalTrainer');

class PersonalTrainerController {

    static listar(req, res) {

        PersonalTrainer.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar personal trainers'
                });
            }

            res.json(resultados);

        });

    }

    static criar(req, res) {

        PersonalTrainer.criar(req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao cadastrar personal trainer'
                });
            }

            res.status(201).json({
                mensagem: 'Personal trainer cadastrado com sucesso',
                id: resultado.insertId
            });

        });

    }

}

module.exports = PersonalTrainerController;