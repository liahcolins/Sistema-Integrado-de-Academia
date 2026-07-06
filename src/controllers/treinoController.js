const Treino = require('../models/Treino');

class TreinoController {

    static listar(req, res) {

        Treino.listarTodos((erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao buscar treinos'
                });
            }

            res.json(resultados);

        });
    }

    static criar(req, res) {

        Treino.criar(req.body, (erro, resultado) => {

            if (erro) {

                console.error('Erro ao cadastrar treino:', erro);

                return res.status(500).json({
                    erro: 'Erro ao cadastrar treino'
                });
            }

            res.status(201).json({
                mensagem: 'Treino cadastrado com sucesso',
                id: resultado.insertId
            });

        });
    }

    static atualizar(req, res) {

        const id = req.params.id;

        Treino.atualizar(id, req.body, (erro, resultado) => {

            if (erro) {

                console.error('Erro ao atualizar treino:', erro);

                return res.status(500).json({
                    erro: 'Erro ao atualizar treino'
                });
            }

            res.json({
                mensagem: 'Treino atualizado com sucesso'
            });

        });
    }

    static excluir(req, res) {

        const id = req.params.id;

        Treino.excluir(id, (erro, resultado) => {

            if (erro) {

                console.error('Erro ao excluir treino:', erro);

                return res.status(500).json({
                    erro: 'Erro ao excluir treino'
                });
            }

            res.json({
                mensagem: 'Treino excluído com sucesso'
            });

        });
    }

}

module.exports = TreinoController;