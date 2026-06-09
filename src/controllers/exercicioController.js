const Exercicio = require('../models/Exercicio');

class ExercicioController {

    static listar(req, res) {

        Exercicio.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar exercícios'
                });
            }

            res.json(resultados);

        });

    }

    static criar(req, res) {

        Exercicio.criar(req.body, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao cadastrar exercício'
                });
            }

            res.status(201).json({
                mensagem: 'Exercício cadastrado com sucesso',
                id: resultado.insertId
            });

        });

    }

    static atualizar(req, res) {

        const { id } = req.params;

        Exercicio.atualizar(id, req.body, (erro) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao atualizar exercício'
                });
            }

            res.json({
                mensagem: 'Exercício atualizado com sucesso'
            });

        });

    }

    static excluir(req, res) {

        const { id } = req.params;

        Exercicio.excluir(id, (erro) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao excluir exercício'
                });
            }

            res.json({
                mensagem: 'Exercício excluído com sucesso'
            });

        });

    }

}

module.exports = ExercicioController;
