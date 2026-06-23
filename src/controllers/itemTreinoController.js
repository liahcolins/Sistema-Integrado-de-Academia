const ItemTreino = require('../models/ItemTreino');

class ItemTreinoController {

    static listarPorTreino(req, res) {

        const treinoId = req.params.treinoId;

        ItemTreino.listarPorTreino(
            treinoId,
            (erro, resultados) => {

                if (erro) {
                    return res.status(500).json({
                        erro: 'Erro ao listar itens do treino'
                    });
                }

                res.json(resultados);

            }
        );

    }

    static criar(req, res) {

        ItemTreino.criar(
            req.body,
            (erro, resultado) => {

                if (erro) {

                    console.error(
                        'Erro ao cadastrar item do treino:',
                        erro
                    );

                    return res.status(500).json({
                        erro: 'Erro ao cadastrar item do treino'
                    });
                }

                res.status(201).json({
                    mensagem:
                        'Item do treino cadastrado com sucesso',
                    id: resultado.insertId
                });

            }
        );

    }

    static atualizar(req, res) {

        const id = req.params.id;

        ItemTreino.atualizar(
            id,
            req.body,
            (erro, resultado) => {

                if (erro) {

                    console.error(
                        'Erro ao atualizar item do treino:',
                        erro
                    );

                    return res.status(500).json({
                        erro: 'Erro ao atualizar item do treino'
                    });
                }

                res.json({
                    mensagem:
                        'Item do treino atualizado com sucesso'
                });

            }
        );

    }

    static excluir(req, res) {

        const id = req.params.id;

        ItemTreino.excluir(
            id,
            (erro, resultado) => {

                if (erro) {

                    console.error(
                        'Erro ao excluir item do treino:',
                        erro
                    );

                    return res.status(500).json({
                        erro: 'Erro ao excluir item do treino'
                    });
                }

                res.json({
                    mensagem:
                        'Item do treino excluído com sucesso'
                });

            }
        );

    }

}

module.exports = ItemTreinoController;