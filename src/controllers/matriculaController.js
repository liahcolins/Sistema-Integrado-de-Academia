const Matricula = require('../models/Matricula');

class MatriculaController {

    static listar(req, res) {

        Matricula.listar((erro, resultados) => {

            if (erro) {

                return res.status(500).json({
                    erro: 'Erro ao listar matrículas'
                });

            }

            res.json(resultados);

        });

    }

    static criar(req, res) {

        Matricula.criar(req.body, (erro, resultado) => {

            if (erro) {

                console.error(
                    'Erro ao cadastrar matrícula:',
                    erro
                );

                return res.status(500).json({
                    erro: 'Erro ao cadastrar matrícula'
                });

            }

            res.status(201).json({
                mensagem: 'Matrícula cadastrada com sucesso',
                id: resultado.insertId
            });

        });

    }

    static atualizar(req, res) {

        const id = req.params.id;

        Matricula.atualizar(
            id,
            req.body,
            (erro, resultado) => {

                if (erro) {

                    console.error(
                        'Erro ao atualizar matrícula:',
                        erro
                    );

                    return res.status(500).json({
                        erro: 'Erro ao atualizar matrícula'
                    });

                }

                res.json({
                    mensagem:
                        'Matrícula atualizada com sucesso'
                });

            }
        );

    }

    static excluir(req, res) {

        const id = req.params.id;

        Matricula.excluir(id, (erro, resultado) => {

            if (erro) {

                console.error(
                    'Erro ao excluir matrícula:',
                    erro
                );

                return res.status(500).json({
                    erro: 'Erro ao excluir matrícula'
                });

            }

            res.json({
                mensagem:
                    'Matrícula excluída com sucesso'
            });

        });

    }

}

module.exports = MatriculaController;