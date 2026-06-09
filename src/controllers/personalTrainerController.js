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

    static atualizar(req, res) {

        const id = req.params.id;

        PersonalTrainer.atualizar(id, req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao atualizar personal trainer'
                });
            }

            res.json({
                mensagem: 'Personal trainer atualizado com sucesso'
            });

        });

    }

    static excluir(req, res) {

        const id = req.params.id;

        PersonalTrainer.excluir(id, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao excluir personal trainer'
                });
            }

            res.json({
                mensagem: 'Personal trainer excluído com sucesso'
            });

        });

    }

}

module.exports = PersonalTrainerController;